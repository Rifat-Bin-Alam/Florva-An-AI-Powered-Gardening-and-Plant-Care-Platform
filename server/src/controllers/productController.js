const Product = require('../models/Product');
const { processAndSaveProductImage, deleteProductImage } = require('../middleware/uploadMiddleware');

/**
 * @desc    Get all products owned by the authenticated gardener
 * @route   GET /api/products
 * @access  Private (Role: gardener)
 */
const getGardenerProducts = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;

    // Strict ownership filter: gardener can only see their own products
    const query = { gardener: req.user._id };

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex }
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID (with ownership check)
 * @route   GET /api/products/:id
 * @access  Private (Role: gardener)
 */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Ownership verification
    if (product.gardener.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You do not own this product'
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new product with 100x100 image processing
 * @route   POST /api/products
 * @access  Private (Role: gardener)
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, description, category, price, stock, status } = req.body;

    // 1. Validate required text fields
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Product name is required' });
    }
    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, error: 'Product description is required' });
    }
    if (!category) {
      return res.status(400).json({ success: false, error: 'Product category is required' });
    }
    if (price === undefined || price === null || isNaN(Number(price)) || Number(price) < 0) {
      return res.status(400).json({ success: false, error: 'Valid positive price is required' });
    }
    if (stock === undefined || stock === null || isNaN(Number(stock)) || Number(stock) < 0) {
      return res.status(400).json({ success: false, error: 'Valid positive stock count is required' });
    }

    // 2. Validate image file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a primary product image (JPG, PNG, or WebP)'
      });
    }

    // 3. Process image with sharp: resize to exactly 100x100 px and compress to <= 100 KB
    let imageResult;
    try {
      imageResult = await processAndSaveProductImage(req.file.buffer);
    } catch (imgErr) {
      return res.status(400).json({
        success: false,
        error: imgErr.message
      });
    }

    // 4. Create document in MongoDB (with automatic cleanup on DB failure)
    try {
      const product = await Product.create({
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        price: Number(price),
        stock: Number(stock),
        image: imageResult.relativePath,
        status: status || (Number(stock) > 0 ? 'in_stock' : 'out_of_stock'),
        gardener: req.user._id
      });

      res.status(201).json({
        success: true,
        message: 'Product created successfully with processed 100x100 thumbnail',
        product,
        imageMetadata: {
          dimensions: '100x100',
          sizeBytes: imageResult.sizeBytes
        }
      });
    } catch (dbErr) {
      // Clean up orphaned image file if DB insertion failed
      deleteProductImage(imageResult.relativePath);
      throw dbErr;
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing product
 * @route   PUT /api/products/:id
 * @access  Private (Role: gardener)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Strict ownership verification
    if (product.gardener.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only edit products you created'
      });
    }

    const { name, description, category, price, stock, status } = req.body;

    if (name) product.name = name.trim();
    if (description) product.description = description.trim();
    if (category) product.category = category.trim();
    if (price !== undefined && !isNaN(Number(price))) {
      if (Number(price) < 0) {
        return res.status(400).json({ success: false, error: 'Price cannot be negative' });
      }
      product.price = Number(price);
    }
    if (stock !== undefined && !isNaN(Number(stock))) {
      if (Number(stock) < 0) {
        return res.status(400).json({ success: false, error: 'Stock cannot be negative' });
      }
      product.stock = Number(stock);
    }
    if (status) product.status = status;

    // If new image was provided, process it and safely replace the old one
    let newImageResult = null;
    let oldImagePath = product.image;

    if (req.file) {
      try {
        newImageResult = await processAndSaveProductImage(req.file.buffer);
        product.image = newImageResult.relativePath;
      } catch (imgErr) {
        return res.status(400).json({
          success: false,
          error: imgErr.message
        });
      }
    }

    try {
      await product.save();
      // Remove old image only AFTER product save succeeds
      if (newImageResult && oldImagePath) {
        deleteProductImage(oldImagePath);
      }
    } catch (saveErr) {
      // If save failed, clean up the newly created image so it's not orphaned
      if (newImageResult) {
        deleteProductImage(newImageResult.relativePath);
      }
      throw saveErr;
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
      imageMetadata: newImageResult ? {
        dimensions: '100x100',
        sizeBytes: newImageResult.sizeBytes
      } : undefined
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private (Role: gardener)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Strict ownership verification
    if (product.gardener.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'Access denied: You can only delete products you created'
      });
    }

    // Remove associated image file from disk
    deleteProductImage(product.image);

    // Delete record from MongoDB
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product and associated thumbnail deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product availability status
 * @route   PATCH /api/products/:id/status
 * @access  Private (Role: gardener)
 */
const updateProductStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['in_stock', 'out_of_stock', 'discontinued'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    if (product.gardener.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Access denied' });
    }

    product.status = status;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product status changed to ${status}`,
      product
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGardenerProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus
};

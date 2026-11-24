const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure uploads/products directory exists
const uploadDir = path.join(__dirname, '../../uploads/products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Limits
const MAX_ORIGINAL_UPLOAD_SIZE = 5 * 1024 * 1024; // 5 MB max original file upload
const MAX_PROCESSED_SIZE = 100 * 1024;            // 100 KB max final processed file size (102,400 bytes)
const TARGET_DIMENSION = 100;                     // Exactly 100x100 pixels

// Multer memory storage (keeps file in memory for sharp processing & content validation)
const storage = multer.memoryStorage();

// File filter: validate file extension and reported MIME type
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = (file.mimetype || '').toLowerCase();

  const isExtValid = allowedExtensions.includes(ext);
  const isMimeValid = allowedMimeTypes.includes(mime);

  if (isExtValid || isMimeValid) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only JPG, JPEG, PNG, and WebP images are accepted.'), false);
  }
};

// Multer upload instance with 5MB input limit for original files
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_ORIGINAL_UPLOAD_SIZE
  }
});

/**
 * Validate and process uploaded product image:
 * 1. Inspect actual image content using sharp metadata (rejects fake extensions & corrupted images).
 * 2. Validate detected format (jpeg, png, webp).
 * 3. Resize and crop to exactly 100x100 pixels.
 * 4. Compress to ensure output size is strictly <= 100 KB.
 * 5. Verify final dimensions (100x100) and final file size (<= 100 KB) before writing to disk.
 * 6. Save file to uploads/products/ directory.
 * 7. Return metadata object with relative URL path.
 */
const processAndSaveProductImage = async (buffer) => {
  if (!buffer || buffer.length === 0) {
    throw new Error('No image data received for processing.');
  }

  // 1. Inspect actual image contents via sharp metadata
  let metadata;
  try {
    metadata = await sharp(buffer).metadata();
  } catch (err) {
    throw new Error('Corrupted or invalid image file. The uploaded file is not a readable image.');
  }

  // 2. Validate detected actual image format
  const allowedFormats = ['jpeg', 'png', 'webp'];
  if (!metadata.format || !allowedFormats.includes(metadata.format.toLowerCase())) {
    throw new Error(`Unsupported image format (${metadata.format || 'unknown'}). Only JPG, JPEG, PNG, and WebP images are allowed.`);
  }

  // 3. Validate image dimensions exist and are positive
  if (!metadata.width || !metadata.height || metadata.width <= 0 || metadata.height <= 0) {
    throw new Error('Invalid image dimensions. The image file appears to be corrupted.');
  }

  // 4. Resize/crop to exactly 100x100 pixels and compress
  let quality = 85;
  let outputBuffer = await sharp(buffer)
    .resize(TARGET_DIMENSION, TARGET_DIMENSION, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  // If size exceeds 100 KB (102,400 bytes), iteratively reduce quality
  while (outputBuffer.length > MAX_PROCESSED_SIZE && quality > 15) {
    quality -= 15;
    outputBuffer = await sharp(buffer)
      .resize(TARGET_DIMENSION, TARGET_DIMENSION, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality, mozjpeg: true })
      .toBuffer();
  }

  // 5. Verify final file size constraint
  if (outputBuffer.length > MAX_PROCESSED_SIZE) {
    throw new Error(`Image could not be compressed below the 100 KB limit (current: ${(outputBuffer.length / 1024).toFixed(1)} KB). Please select a different image.`);
  }

  // 6. Verify final processed dimensions
  const processedMeta = await sharp(outputBuffer).metadata();
  if (processedMeta.width !== TARGET_DIMENSION || processedMeta.height !== TARGET_DIMENSION) {
    throw new Error(`Processed image dimension mismatch: expected ${TARGET_DIMENSION}x${TARGET_DIMENSION}, got ${processedMeta.width}x${processedMeta.height}.`);
  }

  // 7. Write verified image to disk
  const fileName = `product-${Date.now()}-${Math.round(Math.random() * 1e6)}.jpg`;
  const filePath = path.join(uploadDir, fileName);

  await fs.promises.writeFile(filePath, outputBuffer);

  return {
    relativePath: `/uploads/products/${fileName}`,
    fileName,
    sizeBytes: outputBuffer.length,
    width: processedMeta.width,
    height: processedMeta.height
  };
};

/**
 * Safely delete an uploaded image file from disk
 */
const deleteProductImage = (relativePath) => {
  if (!relativePath || typeof relativePath !== 'string' || !relativePath.startsWith('/uploads/products/')) {
    return;
  }
  const fileName = path.basename(relativePath);
  const fullPath = path.join(uploadDir, fileName);

  fs.unlink(fullPath, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.warn(`Failed to delete orphaned product image: ${fullPath}`, err.message);
    }
  });
};

module.exports = {
  upload,
  processAndSaveProductImage,
  deleteProductImage,
  MAX_ORIGINAL_UPLOAD_SIZE,
  MAX_PROCESSED_SIZE,
  TARGET_DIMENSION
};

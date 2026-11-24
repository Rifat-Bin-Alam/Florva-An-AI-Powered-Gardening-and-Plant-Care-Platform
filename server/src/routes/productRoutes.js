const express = require('express');
const router = express.Router();
const {
  getGardenerProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// All product management routes require authentication and Gardener role
router.use(protect);
router.use(authorize('gardener'));

router.route('/')
  .get(getGardenerProducts)
  .post(upload.single('image'), createProduct);

router.route('/:id')
  .get(getProductById)
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

router.patch('/:id/status', updateProductStatus);

module.exports = router;

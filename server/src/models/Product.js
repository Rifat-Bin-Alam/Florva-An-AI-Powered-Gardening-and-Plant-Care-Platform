const mongoose = require('mongoose');

/**
 * Product Schema — Florva V2 Botanical Platform
 * Represents plant specimens and gardening products managed by authenticated gardeners.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    category: {
      type: String,
      required: [true, 'Please select a product category'],
      enum: {
        values: [
          'Indoor Plants',
          'Flowering Plants',
          'Succulents & Cacti',
          'Pots & Planters',
          'Fertilizers & Soil',
          'Gardening Tools',
          'Other'
        ],
        message: '{VALUE} is not a supported category'
      },
      default: 'Indoor Plants'
    },
    price: {
      type: Number,
      required: [true, 'Please specify the price in BDT'],
      min: [0, 'Price cannot be negative']
    },
    stock: {
      type: Number,
      required: [true, 'Please specify the available stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    image: {
      type: String,
      required: [true, 'Please provide a product image']
    },
    status: {
      type: String,
      enum: {
        values: ['in_stock', 'out_of_stock', 'discontinued'],
        message: '{VALUE} is not a valid status'
      },
      default: 'in_stock'
    },
    inStock: {
      type: Boolean,
      default: true
    },
    gardener: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Product must belong to a gardener owner']
    }
  },
  {
    timestamps: true
  }
);

// Automatically synchronize inStock boolean before saving
productSchema.pre('save', function (next) {
  if (this.stock <= 0 || this.status === 'out_of_stock' || this.status === 'discontinued') {
    this.inStock = false;
  } else {
    this.inStock = true;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);

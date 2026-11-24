import React, { useState, useEffect, useRef } from 'react';
import {
  Package, Plus, Search, Filter, Edit2, Trash2,
  Eye, CheckCircle2, AlertCircle, X, Upload,
  Image as ImageIcon, Loader2, Sparkles, RefreshCw
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuth } from '../../context/AuthContext';

const CATEGORIES = [
  'Indoor Plants',
  'Flowering Plants',
  'Succulents & Cacti',
  'Pots & Planters',
  'Fertilizers & Soil',
  'Gardening Tools',
  'Other'
];

// Helper to resolve product image URL across proxy or direct host
const resolveProductImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('data:') ||
    imagePath.startsWith('blob:')
  ) {
    return imagePath;
  }
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};

export default function GardenerProductManagement({ onProductCountChange }) {
  const { token, showToast } = useAuth();

  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Indoor Plants',
    price: '',
    stock: '',
    status: 'in_stock'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch products owned by the authenticated gardener
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/api/products?';
      const params = new URLSearchParams();
      if (search.trim()) params.append('search', search.trim());
      if (categoryFilter !== 'All') params.append('category', categoryFilter);
      if (statusFilter !== 'All') params.append('status', statusFilter);
      url += params.toString();

      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load products');
      setProducts(data.products || []);
      if (onProductCountChange) {
        onProductCountChange(data.products.length);
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token, search, categoryFilter, statusFilter]);

  // Handle image file selection with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file extension and reported type
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const ext = file.name ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : '';

    const isExtValid = validExtensions.includes(ext);
    const isMimeValid = file.type && validTypes.includes(file.type.toLowerCase());

    if (!isExtValid && !isMimeValid) {
      setFormError('Invalid file format. Only JPG, JPEG, PNG, and WebP images are accepted.');
      if (e.target) e.target.value = '';
      return;
    }

    // Validate original upload file size (max 5 MB)
    const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
    if (file.size > MAX_UPLOAD_BYTES) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setFormError(`Original file too large (${sizeMB} MB). Maximum allowed upload size is 5 MB. Supported images will be resized to 100 × 100 pixels and compressed under 100 KB on the server.`);
      if (e.target) e.target.value = '';
      return;
    }

    setFormError('');
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Helper to load a botanical specimen preset as a real JPEG File
  const handleSelectPreset = (presetName) => {
    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 250;
    const ctx = canvas.getContext('2d');
    
    // Botanical background gradient
    const grad = ctx.createLinearGradient(0, 0, 250, 250);
    grad.addColorStop(0, presetName === 'snake_plant' ? '#174D32' : '#113A26');
    grad.addColorStop(1, presetName === 'snake_plant' ? '#236542' : '#3D8259');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 250, 250);

    // Label
    ctx.fillStyle = '#A8C5A0';
    ctx.font = 'bold 20px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(presetName === 'snake_plant' ? 'Snake Plant' : 'Monstera Specimen', 125, 120);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px Inter, system-ui, sans-serif';
    ctx.fillText('Florva Botanical Specimen', 125, 145);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `${presetName}.jpg`, { type: 'image/jpeg' });
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setFormError('');
      }
    }, 'image/jpeg', 0.9);
  };

  // Open Add Modal
  const openAddModal = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Indoor Plants',
      price: '',
      stock: '',
      status: 'in_stock'
    });
    setImageFile(null);
    setImagePreview('');
    setFormError('');
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status
    });
    setImageFile(null);
    setImagePreview(product.image);
    setFormError('');
    setIsEditModalOpen(true);
  };

  // Open Detail Modal
  const openDetailModal = (product) => {
    setSelectedProduct(product);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Submit Add Product Form
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.stock) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (!imageFile) {
      setFormError('Please select a product image. It will be resized to 100x100 pixels.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('description', formData.description.trim());
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('stock', formData.stock);
      payload.append('status', formData.status);
      payload.append('image', imageFile);

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create product');

      showToast(`Specimen "${data.product.name}" created with 100x100 thumbnail!`, 'success');
      setIsAddModalOpen(false);
      fetchProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit Product Form
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.description.trim() || !formData.price || !formData.stock) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('name', formData.name.trim());
      payload.append('description', formData.description.trim());
      payload.append('category', formData.category);
      payload.append('price', formData.price);
      payload.append('stock', formData.stock);
      payload.append('status', formData.status);
      if (imageFile) {
        payload.append('image', imageFile);
      }

      const res = await fetch(`/api/products/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payload
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');

      showToast(`Specimen "${data.product.name}" updated successfully!`, 'success');
      setIsEditModalOpen(false);
      fetchProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Execute Delete Product
  const handleDeleteProduct = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${selectedProduct._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete product');

      showToast('Product and thumbnail image permanently deleted', 'info');
      setIsDeleteModalOpen(false);
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Status Toggle
  const handleStatusToggle = async (productId, currentStatus) => {
    const nextStatus = currentStatus === 'in_stock' ? 'out_of_stock' : 'in_stock';
    try {
      const res = await fetch(`/api/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: nextStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to toggle status');

      showToast(`Status updated to ${nextStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}`, 'success');
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ─── Top Control Bar: Search, Filters & Add Button ─── */}
      <Card className="p-5 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-forest dark:text-sage-400" />
              <h2 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                Plant Inventory & Product Management
              </h2>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
              Manage your nursery specimens with automated 100 × 100 pixel thumbnail processing.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={openAddModal}
            className="w-full sm:w-auto"
          >
            Add New Plant Specimen
          </Button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-charcoal-100 dark:border-night-700">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by specimen name or description..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-charcoal-200 dark:border-night-600 bg-offwhite dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-charcoal-200 dark:border-night-600 bg-offwhite dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-charcoal-200 dark:border-night-600 bg-offwhite dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <option value="All">All Statuses</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>
      </Card>

      {/* ─── Product Catalog Grid / List ─── */}
      {loading ? (
        <div className="min-h-[200px] flex flex-col items-center justify-center space-y-2 py-12">
          <Loader2 className="w-8 h-8 animate-spin text-forest dark:text-sage-400" />
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Loading your botanical inventory...</p>
        </div>
      ) : products.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2 border-charcoal-200 dark:border-night-700 bg-white dark:bg-night-800 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-forest-50 dark:bg-forest-950/70 text-forest dark:text-sage-400 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-forest-900 dark:text-gray-100">
              No Plant Specimens Found
            </h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 max-w-sm mx-auto">
              {search || categoryFilter !== 'All' || statusFilter !== 'All'
                ? 'No specimens matched your current filters. Try resetting the search or category filters.'
                : 'Your catalog is currently empty. Click "Add New Plant Specimen" to create your first botanical listing!'}
            </p>
          </div>
          <Button variant="primary" size="sm" icon={Plus} onClick={openAddModal}>
            Add First Product
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((p) => (
            <Card
              key={p._id}
              className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 hover:shadow-botanical transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                
                {/* Header: 100x100 Thumbnail + Titles */}
                <div className="flex items-start gap-3">
                  <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-forest-900 shrink-0 border border-charcoal-200 dark:border-night-600 relative shadow-2xs">
                    <img
                      src={resolveProductImageUrl(p.image)}
                      alt={p.name}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] object-cover object-center"
                      onError={(e) => {
                        const host = window.location.hostname || 'localhost';
                        if (!e.target.dataset.triedBackend && p.image && !p.image.startsWith('http') && !p.image.startsWith('blob:')) {
                          e.target.dataset.triedBackend = 'true';
                          e.target.src = `http://${host}:5000${p.image.startsWith('/') ? '' : '/'}${p.image}`;
                          return;
                        }
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23174D32"/><text x="50" y="55" fill="white" font-size="12" text-anchor="middle">100x100</text></svg>';
                      }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-[9px] text-white px-1 rounded font-mono">
                      100×100
                    </div>
                  </div>

                  <div className="space-y-1 flex-grow overflow-hidden">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-sm font-bold text-forest-900 dark:text-gray-100 truncate" title={p.name}>
                        {p.name}
                      </h3>
                    </div>
                    
                    <Badge variant="default" size="sm">
                      {p.category}
                    </Badge>

                    <div className="pt-1 flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-forest dark:text-sage-300">
                        ৳{p.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-charcoal-400">
                        • {p.stock} units
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* Availability Status Badge & Toggle */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-charcoal-100 dark:border-night-700">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${p.status === 'in_stock' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span className="capitalize font-medium text-charcoal-700 dark:text-charcoal-300">
                      {p.status === 'in_stock' ? 'In Stock' : p.status === 'out_of_stock' ? 'Out of Stock' : 'Discontinued'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleStatusToggle(p._id, p.status)}
                    className="text-[11px] text-forest dark:text-sage-400 hover:underline font-semibold cursor-pointer"
                  >
                    Toggle Status
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-charcoal-100 dark:border-night-700">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Eye}
                  onClick={() => openDetailModal(p)}
                  className="text-[11px]"
                >
                  Inspect
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Edit2}
                  onClick={() => openEditModal(p)}
                  className="text-[11px]"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  onClick={() => openDeleteModal(p)}
                  className="text-[11px] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 1: ADD PRODUCT MODAL
          ═══════════════════════════════════════════════ */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-night-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-charcoal-200 dark:border-night-600 shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-night-700 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-forest dark:text-sage-400" />
                <h3 className="text-base font-bold text-forest-900 dark:text-gray-100">
                  Add Botanical Specimen
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-offwhite dark:hover:bg-night-700 text-charcoal-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <Input
                label="Specimen / Product Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="E.g. Monstera Deliciosa"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Price (BDT ৳)"
                  type="number"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="1500"
                />

                <Input
                  label="Available Stock Count"
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider mb-1.5">
                  Botanical Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Care guidelines, sunlight needs, and botanical characteristics..."
                  className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              {/* Image Upload Area with 100x100 preview */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider">
                  Product Image * (Upload: max 5 MB • Final: 100 × 100 px, ≤ 100 KB)
                </label>

                <div className="flex items-center gap-4 p-3 rounded-xl border border-charcoal-200 dark:border-night-600 bg-offwhite dark:bg-night-900">
                  {imagePreview ? (
                    <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-forest-900 shrink-0 border border-charcoal-300 relative shadow-xs">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-[100px] h-[100px] object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-[8px] text-white px-1 rounded">
                        100×100 px
                      </div>
                    </div>
                  ) : (
                    <div className="w-[100px] h-[100px] rounded-lg border-2 border-dashed border-charcoal-300 dark:border-night-600 flex flex-col items-center justify-center text-charcoal-400 shrink-0">
                      <ImageIcon className="w-6 h-6 mb-1" />
                      <span className="text-[9px]">100 × 100</span>
                    </div>
                  )}

                  <div className="space-y-1.5 flex-grow">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="text-xs text-charcoal-600 dark:text-charcoal-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-forest file:text-white hover:file:bg-forest-800 cursor-pointer"
                    />
                    <p className="text-[10px] text-charcoal-400">
                      Accepts JPG, PNG, WebP (up to 5 MB original). Backend verifies magic bytes, crops to 100 × 100 pixels, and compresses under 100 KB.
                    </p>

                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-[10px] text-charcoal-500 font-bold uppercase tracking-wider">
                        Or Pick Preset:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('snake_plant')}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-night-800 border border-charcoal-200 dark:border-night-600 hover:border-forest text-forest dark:text-sage-300 cursor-pointer"
                      >
                        🌱 Snake Plant
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('monstera')}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-night-800 border border-charcoal-200 dark:border-night-600 hover:border-forest text-forest dark:text-sage-300 cursor-pointer"
                      >
                        🌿 Monstera
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-charcoal-100 dark:border-night-700">
                <Button
                  variant="ghost"
                  size="md"
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={Plus}
                  isLoading={submitting}
                  disabled={submitting}
                >
                  Publish Specimen
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 2: EDIT PRODUCT MODAL
          ═══════════════════════════════════════════════ */}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-night-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-charcoal-200 dark:border-night-600 shadow-2xl p-6 space-y-5">
            
            <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-night-700 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-base font-bold text-forest-900 dark:text-gray-100">
                  Edit Plant Specimen
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-offwhite dark:hover:bg-night-700 text-charcoal-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <Input
                label="Specimen / Product Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="discontinued">Discontinued</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Price (BDT ৳)"
                  type="number"
                  min="0"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />

                <Input
                  label="Available Stock Count"
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider mb-1.5">
                  Botanical Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-900 text-charcoal-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>

              {/* Image Replacement */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider">
                  Product Image (Leave blank to keep existing 100x100 thumbnail)
                </label>

                <div className="flex items-center gap-4 p-3 rounded-xl border border-charcoal-200 dark:border-night-600 bg-offwhite dark:bg-night-900">
                  <div className="w-[100px] h-[100px] rounded-lg overflow-hidden bg-forest-900 shrink-0 border border-charcoal-300 relative shadow-xs">
                    <img
                      src={resolveProductImageUrl(imagePreview)}
                      alt="Preview"
                      className="w-[100px] h-[100px] object-cover"
                      onError={(e) => {
                        const host = window.location.hostname || 'localhost';
                        if (!e.target.dataset.triedBackend && imagePreview && !imagePreview.startsWith('http') && !imagePreview.startsWith('blob:')) {
                          e.target.dataset.triedBackend = 'true';
                          e.target.src = `http://${host}:5000${imagePreview.startsWith('/') ? '' : '/'}${imagePreview}`;
                        }
                      }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-[8px] text-white px-1 rounded">
                      100×100 px
                    </div>
                  </div>

                  <div className="space-y-1.5 flex-grow">
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      className="text-xs text-charcoal-600 dark:text-charcoal-300 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
                    />
                    <p className="text-[10px] text-charcoal-400">
                      Selecting a new file will crop it to 100 × 100 pixels, compress it, and delete the old image file.
                    </p>

                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-[10px] text-charcoal-500 font-bold uppercase tracking-wider">
                        Or Pick Preset:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('snake_plant')}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-night-800 border border-charcoal-200 dark:border-night-600 hover:border-amber-600 text-amber-700 dark:text-amber-400 cursor-pointer"
                      >
                        🌱 Snake Plant
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectPreset('monstera')}
                        className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-night-800 border border-charcoal-200 dark:border-night-600 hover:border-amber-600 text-amber-700 dark:text-amber-400 cursor-pointer"
                      >
                        🌿 Monstera
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-charcoal-100 dark:border-night-700">
                <Button
                  variant="ghost"
                  size="md"
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  icon={Edit2}
                  isLoading={submitting}
                  disabled={submitting}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 3: PRODUCT DETAIL MODAL
          ═══════════════════════════════════════════════ */}
      {isDetailModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-night-800 rounded-2xl max-w-md w-full border border-charcoal-200 dark:border-night-600 shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-charcoal-100 dark:border-night-700 pb-3">
              <h3 className="text-base font-bold text-forest-900 dark:text-gray-100">
                Botanical Specimen Details
              </h3>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1 rounded-lg hover:bg-offwhite dark:hover:bg-night-700 text-charcoal-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-[100px] h-[100px] rounded-xl overflow-hidden bg-forest-900 shrink-0 border border-charcoal-300 relative shadow-sm">
                <img
                  src={resolveProductImageUrl(selectedProduct.image)}
                  alt={selectedProduct.name}
                  className="w-[100px] h-[100px] object-cover"
                  onError={(e) => {
                    const host = window.location.hostname || 'localhost';
                    if (!e.target.dataset.triedBackend && selectedProduct.image && !selectedProduct.image.startsWith('http')) {
                      e.target.dataset.triedBackend = 'true';
                      e.target.src = `http://${host}:5000${selectedProduct.image.startsWith('/') ? '' : '/'}${selectedProduct.image}`;
                    }
                  }}
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-[8px] text-white px-1 rounded">
                  100×100 px
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-forest-900 dark:text-gray-100">
                  {selectedProduct.name}
                </h4>
                <Badge variant="default" size="sm">{selectedProduct.category}</Badge>
                <div className="text-lg font-extrabold text-forest dark:text-sage-300 pt-1">
                  ৳{selectedProduct.price.toLocaleString()}
                </div>
                <div className="text-xs text-charcoal-500">
                  Stock Units: <span className="font-semibold">{selectedProduct.stock}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-charcoal-400 uppercase tracking-wider">Description</span>
              <p className="text-charcoal-700 dark:text-charcoal-300 leading-relaxed bg-offwhite dark:bg-night-900 p-3 rounded-lg border border-charcoal-200 dark:border-night-700">
                {selectedProduct.description}
              </p>
            </div>

            <div className="text-[11px] text-charcoal-500 dark:text-charcoal-400 pt-2 border-t border-charcoal-100 dark:border-night-700 space-y-1">
              <p>Image Path: <span className="font-mono text-[10px] text-forest dark:text-sage-400">{selectedProduct.image}</span></p>
              <p>Created: {new Date(selectedProduct.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(selectedProduct.updatedAt).toLocaleString()}</p>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MODAL 4: DELETE CONFIRMATION MODAL
          ═══════════════════════════════════════════════ */}
      {isDeleteModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-night-800 rounded-2xl max-w-sm w-full border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 space-y-4 text-center">
            
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-charcoal-900 dark:text-gray-100">
                Delete Plant Specimen?
              </h3>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
                Are you sure you want to permanently delete <strong className="text-forest-900 dark:text-gray-100">"{selectedProduct.name}"</strong>?
                This action will delete the database record and remove its 100x100 uploaded image from disk.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={handleDeleteProduct}
                isLoading={submitting}
                disabled={submitting}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, Droplets, Calendar, Package, Plus, CheckCircle2,
  AlertTriangle, Clock, Trash2, MapPin, Sparkles, X, Check
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * MyPlantsPage — Customer Personal Plant Care Journal & Lifecycle Tracker
 * Tracks individual plants, computes dynamic watering reminders,
 * logs care activities, and monitors order/booking histories.
 */
export default function MyPlantsPage() {
  const {
    personalPlants,
    markPlantWatered,
    markPlantFertilized,
    removePersonalPlant,
    addPersonalPlant,
    orders,
    bookings,
    currentUser
  } = useApp();

  const [activeTab, setActiveTab] = useState('journal'); // 'journal' | 'orders' | 'bookings'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New plant form state
  const [newPlant, setNewPlant] = useState({
    nickname: '',
    species: '',
    location: 'Living Room',
    wateringIntervalDays: 7,
    notes: '',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'
  });

  // Helper to calculate days remaining until next watering
  const getCareStatus = (plant) => {
    const today = new Date();
    const lastWatered = new Date(plant.lastWateredDate);
    const intervalDays = plant.wateringIntervalDays || 7;

    // Calculate difference in days
    const diffTime = today.getTime() - lastWatered.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysRemaining = intervalDays - diffDays;

    if (daysRemaining <= 0) {
      return { status: 'due', label: 'Needs Water Today!', color: 'danger', daysRemaining };
    } else if (daysRemaining <= 2) {
      return { status: 'soon', label: `Water in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`, color: 'warning', daysRemaining };
    } else {
      return { status: 'healthy', label: `Water in ${daysRemaining} days`, color: 'success', daysRemaining };
    }
  };

  // Identify plants that need water today
  const duePlants = personalPlants.filter(p => getCareStatus(p).status === 'due');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newPlant.nickname.trim()) return;

    addPersonalPlant(newPlant);
    setIsAddModalOpen(false);
    setNewPlant({
      nickname: '',
      species: '',
      location: 'Living Room',
      wateringIntervalDays: 7,
      notes: '',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Header & Add Action ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-5">
        <div className="space-y-1">
          <Badge variant="forest" size="md" icon={Sprout}>Customer Digital Garden</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            Plant Care Journal & Orders
          </h1>
          <p className="text-xs text-charcoal-500">
            Personal collection tracking for {currentUser.name} ({currentUser.email})
          </p>
        </div>

        {activeTab === 'journal' && (
          <Button
            variant="primary"
            size="md"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Plant to Journal
          </Button>
        )}
      </div>

      {/* ─── View Tabs ─── */}
      <div className="flex items-center gap-2 border-b border-charcoal-200">
        <button
          onClick={() => setActiveTab('journal')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'journal'
              ? 'border-forest text-forest'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>My Plants ({personalPlants.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-forest text-forest'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'bookings'
              ? 'border-forest text-forest'
              : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Service Bookings ({bookings.length})</span>
        </button>
      </div>

      {/* ═══════════════════════════════════════════════
          TAB 1: PERSONAL PLANTS JOURNAL & REMINDERS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'journal' && (
        <div className="space-y-6">
          
          {/* Due Today Care Notification Banner */}
          {duePlants.length > 0 && (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-900">
                    Watering Reminder: {duePlants.length} Plant{duePlants.length > 1 ? 's' : ''} Need Water Today!
                  </h4>
                  <p className="text-xs text-amber-800">
                    {duePlants.map(p => `"${p.nickname}" (${p.species})`).join(', ')} reached their care interval.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {duePlants.map(p => (
                  <Button
                    key={p._id}
                    variant="primary"
                    size="sm"
                    icon={Droplets}
                    onClick={() => markPlantWatered(p._id)}
                  >
                    Water {p.nickname}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Plants Collection Grid */}
          {personalPlants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalPlants.map((plant) => {
                const care = getCareStatus(plant);

                return (
                  <Card key={plant._id} padding="p-0" className="overflow-hidden flex flex-col bg-white border border-charcoal-200/80 rounded-2xl shadow-sm">
                    {/* Plant Photo */}
                    <div className="h-44 w-full bg-offwhite relative">
                      <img
                        src={plant.image}
                        alt={plant.nickname}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant={care.color === 'danger' ? 'danger' : care.color === 'warning' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {care.label}
                        </Badge>
                      </div>
                      <button
                        onClick={() => removePersonalPlant(plant._id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-charcoal-400 hover:text-rose-600 transition-colors shadow-sm"
                        title="Remove Plant"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Plant Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-baseline justify-between mb-1">
                          <h3 className="text-lg font-bold text-forest-900 leading-tight">
                            "{plant.nickname}"
                          </h3>
                          <span className="text-[11px] text-charcoal-400 font-medium">
                            Every {plant.wateringIntervalDays}d
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-500 font-medium mb-2">
                          {plant.species} • {plant.location}
                        </p>
                        {plant.notes && (
                          <p className="text-xs text-charcoal-600 bg-offwhite p-2.5 rounded-lg border border-charcoal-100 italic">
                            "{plant.notes}"
                          </p>
                        )}
                      </div>

                      {/* Care Schedule Metrics */}
                      <div className="space-y-3 pt-3 border-t border-charcoal-100 text-xs">
                        <div className="flex justify-between text-charcoal-500 text-[11px]">
                          <span>Last Watered:</span>
                          <span className="font-semibold text-charcoal-800">{plant.lastWateredDate}</span>
                        </div>

                        {/* Interactive Care Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <Button
                            variant={care.status === 'due' ? 'primary' : 'outline'}
                            size="sm"
                            icon={Droplets}
                            onClick={() => markPlantWatered(plant._id)}
                            className="text-[11px]"
                          >
                            Mark Watered
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            icon={Sprout}
                            onClick={() => markPlantFertilized(plant._id)}
                            className="text-[11px]"
                          >
                            Fertilized
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-charcoal-200 p-12 text-center max-w-md mx-auto space-y-4">
              <Sprout className="w-10 h-10 text-forest mx-auto" />
              <h3 className="text-base font-bold text-forest-900">No Plants in Your Journal Yet</h3>
              <p className="text-xs text-charcoal-600">
                Add your houseplants to receive automated watering alerts and maintain a thriving indoor garden.
              </p>
              <Button variant="primary" size="sm" onClick={() => setIsAddModalOpen(true)}>
                Add First Plant
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 2: ORDER HISTORY
          ═══════════════════════════════════════════════ */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl border border-charcoal-200/80 p-5 space-y-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest-900 font-mono">{order.orderNumber}</span>
                    <Badge
                      variant={
                        order.orderStatus === 'delivered' ? 'success' :
                        order.orderStatus === 'shipped' ? 'info' :
                        'warning'
                      }
                      size="sm"
                    >
                      {order.orderStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-charcoal-400">Placed on {order.date} • {order.paymentMethod}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-forest-900">৳{order.totalAmount.toLocaleString()} BDT</span>
                </div>
              </div>

              {/* Order Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-offwhite rounded-xl border border-charcoal-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white border border-charcoal-200"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-forest-900 truncate">{item.name}</p>
                      <p className="text-[11px] text-charcoal-500">Qty: {item.quantity} • ৳{item.price.toLocaleString()} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping address footer */}
              <div className="text-[11px] text-charcoal-500 flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-forest" />
                <span>Destination: {order.shippingAddress}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 3: SERVICE BOOKINGS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.map((bkg) => (
            <div
              key={bkg._id}
              className="bg-white rounded-2xl border border-charcoal-200/80 p-5 space-y-3 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest-900 font-mono">{bkg.bookingNumber}</span>
                    <Badge
                      variant={
                        bkg.status === 'accepted' || bkg.status === 'completed' ? 'success' :
                        bkg.status === 'rejected' ? 'danger' : 'warning'
                      }
                      size="sm"
                    >
                      {bkg.status.toUpperCase()}
                    </Badge>
                  </div>
                  <h4 className="text-sm font-bold text-forest-900">{bkg.serviceName}</h4>
                </div>
                <span className="text-base font-extrabold text-forest-900">৳{bkg.price.toLocaleString()} BDT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-charcoal-600">
                <div>
                  <span className="text-charcoal-400 block text-[10px]">Date & Time</span>
                  <strong>{bkg.date} ({bkg.timeSlot})</strong>
                </div>
                <div>
                  <span className="text-charcoal-400 block text-[10px]">Service Address</span>
                  <span>{bkg.serviceAddress}</span>
                </div>
                <div>
                  <span className="text-charcoal-400 block text-[10px]">Assigned Horticulturist</span>
                  <span className="text-forest font-semibold">Md. Rafiqul Islam</span>
                </div>
              </div>

              {bkg.notes && (
                <p className="text-[11px] text-charcoal-500 bg-offwhite p-2.5 rounded-lg border border-charcoal-100">
                  Notes: {bkg.notes}
                </p>
              )}

              {bkg.status === 'rejected' && bkg.rejectionReason && (
                <div className="bg-rose-50 text-rose-800 p-2.5 rounded-lg text-xs border border-rose-200">
                  <strong>Declined reason:</strong> {bkg.rejectionReason}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ─── Add Plant Modal ─── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 bg-white rounded-2xl shadow-2xl border border-charcoal-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <h3 className="text-base font-bold text-forest-900 flex items-center gap-2">
                <Sprout className="w-4 h-4 text-forest" />
                Add Plant to Care Journal
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <Input
                label="Plant Nickname *"
                required
                value={newPlant.nickname}
                onChange={(e) => setNewPlant({ ...newPlant, nickname: e.target.value })}
                placeholder="E.g. Monty, Greenie, Ziggy"
              />

              <Input
                label="Species / Variety *"
                required
                value={newPlant.species}
                onChange={(e) => setNewPlant({ ...newPlant, species: e.target.value })}
                placeholder="E.g. Monstera Deliciosa, Snake Plant"
              />

              <Input
                label="Placement / Room"
                value={newPlant.location}
                onChange={(e) => setNewPlant({ ...newPlant, location: e.target.value })}
                placeholder="E.g. Living Room Window, Balcony"
              />

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Watering Interval (Days) *
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  required
                  value={newPlant.wateringIntervalDays}
                  onChange={(e) => setNewPlant({ ...newPlant, wateringIntervalDays: e.target.value })}
                  className="w-full bg-offwhite border border-charcoal-200 rounded-xl px-3.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                  Care Notes / Sunlight
                </label>
                <textarea
                  rows={2}
                  value={newPlant.notes}
                  onChange={(e) => setNewPlant({ ...newPlant, notes: e.target.value })}
                  placeholder="E.g. Likes morning sun. Mist weekly."
                  className="w-full bg-offwhite border border-charcoal-200 rounded-xl p-3 text-xs placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" icon={Plus}>
                  Save to Journal
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

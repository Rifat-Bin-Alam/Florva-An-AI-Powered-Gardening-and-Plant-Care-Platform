/**
 * Mock Services Data for Florva Botanical Platform
 * Realistic gardening services with pricing, durations, and availability.
 * Ready for later MongoDB integration — field names match the planned schema.
 */

const mockServices = [
  {
    _id: 'svc_001',
    name: 'Balcony Garden Setup',
    slug: 'balcony-garden-setup',
    category: 'Setup & Installation',
    price: 3500,
    duration: '2-3 hours',
    description: 'Complete balcony garden transformation including pot arrangement, soil preparation, plant selection guidance, and drainage system setup. Our gardener will design a layout optimized for your balcony\'s sunlight exposure.',
    includes: ['Site assessment', 'Layout design', 'Soil mixing & potting', 'Drainage setup', '1 week follow-up call'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 14,
    isPopular: true,
  },
  {
    _id: 'svc_002',
    name: 'Plant Health Consultation',
    slug: 'plant-health-consultation',
    category: 'Consultation',
    price: 800,
    duration: '45-60 minutes',
    description: 'One-on-one consultation with our verified horticulturist to diagnose plant issues, recommend treatments, and create a personalized care plan for your collection.',
    includes: ['Disease diagnosis', 'Pest identification', 'Care plan creation', 'Product recommendations', 'Written report'],
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 22,
    isPopular: true,
  },
  {
    _id: 'svc_003',
    name: 'Seasonal Repotting & Soil Refresh',
    slug: 'seasonal-repotting-soil-refresh',
    category: 'Maintenance',
    price: 1200,
    duration: '1-2 hours',
    description: 'Professional repotting service with premium organic soil mix. Includes root health inspection, proper pot sizing, and post-repotting care instructions.',
    includes: ['Root health check', 'Premium organic soil', 'Proper pot sizing', 'Root pruning if needed', 'Aftercare guide'],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviewCount: 18,
    isPopular: true,
  },
  {
    _id: 'svc_004',
    name: 'Organic Pest Treatment',
    slug: 'organic-pest-treatment',
    category: 'Treatment',
    price: 1500,
    duration: '1-2 hours',
    description: 'Chemical-free pest elimination using neem oil, insecticidal soap, and biological control methods. Safe for children, pets, and beneficial insects.',
    includes: ['Pest identification', 'Organic treatment application', 'Prevention measures', '2 follow-up visits', 'Organic spray kit'],
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    reviewCount: 11,
    isPopular: false,
  },
  {
    _id: 'svc_005',
    name: 'Indoor Plant Styling',
    slug: 'indoor-plant-styling',
    category: 'Setup & Installation',
    price: 2800,
    duration: '2-3 hours',
    description: 'Interior plant styling consultation and placement by our expert. We assess your space, lighting, and aesthetic preferences to create a cohesive indoor garden.',
    includes: ['Space & light assessment', 'Plant recommendations', 'Pot & planter advice', 'Arrangement & placement', 'Maintenance schedule'],
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 9,
    isPopular: false,
  },
  {
    _id: 'svc_006',
    name: 'Monthly Garden Maintenance',
    slug: 'monthly-garden-maintenance',
    category: 'Maintenance',
    price: 2000,
    duration: '1.5-2 hours / visit',
    description: 'Recurring monthly visit for pruning, fertilizing, pest inspection, and general plant wellness check. Keep your garden thriving without the effort.',
    includes: ['Pruning & deadheading', 'Fertilizer application', 'Pest inspection', 'Soil health check', 'Progress photos'],
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 7,
    isPopular: false,
  },
];

/** All unique service categories */
export const serviceCategories = [...new Set(mockServices.map(s => s.category))];

/** Helper: get popular services for homepage display */
export const getPopularServices = () => mockServices.filter(s => s.isPopular);

export default mockServices;

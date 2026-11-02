/**
 * Mock Testimonials & Platform Statistics for Florva
 * Realistic customer reviews and data for homepage social proof sections.
 */

export const mockTestimonials = [
  {
    _id: 'test_001',
    name: 'Ayesha Rahman',
    role: 'Plant Enthusiast',
    avatar: null, // Will use initials fallback
    rating: 5,
    text: 'Florva completely changed how I care for my plants. The watering reminders are a lifesaver — I haven\'t lost a single plant since I started using the platform!',
    plantCount: 12,
  },
  {
    _id: 'test_002',
    name: 'Tanvir Hossain',
    role: 'Home Garden Owner',
    avatar: null,
    rating: 5,
    text: 'The balcony garden setup service was incredible. The gardener assessed my sunlight patterns and picked the perfect plants. My balcony is now a mini jungle!',
    plantCount: 8,
  },
  {
    _id: 'test_003',
    name: 'Nusrat Jahan',
    role: 'Interior Designer',
    avatar: null,
    rating: 4,
    text: 'As an interior designer, I recommend Florva to all my clients. The plant quality is outstanding, and the AI assistant helps me pick species that match specific room conditions.',
    plantCount: 25,
  },
  {
    _id: 'test_004',
    name: 'Rakib Uddin',
    role: 'First-Time Plant Parent',
    avatar: null,
    rating: 5,
    text: 'I was nervous about keeping plants alive, but Florva made it easy. Started with a Snake Plant and now I have a collection of 6. The care guides are so helpful.',
    plantCount: 6,
  },
];

/** Platform metrics for homepage stats section */
export const platformStats = {
  totalPlants: '200+',
  happyCustomers: '500+',
  servicesCompleted: '150+',
  plantSurvivalRate: '97%',
};

/** How-it-works steps for the homepage explainer */
export const howItWorksSteps = [
  {
    step: 1,
    title: 'Browse & Discover',
    description: 'Explore our curated catalog of indoor, outdoor, and flowering plants — each with detailed care guides and expert recommendations.',
    icon: 'Search',
  },
  {
    step: 2,
    title: 'Order or Book',
    description: 'Add plants to your cart or schedule a gardening service. Choose your preferred delivery date or appointment slot.',
    icon: 'ShoppingCart',
  },
  {
    step: 3,
    title: 'Track & Nurture',
    description: 'Add your plants to "My Plants" journal, set up care reminders, and consult our AI plant doctor whenever you need advice.',
    icon: 'Sprout',
  },
];

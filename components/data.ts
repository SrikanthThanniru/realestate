// Pillars — real Mission / Vision / Trust copy from jagathswapnahyd.com
export const reasons = [
  {
    img: '/villas/villa-2.jpeg',
    title: 'Mission',
    body: 'To offer the best gated-community villas in Hyderabad, ensuring luxurious, secure and serene living spaces, while providing the best plots for sale to help clients build their dream homes with confidence.',
  },
  {
    img: '/villas/villa-1.jpeg',
    title: 'Vision',
    body: 'To be the leading real estate company in Hyderabad, recognized for exceptional gated-community villas and premium plots, setting new standards in quality, innovation and customer satisfaction.',
  },
  {
    img: '/villas/villa-5.jpeg',
    title: 'Trust',
    body: 'Committed to delivering with transparency, integrity and a customer-first approach — ensuring lasting trust and satisfaction across every project we undertake.',
  },
];

// Real, verified counters (Sri Jagathswapna Realtors, jagathswapnahyd.com)
export const stats = [
  { value: 10, suffix: '+', label: 'Years of experience' },
  { value: 20, suffix: '+', label: 'Total projects' },
  { value: 3000, suffix: '+', label: 'Units delivered' },
  { value: 600, suffix: '+', label: 'Total constructions' },
];

export type ProjectStatus = 'Completed' | 'On-going' | 'Upcoming';
export type ProjectCategory = 'Villas' | 'Open Plots';

export const projects: {
  name: string;
  location: string;
  status: ProjectStatus;
  category: ProjectCategory;
  year?: string;
  priceFrom?: string;
  priceNow?: string;
}[] = [
  { name: 'Sparkle Castle', location: 'Aushapur', status: 'Completed', category: 'Villas', year: '2017', priceFrom: '₹3,800/sft', priceNow: '₹7,000/sft' },
  { name: 'Spanzilla', location: 'Peerzadiguda', status: 'Completed', category: 'Villas', year: '2019', priceFrom: '₹4,000/sft', priceNow: '₹9,500/sft' },
  { name: 'Sparkle Inara', location: 'Aushapur', status: 'Completed', category: 'Villas', year: '2021', priceFrom: '₹4,450/sft', priceNow: '₹7,000/sft' },
  { name: 'Sparrows Flivora', location: 'Bandaraviryal', status: 'Completed', category: 'Villas', year: '2021', priceFrom: '₹15,500/sft', priceNow: '₹22,000/sft' },
  { name: 'Spalena', location: 'Bandaraviryal', status: 'Completed', category: 'Villas', year: '2023', priceFrom: '₹16,500/sft', priceNow: '₹22,000/sft' },
  { name: 'Spanesta', location: 'Bacharam', status: 'On-going', category: 'Villas', priceNow: '₹7,099/sft' },
  { name: 'Spalena WavOn', location: 'Bandaraviryal', status: 'On-going', category: 'Villas', priceFrom: '₹18,500/sft', priceNow: '₹22,000/sft' },
  { name: 'Sparkle Heaven', location: 'Aushapur', status: 'Upcoming', category: 'Villas' },
  { name: 'Sparrows Vipasa', location: 'Aushapur', status: 'Upcoming', category: 'Villas' },
];

// Featured/flagship projects (one per status) for the showcase section
export const featuredProjects = [
  {
    name: 'Spanesta',
    status: 'On-going',
    location: 'Bacharam',
    price: '₹7,099/sft',
    blurb: 'Our flagship on-going gated community, rising in Bacharam with contemporary villa design and full-scale amenities.',
    img: '/villas/villa-4.jpeg',
  },
  {
    name: 'Sparkle Heaven',
    status: 'Upcoming',
    location: 'Aushapur',
    price: 'Launching soon',
    blurb: '"Step into the safe heaven of your own" — our next launch in Aushapur, offering secure, modern villa living.',
    img: '/villas/villa-2.jpeg',
  },
  {
    name: 'Spalena',
    status: 'Completed',
    location: 'Bandaraviryal',
    price: '₹22,000/sft',
    blurb: 'A completed, fully occupied community in Bandaraviryal — proof of a decade of delivery and trust.',
    img: '/villas/villa-1.jpeg',
  },
];

// Real project locations (coordinates geocoded from OpenStreetMap; Aushapur
// uses the exact pin from jagathswapnahyd.com's own site-location link).
export const locations: {
  name: string;
  lat: number;
  lng: number;
  mapsUrl: string; // real "get directions" link
  projectNames: string[];
}[] = [
  {
    name: 'Aushapur',
    lat: 17.4628892,
    lng: 78.7403165,
    mapsUrl: 'https://www.google.com/maps?q=17.4628892,78.7403165&z=17&hl=en',
    projectNames: ['Sparkle Castle', 'Sparkle Inara', 'Sparkle Heaven', 'Sparrows Vipasa'],
  },
  {
    name: 'Peerzadiguda',
    lat: 17.4032245,
    lng: 78.5837162,
    mapsUrl: 'https://maps.app.goo.gl/KcqkzDmsZXyWX22n7',
    projectNames: ['Spanzilla'],
  },
  {
    name: 'Bacharam',
    lat: 17.3940741,
    lng: 78.6899614,
    mapsUrl: 'https://maps.app.goo.gl/AwgBX9daiCuAMtT97',
    projectNames: ['Spanesta'],
  },
  {
    name: 'Bandaraviryal',
    lat: 17.3896517,
    lng: 78.7191314,
    mapsUrl: 'https://maps.app.goo.gl/167GiJqZP6ir9hEK8',
    projectNames: ['Sparrows Flivora', 'Spalena', 'Spalena WavOn'],
  },
];

// Real office network relevant to the Hyderabad locations we build in
export const nearby = [
  { name: 'Ghatkesar / ORR', time: '10 min' },
  { name: 'Uppal', time: '15 min' },
  { name: 'Secunderabad', time: '30 min' },
  { name: 'Kompally', time: '40 min' },
  { name: 'Hitec City', time: '50 min' },
  { name: 'RGI Airport', time: '75 min' },
];

export const amenities = [
  'Gated 24/7 security',
  'Landscaped gardens',
  'Clubhouse & gym',
  'Power backup',
  'EV-ready parking',
];

export const smartFeatures = [
  'Rainwater harvesting',
  'Solar-ready rooftops',
  'CCTV & video door phone',
  'RO water supply',
];

export const contact = {
  companyLong: 'Sri Jagathswapna Realtors Pvt. Ltd.',
  tagline: 'Building Dreams, Creating Legacies',
  subTagline: 'A decade of real estate excellence in Hyderabad.',
  address: 'Habsiguda, Hyderabad',
  phone: '+91 98854 47747',
  whatsapp: '919885447747',
  email: 'info@jagathswapnahyd.com',
};

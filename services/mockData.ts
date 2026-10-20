// Hey Neighbor — Mock Data Service

export interface Neighbor {
  id: string;
  name: string;
  ageRange: string;
  intro: string;
  avatar: string;
  hasKids?: boolean;
  yearsInNeighborhood?: number;
}

export interface EventPhoto {
  id: string;
  uri: string;
  uploadedBy: string;
  timestamp: string;
  reactions: PhotoReaction[];
  comments: PhotoComment[];
}

export interface PhotoReaction {
  emoji: string;
  label: string;
  count: number;
  reacted: boolean;
}

export interface PhotoComment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface NeighborhoodEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  host: string;
  category: string;
  attendees: number;
  maxAttendees?: number;
  photos: EventPhoto[];
  coverImage?: string;
  rsvped: boolean;
}

export interface YardSale {
  id: string;
  host: string;
  address: string;
  date: string;
  time: string;
  description: string;
  categories: string[];
  photos: string[];
  distance: string;
  saved: boolean;
  highlights: string[];
}

export interface VillageKidsPost {
  id: string;
  type: 'playdate' | 'rideshare' | 'busWalk' | 'afterSchool';
  host: string;
  hostAvatar: string;
  title: string;
  description: string;
  date: string;
  time: string;
  ageRange: string;
  spotsAvailable: number;
  spotsTotal: number;
  requested: boolean;
  tags: string[];
  address?: string;
  route?: string;
}

export interface LocalOffer {
  id: string;
  business: string;
  category: string;
  offer: string;
  description: string;
  validUntil: string;
  logo: string;
  distance: string;
  saved: boolean;
}

// Reaction set — unique neighborhood emojis (not Facebook)
export const NEIGHBORHOOD_REACTIONS = [
  { emoji: '🏠', label: 'Home Love', count: 0, reacted: false },
  { emoji: '🌱', label: 'Growing', count: 0, reacted: false },
  { emoji: '🤝', label: 'Together', count: 0, reacted: false },
  { emoji: '🎉', label: 'Party!', count: 0, reacted: false },
  { emoji: '💫', label: 'Magic', count: 0, reacted: false },
  { emoji: '☀️', label: 'Brightens Day', count: 0, reacted: false },
];

export const mockNeighbors: Neighbor[] = [
  {
    id: '1',
    name: 'The Garcias',
    ageRange: '30s–40s',
    intro: 'We moved in last spring from Austin. Big basketball fans and love weekend cookouts. Come say hi!',
    avatar: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&h=200&fit=crop',
    hasKids: true,
    yearsInNeighborhood: 1,
  },
  {
    id: '2',
    name: 'Margaret O.',
    ageRange: '60s',
    intro: 'Retired teacher, 22 years on this block. My garden is open to all — fresh tomatoes in summer!',
    avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=200&h=200&fit=crop',
    hasKids: false,
    yearsInNeighborhood: 22,
  },
  {
    id: '3',
    name: 'The Patels',
    ageRange: '30s',
    intro: 'New to the area, two little ones. Looking forward to meeting everyone at block events.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop',
    hasKids: true,
    yearsInNeighborhood: 0,
  },
];

export const mockEvents: NeighborhoodEvent[] = [
  {
    id: '1',
    title: 'Block Party BBQ 🔥',
    description: 'Annual summer block party! Bring a dish to share, BYOB. Kids welcome. We will have yard games, a bounce house, and live music from the Hendersons\' garage band.',
    date: 'Sat, Oct 18',
    time: '3:00 PM – 9:00 PM',
    location: '400 block of Maple St',
    host: 'The Hendersons',
    category: 'Social',
    attendees: 24,
    maxAttendees: 50,
    rsvped: true,
    coverImage: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&h=400&fit=crop',
    photos: [
      {
        id: 'p1',
        uri: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&h=600&fit=crop',
        uploadedBy: 'Sarah M.',
        timestamp: '2 hrs ago',
        reactions: [
          { emoji: '🏠', label: 'Home Love', count: 8, reacted: true },
          { emoji: '🎉', label: 'Party!', count: 14, reacted: false },
          { emoji: '☀️', label: 'Brightens Day', count: 5, reacted: false },
          { emoji: '🌱', label: 'Growing', count: 2, reacted: false },
          { emoji: '🤝', label: 'Together', count: 3, reacted: false },
          { emoji: '💫', label: 'Magic', count: 1, reacted: false },
        ],
        comments: [
          { id: 'c1', author: 'Mike T.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', text: 'Best block party yet!! The ribs were unreal 🙌', timestamp: '1 hr ago' },
          { id: 'c2', author: 'Jamie L.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', text: 'So glad we finally met y\'all. See you at the next one!', timestamp: '45 min ago' },
        ],
      },
      {
        id: 'p2',
        uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=600&fit=crop',
        uploadedBy: 'Dave R.',
        timestamp: '1 hr ago',
        reactions: [
          { emoji: '🏠', label: 'Home Love', count: 3, reacted: false },
          { emoji: '🎉', label: 'Party!', count: 7, reacted: false },
          { emoji: '☀️', label: 'Brightens Day', count: 11, reacted: true },
          { emoji: '🌱', label: 'Growing', count: 0, reacted: false },
          { emoji: '🤝', label: 'Together', count: 2, reacted: false },
          { emoji: '💫', label: 'Magic', count: 4, reacted: false },
        ],
        comments: [
          { id: 'c3', author: 'Rosa K.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', text: 'The food!! 😭 I need these recipes immediately', timestamp: '30 min ago' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Morning Walk Club ☀️',
    description: 'Casual 2-mile neighborhood walk every Saturday morning. All paces welcome. Coffee at the park afterward.',
    date: 'Every Sat',
    time: '7:30 AM',
    location: 'Meet at Elm Park Entrance',
    host: 'Margaret O.',
    category: 'Fitness',
    attendees: 9,
    rsvped: false,
    coverImage: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=400&fit=crop',
    photos: [],
  },
  {
    id: '3',
    title: 'Kids Book Swap 📚',
    description: 'Bring up to 5 books your kids are done with, leave with 5 new ones! Free, no-fuss, great way to meet families.',
    date: 'Sun, Oct 19',
    time: '10:00 AM – 12:00 PM',
    location: '218 Oak Lane (Patel Driveway)',
    host: 'The Patels',
    category: 'Kids',
    attendees: 12,
    maxAttendees: 30,
    rsvped: false,
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop',
    photos: [],
  },
];

export const mockYardSales: YardSale[] = [
  {
    id: '1',
    host: 'The Hendersons',
    address: '412 Maple Street',
    date: 'Sat, Oct 18',
    time: '7:00 AM – 2:00 PM',
    description: 'Moving sale! 20+ years of furniture, tools, kids toys, holiday decor, vintage clothes, and so much more. Everything must go — prices are very negotiable by noon.',
    categories: ['Furniture', 'Tools', 'Kids', 'Vintage', 'Decor'],
    photos: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    ],
    distance: '0.3 mi',
    saved: true,
    highlights: ['Vintage record player', 'Kids bikes', 'Patio set'],
  },
  {
    id: '2',
    host: 'Rosa & Tom K.',
    address: '89 Cedar Drive',
    date: 'Sun, Oct 19',
    time: '8:00 AM – 1:00 PM',
    description: 'Downsizing after kids left for college. Great condition items including kitchen appliances, books, art, and outdoor gear.',
    categories: ['Kitchen', 'Books', 'Art', 'Outdoor'],
    photos: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    ],
    distance: '0.7 mi',
    saved: false,
    highlights: ['KitchenAid mixer', 'Kayak paddles', 'Book collection'],
  },
  {
    id: '3',
    host: 'Community Charity Sale',
    address: 'Elm Park Pavilion',
    date: 'Sat–Sun, Oct 25–26',
    time: '9:00 AM – 4:00 PM',
    description: 'Annual neighborhood charity sale benefiting the local food bank. Donations accepted through Oct 20.',
    categories: ['Clothes', 'Kids', 'Books', 'Electronics', 'Sports'],
    photos: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop',
    ],
    distance: '0.5 mi',
    saved: false,
    highlights: ['All proceeds to food bank', 'Vendor spots $10'],
  },
];

export const mockVillagePosts: VillageKidsPost[] = [
  {
    id: '1',
    type: 'playdate',
    host: 'The Garcias',
    hostAvatar: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop',
    title: 'Afternoon at Our Place 🎮',
    description: 'We have 2 kids (7 & 9) who would love some company this Thursday after school. Backyard and basement game room. Light snacks provided. Pick up by 6pm.',
    date: 'Thu, Oct 16',
    time: '3:30 PM – 6:00 PM',
    ageRange: '6–12',
    spotsAvailable: 3,
    spotsTotal: 4,
    requested: false,
    tags: ['Backyard', 'Games', 'Snacks Provided'],
    address: '304 Maple St',
  },
  {
    id: '2',
    type: 'busWalk',
    host: 'Margaret O.',
    hostAvatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=100&h=100&fit=crop',
    title: 'Bus Stop Walk — Elm & Oak 🚌',
    description: 'I walk my grandkids from the bus stop on Elm & Oak every weekday. Happy to include neighbors\' kids too! Safe, familiar route, home by 3:45pm.',
    date: 'Weekdays',
    time: '3:15 PM – 3:45 PM',
    ageRange: '5–12',
    spotsAvailable: 2,
    spotsTotal: 3,
    requested: true,
    tags: ['Bus Walk', 'Daily', 'Safe Route'],
    route: 'Elm & Oak → Cedar Dr → Maple St',
  },
  {
    id: '3',
    type: 'rideshare',
    host: 'Jamie L.',
    hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    title: 'Soccer Practice Carpool 🚗',
    description: 'Taking my daughter to Riverside Soccer Complex Tuesday/Thursday. Room for 1–2 more kids going to practice. Depart 5:15pm sharp, back by 7:30.',
    date: 'Tue & Thu',
    time: '5:15 PM – 7:30 PM',
    ageRange: '7–14',
    spotsAvailable: 2,
    spotsTotal: 2,
    requested: false,
    tags: ['Soccer', 'Carpool', 'Riverside Complex'],
    route: 'Maple St → Riverside Complex',
  },
  {
    id: '4',
    type: 'afterSchool',
    host: 'The Patels',
    hostAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    title: 'After-School Hangout — Fridays',
    description: 'Both parents WFH on Fridays. We have a 6-year-old who loves LEGO and drawing. Happy to watch 1–2 more kiddos same age for a couple hours on Fridays.',
    date: 'Every Friday',
    time: '3:30 PM – 5:30 PM',
    ageRange: '5–8',
    spotsAvailable: 2,
    spotsTotal: 2,
    requested: false,
    tags: ['LEGO', 'Arts & Crafts', 'Weekly'],
    address: '218 Oak Lane',
  },
];

export const mockOffers: LocalOffer[] = [
  {
    id: '1',
    business: "Della's Bakehouse",
    category: 'Food & Drink',
    offer: '20% off your first order',
    description: 'Artisan breads, pastries and custom cakes. Just 4 minutes from the neighborhood. Mention "Hey Neighbor" at checkout.',
    validUntil: 'Dec 31, 2026',
    logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop',
    distance: '0.4 mi',
    saved: false,
  },
  {
    id: '2',
    business: 'GreenThumb Landscaping',
    category: 'Home & Garden',
    offer: 'Free lawn assessment + 15% off first service',
    description: 'Locally owned, 5 years serving this area. Mention your street for neighbor pricing.',
    validUntil: 'Nov 15, 2026',
    logo: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop',
    distance: '1.2 mi',
    saved: true,
  },
];

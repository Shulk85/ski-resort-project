import type {
  Resort,
  Hotel,
  Room,
  Option,
  SkipassZone,
  SkipassLevel,
  FlightClass
} from '@/types/trip'

export type TripData = {
  resorts: Resort[]
  hotels: Hotel[]
  rooms: Room[]
  options: {
    transfer: Option[]
    flight: Option[]
    insurance: Option[]
    addons: Option[]
  }
  skipass: {
    zones: SkipassZone[]
    days: number[]
    levels: SkipassLevel[]
  }
  transferMeta: {
    from: string
    times: string[]
  }
  flightMeta: {
    classes: FlightClass[]
    departures: string[]
  }
}

export const tripData: TripData = {
  resorts: [
    {
      id: 'r_alps_1',
      name: 'St. Anton am Arlberg',
      region: 'Austria • Tyrol',
      description: 'Big terrain, lively apres-ski, great for intermediate riders',
      imageUrl: 'https://picsum.photos/seed/resort-alps-1/1600/900',
      tags: ['Intermediate', 'Alps', 'Party vibe'],
    },
    {
      id: 'r_fr_1',
      name: 'Val Thorens',
      region: 'France • Trois Vallées',
      description: 'High altitude resort with long season and wide ski area',
      imageUrl: 'https://picsum.photos/seed/resort-fr-1/1600/900',
      tags: ['High altitude', 'Large ski area', 'Modern'],
    },
    {
      id: 'r_ch_1',
      name: 'Zermatt',
      region: 'Switzerland • Valais',
      description: 'Iconic Matterhorn views, premium vibe, great groomers',
      imageUrl: 'https://picsum.photos/seed/resort-ch-1/1600/900',
      tags: ['Scenic', 'Premium', 'Groomers'],
    },
  ],

  hotels: [
    {
      id: 'h_ormelune',
      resortId: 'r_alps_1',
      name: 'Hotel Ormelune',
      stars: 4,
      description: 'Cozy alpine hotel with warm interiors and quick lift access',
      imageUrl: 'https://picsum.photos/seed/hotel-orme/1600/900',
    },
    {
      id: 'h_alpina',
      resortId: 'r_alps_1',
      name: 'Hotel Alpina',
      stars: 3,
      description: 'Good value, clean rooms, simple breakfast, close to shuttle',
      imageUrl: 'https://picsum.photos/seed/hotel-alpina/1600/900',
    },
    {
      id: 'h_summit',
      resortId: 'r_fr_1',
      name: 'Summit Lodge',
      stars: 4,
      description: 'Ski-focused stay with modern rooms and great views',
      imageUrl: 'https://picsum.photos/seed/hotel-summit/1600/900',
    },
    {
      id: 'h_matterhorn',
      resortId: 'r_ch_1',
      name: 'Matterhorn Lodge',
      stars: 4,
      description: 'Modern alpine style, close to lifts, quiet evenings',
      imageUrl: 'https://picsum.photos/seed/hotel-matterhorn/1600/900',
    },
    {
      id: 'h_val_blanc',
      resortId: 'r_fr_1',
      name: 'Hotel Val Blanc',
      stars: 3,
      description: 'Bright rooms, great value, easy access to slopes',
      imageUrl: 'https://picsum.photos/seed/hotel-val-blanc/1600/900',
    },
    {
      id: 'h_alpine_peak',
      resortId: 'r_ch_1',
      name: 'Alpine Peak Hotel',
      stars: 5,
      description: 'Premium service, spa, and postcard-worthy views',
      imageUrl: 'https://picsum.photos/seed/hotel-alpine-peak/1600/900',
    },
  ],

  rooms: [
    {
      id: 'rm_orme_double',
      hotelId: 'h_ormelune',
      name: 'Double Room • Breakfast included',
      description: 'Mountain-view room with modern chalet vibes and extra space',
      price: 420,
      imageUrls: [
        'https://picsum.photos/seed/room-orme-1/1600/900',
        'https://picsum.photos/seed/room-orme-2/1600/900',
        'https://picsum.photos/seed/room-orme-3/1600/900',
      ],
    },
    {
      id: 'rm_orme_twin',
      hotelId: 'h_ormelune',
      name: 'Twin Room • Breakfast included',
      description: 'Two single beds, modern chalet style, good for friends',
      price: 410,
      imageUrls: [
        'https://picsum.photos/seed/room-orme-twin-1/1600/900',
        'https://picsum.photos/seed/room-orme-twin-2/1600/900',
        'https://picsum.photos/seed/room-orme-twin-3/1600/900',
      ],
    },
    {
      id: 'rm_orme_deluxe',
      hotelId: 'h_ormelune',
      name: 'Deluxe Double • Breakfast included',
      description: 'More light, upgraded interior, best views on upper floors',
      price: 610,
      imageUrls: [
        'https://picsum.photos/seed/room-orme-deluxe-1/1600/900',
        'https://picsum.photos/seed/room-orme-deluxe-2/1600/900',
        'https://picsum.photos/seed/room-orme-deluxe-3/1600/900',
      ],
    },
    {
      id: 'rm_orme_suite',
      hotelId: 'h_ormelune',
      name: 'Junior Suite • Breakfast included',
      description: 'More space, seating area, better view',
      price: 560,
      imageUrls: [
        'https://picsum.photos/seed/suite-orme-1/1600/900',
        'https://picsum.photos/seed/suite-orme-2/1600/900',
      ],
    },
    {
      id: 'rm_alpina_double',
      hotelId: 'h_alpina',
      name: 'Double Room • Room only',
      description: 'Simple and bright, perfect for active days on the slopes',
      price: 320,
      imageUrls: [
        'https://picsum.photos/seed/room-alpina-1/1600/900',
        'https://picsum.photos/seed/room-alpina-2/1600/900',
      ],
    },
    {
      id: 'rm_summit_double',
      hotelId: 'h_summit',
      name: 'Double Room • Breakfast included',
      description: 'Clean modern interior, great natural light',
      price: 460,
      imageUrls: [
        'https://picsum.photos/seed/room-summit-1/1600/900',
        'https://picsum.photos/seed/room-summit-2/1600/900',
      ],
    },
    {
      id: 'rm_summit_twin',
      hotelId: 'h_summit',
      name: 'Twin Room • Breakfast included',
      description: 'Bright modern style, two beds, great value',
      price: 445,
      imageUrls: [
        'https://picsum.photos/seed/room-summit-twin-1/1600/900',
        'https://picsum.photos/seed/room-summit-twin-2/1600/900',
      ],
    },
    {
      id: 'rm_summit_deluxe',
      hotelId: 'h_summit',
      name: 'Deluxe Double • Breakfast included',
      description: 'Upgraded interior with balcony and extra storage space',
      price: 520,
      imageUrls: [
        'https://picsum.photos/seed/room-summit-deluxe-1/1600/900',
        'https://picsum.photos/seed/room-summit-deluxe-2/1600/900',
        'https://picsum.photos/seed/room-summit-deluxe-3/1600/900',
      ],
    },
    {
      id: 'rm_summit_suite',
      hotelId: 'h_summit',
      name: 'Suite • Breakfast included',
      description: 'Living area and top-floor views, best for longer stays',
      price: 690,
      imageUrls: [
        'https://picsum.photos/seed/room-summit-suite-1/1600/900',
        'https://picsum.photos/seed/room-summit-suite-2/1600/900',
      ],
    },

    {
      id: 'rm_matterhorn_double',
      hotelId: 'h_matterhorn',
      name: 'Double Room • Breakfast included',
      description: 'Bright room with mountain accents and a comfy bed',
      price: 520,
      imageUrls: [
        'https://picsum.photos/seed/room-matterhorn-1/1600/900',
        'https://picsum.photos/seed/room-matterhorn-2/1600/900',
        'https://picsum.photos/seed/room-matterhorn-3/1600/900',
      ],
    },
    {
      id: 'rm_matterhorn_twin',
      hotelId: 'h_matterhorn',
      name: 'Twin Room • Breakfast included',
      description: 'Two beds, warm wood accents, quiet side of the building',
      price: 505,
      imageUrls: [
        'https://picsum.photos/seed/room-matterhorn-twin-1/1600/900',
        'https://picsum.photos/seed/room-matterhorn-twin-2/1600/900',
      ],
    },
    {
      id: 'rm_matterhorn_deluxe',
      hotelId: 'h_matterhorn',
      name: 'Deluxe Double • Breakfast included',
      description: 'Balcony and upgraded materials, perfect après-ski comfort',
      price: 610,
      imageUrls: [
        'https://picsum.photos/seed/room-matterhorn-deluxe-1/1600/900',
        'https://picsum.photos/seed/room-matterhorn-deluxe-2/1600/900',
        'https://picsum.photos/seed/room-matterhorn-deluxe-3/1600/900',
      ],
    },
    {
      id: 'rm_matterhorn_suite',
      hotelId: 'h_matterhorn',
      name: 'Suite • Breakfast included',
      description: 'Separate lounge area and premium view line',
      price: 820,
      imageUrls: [
        'https://picsum.photos/seed/room-matterhorn-suite-1/1600/900',
        'https://picsum.photos/seed/room-matterhorn-suite-2/1600/900',
      ],
    },
    {
      id: 'rm_val_blanc_twin',
      hotelId: 'h_val_blanc',
      name: 'Twin Room • Room only',
      description: 'Two beds, clean and compact, ideal for short stays',
      price: 370,
      imageUrls: [
        'https://picsum.photos/seed/room-val-blanc-twin-1/1600/900',
        'https://picsum.photos/seed/room-val-blanc-twin-2/1600/900',
      ],
    },
    {
      id: 'rm_val_blanc_deluxe',
      hotelId: 'h_val_blanc',
      name: 'Deluxe Double • Breakfast included',
      description: 'More space, better view, and a calmer floor placement',
      price: 560,
      imageUrls: [
        'https://picsum.photos/seed/room-val-blanc-deluxe-1/1600/900',
        'https://picsum.photos/seed/room-val-blanc-deluxe-2/1600/900',
        'https://picsum.photos/seed/room-val-blanc-deluxe-3/1600/900',
      ],
    },
    {
      id: 'rm_val_blanc_double',
      hotelId: 'h_val_blanc',
      name: 'Double Room • Room only',
      description: 'Simple, bright, and practical for long ski days',
      price: 390,
      imageUrls: [
        'https://picsum.photos/seed/room-val-blanc-1/1600/900',
        'https://picsum.photos/seed/room-val-blanc-2/1600/900',
      ],
    },
    {
      id: 'rm_val_blanc_family',
      hotelId: 'h_val_blanc',
      name: 'Family Room • Breakfast included',
      description: 'Extra space and a sofa bed, good for groups',
      price: 520,
      imageUrls: [
        'https://picsum.photos/seed/room-val-family-1/1600/900',
        'https://picsum.photos/seed/room-val-family-2/1600/900',
      ],
    },
    {
      id: 'rm_alpine_peak_double',
      hotelId: 'h_alpine_peak',
      name: 'Deluxe Double • Breakfast included',
      description: 'Premium bedding, balcony, and iconic mountain view',
      price: 690,
      imageUrls: [
        'https://picsum.photos/seed/room-alpine-peak-1/1600/900',
        'https://picsum.photos/seed/room-alpine-peak-2/1600/900',
        'https://picsum.photos/seed/room-alpine-peak-3/1600/900',
      ],
    },
    {
      id: 'rm_alpine_peak_twin',
      hotelId: 'h_alpine_peak',
      name: 'Twin Room • Breakfast included',
      description: 'Premium twin setup with high-quality finishes',
      price: 640,
      imageUrls: [
        'https://picsum.photos/seed/room-alpine-peak-twin-1/1600/900',
        'https://picsum.photos/seed/room-alpine-peak-twin-2/1600/900',
      ],
    },
    {
      id: 'rm_alpine_peak_penthouse',
      hotelId: 'h_alpine_peak',
      name: 'Penthouse Suite • Breakfast included',
      description: 'Top-tier views, large lounge area, and premium amenities',
      price: 1180,
      imageUrls: [
        'https://picsum.photos/seed/room-alpine-peak-penthouse-1/1600/900',
        'https://picsum.photos/seed/room-alpine-peak-penthouse-2/1600/900',
        'https://picsum.photos/seed/room-alpine-peak-penthouse-3/1600/900',
      ],
    },
    {
      id: 'rm_alpine_peak_suite',
      hotelId: 'h_alpine_peak',
      name: 'Suite • Breakfast included',
      description: 'More space, lounge area, and top-floor view',
      price: 890,
      imageUrls: [
        'https://picsum.photos/seed/room-alpine-suite-1/1600/900',
        'https://picsum.photos/seed/room-alpine-suite-2/1600/900',
      ],
    },
    {
      id: 'rm_alpina_twin',
      hotelId: 'h_alpina',
      name: 'Twin Room • Room only',
      description: 'Simple twin setup, perfect for a budget-friendly stay',
      price: 305,
      imageUrls: [
        'https://picsum.photos/seed/room-alpina-twin-1/1600/900',
        'https://picsum.photos/seed/room-alpina-twin-2/1600/900',
      ],
    },
    {
      id: 'rm_alpina_triple',
      hotelId: 'h_alpina',
      name: 'Triple Room • Room only',
      description: 'Extra bed, good for small groups, compact and practical',
      price: 360,
      imageUrls: [
        'https://picsum.photos/seed/room-alpina-triple-1/1600/900',
        'https://picsum.photos/seed/room-alpina-triple-2/1600/900',
      ],
    },
    {
      id: 'rm_alpina_family',
      hotelId: 'h_alpina',
      name: 'Family Room • Breakfast included',
      description: 'More space with a sofa bed, ideal for families',
      price: 430,
      imageUrls: [
        'https://picsum.photos/seed/room-alpina-family-1/1600/900',
        'https://picsum.photos/seed/room-alpina-family-2/1600/900',
      ],
    },

  ],

  options: {
    transfer: [
      { id: 'tr_shared', title: 'Shared shuttle', summary: 'Shared shuttle', price: 80 },
      { id: 'tr_private', title: 'Private car', summary: 'Private car', price: 160 },
    ],
    flight: [
      { id: 'fl_emirates', title: 'Emirates', summary: 'Emirates', price: 260 },
      { id: 'fl_lufthansa', title: 'Lufthansa', summary: 'Lufthansa', price: 240 },
      { id: 'fl_airfrance', title: 'Air France', summary: 'Air France', price: 230 },
    ],
    insurance: [
      { id: 'ins_basic', title: 'Basic', summary: 'Basic', price: 0 },
      { id: 'ins_plus', title: 'Plus', summary: 'Plus', price: 25 },
    ],
    addons: [
      { id: 'ad_lessons', title: 'Ski lessons', summary: 'Ski lessons', price: 85 },
      { id: 'ad_spa', title: 'Spa', summary: 'Spa', price: 40 },
      { id: 'ad_nightlife', title: 'Nightlife', summary: 'Nightlife', price: 30 },
    ],
  },

  skipass: {
    zones: [
      { id: 'sz_standard', title: 'Standard zone', dayPrice: 70 },
      { id: 'sz_premium', title: 'Premium zone', dayPrice: 95 },
    ],
    days: [1, 3, 5, 7],
    levels: [
      { id: 'sl_standard', title: 'Standard', multiplier: 1 },
      { id: 'sl_premium', title: 'Premium', multiplier: 1.15 },
    ],
  },
  transferMeta: {
    from: 'From Geneva Airport',
    times: ['07:00', '10:00', '13:00', '16:00', '19:00'],
  },
  flightMeta: {
    classes: [
      { id: 'fc_economy', title: 'Economy', multiplier: 1 },
      { id: 'fc_premium', title: 'Premium Economy', multiplier: 1.25 },
      { id: 'fc_business', title: 'Business', multiplier: 2.1 },
    ],
    departures: ['12.01 15:40', '12.01 18:10', '13.01 09:20'],
  },
}

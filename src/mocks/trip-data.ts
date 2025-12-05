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
      { id: 'ins_standard', title: 'Insurance', summary: 'Standard coverage', price: 35 },
      { id: 'ins_plus', title: 'Insurance', summary: 'Plus coverage • extra medical', price: 55 },
    ],
    addons: [
      { id: 'ad_helmet', title: 'Helmet rental', summary: 'Helmet rental', price: 25 },
      { id: 'ad_lesson', title: '1 lesson', summary: 'Private lesson • 60 min', price: 85 },
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

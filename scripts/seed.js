// Seed the database with real Washington Heights businesses.
// Run once: node scripts/seed.js
// Safe to re-run — skips seeding if businesses already exist.

require('dotenv').config()
const mongoose = require('mongoose')
const Business = require('../server/models/Business')

const businesses = [
  // ── Restaurants ────────────────────────────────────────────────────────────
  {
    name: 'El Malecon',
    category: 'Restaurant',
    description: 'A Washington Heights institution since 1981. Famous for their slow-roasted rotisserie chicken, Dominican rice and beans, and fresh-squeezed tropical juices. A neighborhood staple loved by locals for over four decades.',
    address: '4141 Broadway, New York, NY 10033',
    phone: '(212) 927-3812',
    hours: 'Mon–Sun 7AM–12AM',
    website: '',
    instagram: '',
    approved: true
  },
  {
    name: 'New Leaf Restaurant & Bar',
    category: 'Restaurant',
    description: 'A hidden gem inside Fort Tryon Park with stunning views of the Hudson River. Serves seasonal American cuisine in a beautifully restored 1930s building. Great for brunch, dinner, or a quiet drink after a walk through the park.',
    address: '1 Margaret Corbin Dr, New York, NY 10040',
    phone: '(212) 568-5323',
    hours: 'Tue–Sun 12PM–10PM, Closed Mon',
    website: 'newleafnyc.com',
    instagram: '@newleafnyc',
    approved: true
  },
  {
    name: 'Cachapas y Mas',
    category: 'Restaurant',
    description: 'Authentic Venezuelan street food in the heart of Washington Heights. Known for their thick, sweet corn cachapas stuffed with queso de mano, tequeños, and hearty arepas. A must-try for anyone craving Venezuelan flavors.',
    address: '4341 Broadway, New York, NY 10033',
    phone: '(212) 942-0090',
    hours: 'Mon–Sun 8AM–11PM',
    website: '',
    instagram: '@cachapasymas',
    approved: true
  },
  {
    name: 'Margot Restaurant',
    category: 'Restaurant',
    description: 'A cozy French-American bistro bringing elevated neighborhood dining to Washington Heights. Seasonal menu with handmade pastas, wood-fired dishes, and a carefully curated natural wine list. One of Uptown\'s best-kept secrets.',
    address: '99 Arden St, New York, NY 10040',
    phone: '(917) 261-3202',
    hours: 'Tue–Sun 5PM–10PM, Closed Mon',
    website: 'margotnyc.com',
    instagram: '@margotrestaurantnyc',
    approved: true
  },

  // ── Barbershops ────────────────────────────────────────────────────────────
  {
    name: 'Uptown Cuts Barbershop',
    category: 'Barbershop',
    description: 'A classic Washington Heights barbershop with skilled barbers who specialize in fades, tapers, line-ups, and traditional straight razor shaves. Welcoming atmosphere with flat-screen TVs and good conversation. Walk-ins welcome.',
    address: '560 W 181st St, New York, NY 10033',
    phone: '(212) 923-4400',
    hours: 'Mon–Sat 8AM–8PM, Sun 9AM–6PM',
    website: '',
    instagram: '@uptowncutsnyc',
    approved: true
  },
  {
    name: 'Broadway Barbers',
    category: 'Barbershop',
    description: 'Family-owned barbershop serving the Heights community for over 15 years. Specializing in Dominican-style fades, kids cuts, and beard grooming. Known for their attention to detail and no-rush approach to every cut.',
    address: '4030 Broadway, New York, NY 10032',
    phone: '(212) 740-1200',
    hours: 'Mon–Sun 8AM–9PM',
    website: '',
    instagram: '',
    approved: true
  },

  // ── Grocery ────────────────────────────────────────────────────────────────
  {
    name: 'Associated Supermarket',
    category: 'Grocery',
    description: 'Full-service neighborhood supermarket stocked with a wide selection of Caribbean and Latin products alongside everyday essentials. Carries fresh produce, meats, plantains, and hard-to-find Dominican pantry staples.',
    address: '500 W 181st St, New York, NY 10033',
    phone: '(212) 923-5200',
    hours: 'Mon–Sun 7AM–10PM',
    website: '',
    instagram: '',
    approved: true
  },
  {
    name: 'La Cibaeña Bakery',
    category: 'Grocery',
    description: 'A beloved Dominican bakery offering freshly baked pan de agua, empanadas, pastelitos, and traditional cakes. The aroma of fresh bread fills the block every morning. A daily stop for residents grabbing breakfast on the go.',
    address: '670 W 187th St, New York, NY 10033',
    phone: '(212) 927-1100',
    hours: 'Mon–Sun 6AM–9PM',
    website: '',
    instagram: '',
    approved: true
  },

  // ── Health ─────────────────────────────────────────────────────────────────
  {
    name: 'Alianza Dominicana Community Health Center',
    category: 'Health',
    description: 'A trusted community health organization providing affordable primary care, mental health services, and wellness programs to Washington Heights residents since 1987. Bilingual staff, sliding scale fees, and same-week appointments available.',
    address: '2410 Amsterdam Ave, New York, NY 10033',
    phone: '(212) 740-1520',
    hours: 'Mon–Fri 8AM–6PM, Sat 9AM–1PM',
    website: 'alianzadominicanainc.org',
    instagram: '',
    approved: true
  },

  // ── Beauty ─────────────────────────────────────────────────────────────────
  {
    name: 'Bella Dominican Hair Salon',
    category: 'Beauty',
    description: 'Washington Heights\' go-to Dominican salon for blowouts, silk press, braids, and color treatments. Experienced stylists who know how to work with all hair textures. Walk-ins welcome but appointments always get priority.',
    address: '800 W 181st St, New York, NY 10033',
    phone: '(212) 781-3030',
    hours: 'Mon–Sat 8AM–8PM, Sun 9AM–6PM',
    website: '',
    instagram: '@belladominicannyc',
    approved: true
  },

  // ── Retail ─────────────────────────────────────────────────────────────────
  {
    name: 'Carrot Top Pastries',
    category: 'Retail',
    description: 'A beloved Uptown bakery with a loyal following built on made-from-scratch cakes, cookies, brownies, and specialty pastries. Known for their creative custom celebration cakes and rotating seasonal flavors. Worth the trip.',
    address: '5025 Broadway, New York, NY 10034',
    phone: '(212) 569-1532',
    hours: 'Mon–Sat 8AM–7PM, Sun 9AM–5PM',
    website: 'carrottoppastries.com',
    instagram: '@carrottoppastries',
    approved: true
  },

  // ── Services ───────────────────────────────────────────────────────────────
  {
    name: 'Heights Tax & Notary Services',
    category: 'Services',
    description: 'Bilingual tax preparation, notary, and immigration document services for Washington Heights residents. Experienced with individual returns, small business filings, and ITIN applications. Walk-ins welcome year-round — not just tax season.',
    address: '1800 St Nicholas Ave, New York, NY 10032',
    phone: '(212) 923-8800',
    hours: 'Mon–Sat 9AM–7PM',
    website: '',
    instagram: '',
    approved: true
  }
]

async function seed() {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')

  const existing = await Business.countDocuments()
  if (existing > 0) {
    console.log(`Database already has ${existing} businesses. Skipping seed.`)
    console.log('To force re-seed, delete existing documents first via the admin panel.')
    await mongoose.disconnect()
    return
  }

  await Business.insertMany(businesses)
  console.log(`✓ Seeded ${businesses.length} businesses successfully.`)
  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})

import { Destination, FoodItem, Festival, WeatherData } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'tarkarli-beach',
    name: 'Tarkarli Beach & Scuba Haven',
    marathiName: 'तारकर्ली बीच',
    category: 'Beaches',
    district: 'Sindhudurg',
    description: 'Pristine white sand beach famous for clear turquoise waters, scuba diving, and underwater coral reefs.',
    longDescription: 'Tarkarli is a coastal village in Malvan, Sindhudurg known for its long, narrow stretch of white sand beach with unusually clear waters. On a clear day, one can see up to 20 feet deep into the seabed. It is Maharashtra’s premier scuba diving and snorkeling hub, where certified divers guide visitors through marine life near Sindhudurg Fort.',
    bestTimeToVisit: 'October to May (Best underwater visibility)',
    seasonBadge: 'Summer Water Sports',
    coordinates: { lat: 16.0353, lng: 73.4682 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Scuba Diving & Snorkeling', 'Karli River Backwaters', 'Houseboat Stay', 'Dolphin Safari'],
    travelTips: 'Book scuba sessions early in the morning around 8:00 AM when the sea is calmest and visibility is crystal clear.',
    distanceKm: { mumbai: 530, pune: 390 },
    estimatedCostPerDay: 3500,
    popularFoodNearby: ['Malvani Surmai Thali', 'Sol Kadhi', 'Bangda Fry'],
    rating: 4.9,
    featured: true
  },
  {
    id: 'sindhudurg-fort',
    name: 'Sindhudurg Sea Fort',
    marathiName: 'सिंधुदुर्ग किल्ला',
    category: 'Sea Forts',
    district: 'Sindhudurg',
    description: 'Imposing 17th-century island sea fort built by Chhatrapati Shivaji Maharaj using 4000 maunds of iron casting.',
    longDescription: 'Constructed on Kurte Island in 1664, Sindhudurg Fort is an architectural marvel of Maratha naval power. Spanning over 48 acres, its massive 3-kilometer outer wall stands strong against ocean surges. It houses Shivaji Maharaj’s handprint and footprint preserved in lime, three freshwater wells surrounded by salty sea, and a unique temple dedicated to the Maratha ruler.',
    bestTimeToVisit: 'October to May (Ferries closed during heavy monsoons)',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.0592, lng: 73.4566 },
    images: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['48-Acre Fort Perimeter', 'Shivaji Maharaj Temple', 'Hidden Fort Entrance (Ranbaat)', 'Freshwater Ocean Wells'],
    travelTips: 'Reach Malvan Jetty by 9 AM to take the local ferry to the island fort. Wear comfortable footwear for walking on ramparts.',
    distanceKm: { mumbai: 525, pune: 385 },
    estimatedCostPerDay: 2200,
    popularFoodNearby: ['Kombdi Vade', 'Mori (Shark) Curry', 'Cashew Curry'],
    rating: 4.8,
    featured: true
  },
  {
    id: 'ganpatipule-temple',
    name: 'Ganpatipule Beach & Temple',
    marathiName: 'गणपतीपुळे',
    category: 'Temples',
    district: 'Ratnagiri',
    description: '400-year-old self-manifested (Swayambhu) Ganesha idol residing right on the tranquil coastline of Ratnagiri.',
    longDescription: 'Ganpatipule is one of the "Ashta Dwara Devatas" (Eight Gate Guardians) of India. The idol of Lord Ganesha faces west towards the Arabian ocean, guarding the western coast. The pristine surrounding beach is lined with coconut groves, mangroves, and red laterite soil roads, making it a sacred yet rejuvenating getaway.',
    bestTimeToVisit: 'September to March',
    seasonBadge: 'All Season',
    coordinates: { lat: 17.1447, lng: 73.2687 },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Swayambhu Ganpati Darshan', 'Sunset Beach Promenade', 'Malgund Prachin Konkan Museum', 'Alphonso Mango Orchards nearby'],
    travelTips: 'Combine your visit with Malgund village nearby, the birthplace of famous Marathi poet Keshavsut.',
    distanceKm: { mumbai: 330, pune: 290 },
    estimatedCostPerDay: 2800,
    popularFoodNearby: ['Modak Prasad', 'Ratnagiri Alphonso Juice', 'Sol Kadhi Thali'],
    rating: 4.7,
    featured: true
  },
  {
    id: 'murud-janjira-fort',
    name: 'Murud Janjira Sea Fort',
    marathiName: 'मुरुड जंजिरा',
    category: 'Sea Forts',
    district: 'Raigad',
    description: 'Impenetrable island fortress of the Siddis surrounded by the sea, famous for giant cannons like Kalal Bangadi.',
    longDescription: 'Murud Janjira stands undefeated in history, having survived attacks by the Marathas, British, and Portuguese. Accessible only by sailboat from Rajapuri jetty, the fort features 19 rounded bastions, royal palaces, fresh water lakes, and historical cannons including the legendary third largest cannon in India, Kalal Bangadi.',
    bestTimeToVisit: 'October to April',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 18.2987, lng: 72.8622 },
    images: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Sailboat Ocean Access', 'Kalal Bangadi Cannon', 'Siddi Palace Architecture', 'Murud Beach Watersports'],
    travelTips: 'Sailboats depend on ocean tides. Ensure you depart Rajapuri jetty before 4:00 PM for the last return boat.',
    distanceKm: { mumbai: 160, pune: 170 },
    estimatedCostPerDay: 2500,
    popularFoodNearby: ['Raigad Style Fish Curry', 'Prawns Koliwada', 'Tender Coconut Water'],
    rating: 4.8,
    featured: true
  },
  {
    id: 'amboli-ghat',
    name: 'Amboli Hill Station & Waterfalls',
    marathiName: 'आंबोली घाट',
    category: 'Hill Stations',
    district: 'Sindhudurg',
    description: 'Eco-hotspot hill station nestled in the Sahyadri mountains with misty rain, lush flora, and roaring waterfalls.',
    longDescription: 'Known as the "Cherrapunji of Maharashtra" due to its torrential monsoon rains, Amboli sits at an altitude of 690 meters in the Western Ghats. It is world-renowned for its endemic amphibians, vibrant bioluminescent fungi during rains, Amboli Waterfall, Shirgaonkar Point, and panoramic views of Sahyadri valleys.',
    bestTimeToVisit: 'June to October (Monsoon paradise)',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 15.9613, lng: 73.9984 },
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Amboli Main Waterfall', 'Hiranyakeshi River Origin Temple', 'Kavleshet Valley Echo Point', 'Night Herping & Biodiversity'],
    travelTips: 'Carry raincoat and non-slip trekking boots. Monsoon fog can drop visibility on the ghat roads.',
    distanceKm: { mumbai: 490, pune: 350 },
    estimatedCostPerDay: 2000,
    popularFoodNearby: ['Gharmuti Koli / Malvani Bhakri', 'Hot Kanda Bhajji with Chai', 'Pitla Bhakri'],
    rating: 4.7,
    featured: true
  },
  {
    id: 'velas-turtle-beach',
    name: 'Velas Turtle Nesting Village',
    marathiName: 'वेळास कासव ग्राम',
    category: 'Wildlife',
    district: 'Ratnagiri',
    description: 'Eco-tourism village famous for the annual Olive Ridley Sea Turtle Festival and baby hatchlings released into ocean.',
    longDescription: 'Velas is a quiet coastal hamlet in Ratnagiri that has embraced community-driven eco-tourism. Every spring between February and April, hundreds of endangered Olive Ridley sea turtle hatchlings break out of their sandy nests and waddle towards the Arabian Sea under local conservation monitoring.',
    bestTimeToVisit: 'February to April (Turtle Festival)',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 17.9587, lng: 73.0336 },
    images: [
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Olive Ridley Hatchling Release', 'Traditional Village Homestays', 'Bankot Fort Exploration', 'Serene Beach Walk'],
    travelTips: 'Stay in a village homestay to support the local conservationists and get morning 6:30 AM nest inspection updates.',
    distanceKm: { mumbai: 220, pune: 190 },
    estimatedCostPerDay: 1800,
    popularFoodNearby: ['Traditional Veg Kokani Thali', 'Ukadiche Modak', 'Sol Kadhi'],
    rating: 4.9,
    featured: true
  },
  {
    id: 'devbagh-sangam',
    name: 'Devbagh Sangam & Tsunami Island',
    marathiName: 'देवबाग संगम',
    category: 'Beaches',
    district: 'Sindhudurg',
    description: 'A thin strip of land flanked by Karli river backwaters on one side and the surging Arabian ocean on the other.',
    longDescription: 'Devbagh is the southern extension of Tarkarli where the Karli River merges with the Arabian ocean in a dramatic sangam (confluence). Tsunami Island, a shallow sandbar in the middle of the river backwaters, offers jet skiing, banana rides, and fresh grilled seafood served directly in knee-deep water.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'Summer Water Sports',
    coordinates: { lat: 15.9912, lng: 73.4912 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['River & Ocean Sangam', 'Tsunami Island Sandbar', 'Parasailing & Jet Skiing', 'Golden Beach Sunset'],
    travelTips: 'Take a early morning river cruise boat from Devbagh jetty to spot playful pink and grey dolphins.',
    distanceKm: { mumbai: 535, pune: 395 },
    estimatedCostPerDay: 3200,
    popularFoodNearby: ['Crab Masala', 'Devbagh Prawns Curry', 'Tender Coconut Shakes'],
    rating: 4.8
  },
  {
    id: 'vijaydurg-fort',
    name: 'Vijaydurg Marine Fort',
    marathiName: 'विजयदुर्ग किल्ला',
    category: 'Sea Forts',
    district: 'Sindhudurg',
    description: 'Oldest fort in Sindhudurg built during the Shilahara dynasty and fortified by Shivaji Maharaj with underwater walls.',
    longDescription: 'Vijaydurg (Victory Fort) is surrounded by ocean on three sides. It is famous for Maratha admiral Kanhoji Angre’s naval base and an ancient 500-meter long submerged wall built 10 meters under the sea to destroy enemy warships venturing near the coast.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.5583, lng: 73.3328 },
    images: [
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Submerged Ocean Naval Wall', 'Underground Escape Tunnel', 'Helium Gas Discovery Site', 'Maratha Dockyard Remains'],
    travelTips: 'Hire a government approved fort guide near the entrance gate to uncover historical Maratha military secrets.',
    distanceKm: { mumbai: 420, pune: 340 },
    estimatedCostPerDay: 2100,
    popularFoodNearby: ['Vijaydug Surmai Fry', 'Kombdi Vade', 'Sol Kadhi'],
    rating: 4.6
  },
  {
    id: 'alibaug-varsoli-beach',
    name: 'Alibaug & Varsoli Beach',
    marathiName: 'अलिबाग वरसोली बीच',
    category: 'Beaches',
    district: 'Raigad',
    description: 'Popular weekend coastal retreat near Mumbai with black sand beaches, watersports, and Kolaba Fort.',
    longDescription: 'Alibaug is the northern gateway to Kokan tourism, accessible via a short speedboat ride from Gateway of India to Mandwa Jetty. Varsoli beach offers calm waters, cypress trees, and jet skiing, while Kolaba Fort sits 1 km inside the sea and can be walked to during low tide.',
    bestTimeToVisit: 'September to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 18.6414, lng: 72.8722 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Walk to Kolaba Fort at Low Tide', 'Speedboat from Mumbai', 'Varsoli Watersports', 'Fresh Seafood Stalls'],
    travelTips: 'Check tide schedules at Alibaug beach before walking to Kolaba Fort to avoid high tide traps.',
    distanceKm: { mumbai: 95, pune: 140 },
    estimatedCostPerDay: 3000,
    popularFoodNearby: ['Alibaugi Crab Curry', 'Popat / Pomfret Tawa Fry', 'Poha & Chai'],
    rating: 4.5
  },
  {
    id: 'guhagar-beach',
    name: 'Guhagar White Sand Beach',
    marathiName: 'गुहागर',
    category: 'Beaches',
    district: 'Ratnagiri',
    description: 'Clean, untouched 6 km crescent white sand beach flanked by betel nut (supari) and coconut plantations.',
    longDescription: 'Guhagar lies between the Vashisthi River and the Jaigad Creek. It is revered for its peaceful atmosphere, ancient Vyaneshwar Temple, Durga Devi Temple, and vast betel nut groves. The beach is safe for long evening walks and family picnics.',
    bestTimeToVisit: 'October to April',
    seasonBadge: 'All Season',
    coordinates: { lat: 17.4812, lng: 73.1983 },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['6 km Pristine Sand Shore', 'Vyashwar Shiva Temple', 'Betel Nut (Supari) Groves', 'Sunset Point'],
    travelTips: 'Enjoy authentic Brahmanical Kokanastha vegetarian thali or Malvani seafood at local home mess (Khanaval).',
    distanceKm: { mumbai: 290, pune: 230 },
    estimatedCostPerDay: 2200,
    popularFoodNearby: ['Kaju Usal', 'Ghavane with Coconut Chutney', 'Sol Kadhi'],
    rating: 4.7
  },
  {
    id: 'kunkeshwar-temple-beach',
    name: 'Kunkeshwar Temple & Beach',
    marathiName: 'कुणकेश्वर',
    category: 'Temples',
    district: 'Sindhudurg',
    description: 'Magnificent 11th-century Chola-style stone Shiva temple right on the ocean shoreline, dubbed "Kashi of South Kokan".',
    longDescription: 'Built in 1100 AD, Kunkeshwar Temple is an architectural gem made of laterite stone standing on a elevated seashore. Legend says a Muslim sailor built it after surviving a terrible shipwreck nearby. The temple overlooks a clean, uncrowded beach surrounded by mango orchards.',
    bestTimeToVisit: 'October to March (Grand celebration during Mahashivratri)',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.3338, lng: 73.3879 },
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Seaside Stone Shiva Temple', 'Mahashivratri Fair', 'Devgad Alphonso Mango Orchards', 'Calm Swimming Beach'],
    travelTips: 'Visit Devgad Fort and Alphonso mango packing units located just 5 km from Kunkeshwar in summer (March-May).',
    distanceKm: { mumbai: 470, pune: 370 },
    estimatedCostPerDay: 2100,
    popularFoodNearby: ['Devgad Mango Halwa', 'Surmai Tawa Fry', 'Amba Poli'],
    rating: 4.8
  },
  {
    id: 'harihareshwar-beach',
    name: 'Harihareshwar & Shrivardhan',
    marathiName: 'हरिहरेश्वर',
    category: 'Temples',
    district: 'Raigad',
    description: 'Revered as "Dakshin Kashi" surrounded by four holy hills: Harihareshwar, Harshinagiri, Bramhagiri, and Kalagiri.',
    longDescription: 'Harihareshwar is famous for its rocky cliff pradakshina (circumambulation path) carved naturally by ocean wave erosion. The temple complex dates back to Maratha Peshwas. Nearby Shrivardhan beach offers calm black sand waters and water sports.',
    bestTimeToVisit: 'September to April',
    seasonBadge: 'All Season',
    coordinates: { lat: 17.9942, lng: 73.0222 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Natural Rocky Pradakshina Path', 'Harihareshwar Shiva Temple', 'Shrivardhan Speedboats', 'Bagmandla Ferry to Bankot'],
    travelTips: 'The cliff pradakshina route is accessible only during LOW TIDE. Do not attempt during rising ocean tides.',
    distanceKm: { mumbai: 200, pune: 170 },
    estimatedCostPerDay: 2400,
    popularFoodNearby: ['Surmai Thali', 'Ukadiche Modak', 'Sol Kadhi'],
    rating: 4.7
  },
  {
    id: 'dapoli-murud-beach',
    name: 'Dapoli & Murud Harnai Beach',
    marathiName: 'दापोली',
    category: 'Beaches',
    district: 'Ratnagiri',
    description: 'Mini-Mahabaleshwar of Kokan with cool climate, hot water springs at Unhavare, and Harnai live fish auction at sea.',
    longDescription: 'Dapoli is a elevated town surrounded by dense forests and beaches. Murud-Dapoli beach is famous for water sports, dolphin cruises, and the daily afternoon fish auction right on Harnai sea beach where hundreds of colorful fishing trawlers land.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 17.7554, lng: 73.1878 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Harnai Beach Daily Fish Auction', 'Unhavare Natural Sulfur Springs', 'Suvarnadurg Sea Fort View', 'Dolphin Watching'],
    travelTips: 'Be at Harnai beach by 4:00 PM to witness the vibrant sea fish auction directly from Maratha style boats.',
    distanceKm: { mumbai: 230, pune: 180 },
    estimatedCostPerDay: 2600,
    popularFoodNearby: ['Fresh Harvested Prawns Fry', 'Sol Kadhi', 'Kombdi Vade'],
    rating: 4.7
  },
  {
    id: 'sawantwadi-palace',
    name: 'Sawantwadi Palace & Ganjifa Art',
    marathiName: 'सावंतवाडी',
    category: 'Cultural Heritage',
    district: 'Sindhudurg',
    description: 'Royal palace town renowned for wooden toy making, hand-painted Ganjifa playing cards, and Moti Talao lake.',
    longDescription: 'Sawantwadi was the capital of the royal Bhonsle Kingdom. The red stone Sawantwadi Palace houses a museum dedicated to Ganjifa—a traditional 300-year-old Indian circular playing card craft kept alive by the royal family. The town is famous worldwide for lacquer-painted wooden toys.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 15.9038, lng: 73.8181 },
    images: [
      'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['Sawantwadi Royal Palace', 'Heritage Wooden Toy Market', 'Ganjifa Card Live Demo', 'Moti Talao Evening Lights'],
    travelTips: 'Buy authentic handmade wooden fruit sets and lacquer painted toys directly from Chitar Ali market.',
    distanceKm: { mumbai: 510, pune: 375 },
    estimatedCostPerDay: 2100,
    popularFoodNearby: ['Sawantwadi Malvani Khaja', 'Cashew Nut Curry', 'Sol Kadhi'],
    rating: 4.6
  },
  {
    id: 'kelwa-beach-palghar',
    name: 'Kelwa Beach & Fort',
    marathiName: 'केळवे बीच',
    category: 'Beaches',
    district: 'Palghar',
    description: 'Dense Casuarina plantation beach near Mumbai with ancient Portuguese fort ruins surrounded by sea tides.',
    longDescription: 'Kelwa Beach in Palghar district spans 7 kilometers along the northern Kokan belt. It features dense cypress forests along the coastline, camel rides, and two historic forts—Kelwa Fort and Sheetla Devi Temple.',
    bestTimeToVisit: 'October to April',
    seasonBadge: 'All Season',
    coordinates: { lat: 19.6201, lng: 72.7302 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    highlights: ['7km Suru (Casuarina) Forest Beach', 'Kelwa Sea Fort Ruins', 'Sheetla Devi Temple', 'Buggy Rides'],
    travelTips: 'Great quick getaway from Mumbai via western railway train to Palghar station.',
    distanceKm: { mumbai: 110, pune: 210 },
    estimatedCostPerDay: 1900,
    popularFoodNearby: ['Agri Coastal Fish Fry', 'Neera Drink', 'Chiku Shake'],
    rating: 4.4
  }
];

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'sol-kadhi',
    name: 'Authentic Sol Kadhi',
    marathiName: 'सोल कढी',
    category: 'Beverages',
    region: 'Entire Kokan Belt (Malvan/Ratnagiri)',
    description: 'Refreshing pink digestive drink prepared from fresh wild kokum (Garcinia indica) extract and thick coconut milk infused with garlic and green chilies.',
    priceEstimate: '₹40 - ₹80 per glass',
    ingredients: ['Fresh Kokum Extract', 'Thick Coconut Milk', 'Garlic', 'Green Chili', 'Coriander', 'Rock Salt'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isSpicy: false,
    mustTryPlaces: ['Atithi Parinay (Ratnagiri)', 'Hotel Chaitanya (Malvan)', 'Gajaraj Mess (Alibaug)']
  },
  {
    id: 'kombdi-vade',
    name: 'Malvani Kombdi Vade',
    marathiName: 'कोम्बडी वडे',
    category: 'Seafood Special',
    region: 'Sindhudurg & Ratnagiri',
    description: 'Rich, spicy Malvani chicken curry served with deep-fried multi-grain puris (Vade) made from rice flour, black gram, coriander, and spices.',
    priceEstimate: '₹220 - ₹380 per plate',
    ingredients: ['Free-range Chicken', 'Malvani Masala', 'Roasted Coconut Paste', 'Rice & Urad Flour Vade', 'Onions'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    mustTryPlaces: ['Bambai Rasoi (Tarkarli)', 'Hotel Swami (Malvan Jetty)', 'Purna Brahma (Devgad)']
  },
  {
    id: 'surmai-tawa-fry',
    name: 'Kokan Surmai Tawa Fry',
    marathiName: 'सुरमई तवा फ्राय',
    category: 'Seafood Special',
    region: 'Malvan, Alibaug & Ratnagiri',
    description: 'Thick King Mackerel (Surmai) steak marinated in lemon juice, red chili paste, and Malvani spices, shallow fried on iron tawa with semolina (rava) crust.',
    priceEstimate: '₹300 - ₹500 per portion',
    ingredients: ['Fresh Surmai Steak', 'Chili-Garlic Paste', 'Malvani Spice Rub', 'Coarse Rava / Semolina', 'Kokum Agal'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    mustTryPlaces: ['Sanman Restaurant (Alibaug)', 'Only Fish (Ganpatipule)', 'Chaitanya (Malvan)']
  },
  {
    id: 'ukadiche-modak',
    name: 'Steamed Ukadiche Modak',
    marathiName: 'उकडीचे मोदक',
    category: 'Desserts & Sweets',
    region: 'Entire Kokan Region',
    description: 'Traditional Maratha sweet dumpling made from steamed rice flour stuffed with freshly grated coconut, organic jaggery, cardamom, and topped with hot desi ghee.',
    priceEstimate: '₹40 - ₹70 per piece',
    ingredients: ['Fine Ambemohar Rice Flour', 'Fresh Grated Coconut', 'Organic Jaggery', 'Nutmeg & Cardamom', 'Desi Cow Ghee'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    isSpicy: false,
    mustTryPlaces: ['Modak House (Ganpatipule)', 'Joshi Khanaval (Harihareshwar)', 'Local Homestays']
  },
  {
    id: 'ghavane-kaju-usal',
    name: 'Ghavane with Kaju Usal',
    marathiName: 'घावणे आणि काजू उसळ',
    category: 'Traditional Veg',
    region: 'Sindhudurg (Sawantwadi & Malvan)',
    description: 'Lacy, paper-thin steamed rice crepes (Ghavane) served with a luscious gravy of tender green cashew nuts (Tender Kaju) cooked in coconut paste.',
    priceEstimate: '₹140 - ₹220 per thali',
    ingredients: ['Soaked Rice Batter', 'Fresh Green Cashew Nuts', 'Gratin Coconut Paste', 'Mustard Seeds', 'Curry Leaves'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isSpicy: false,
    mustTryPlaces: ['Atithi Griha (Sawantwadi)', 'Prachin Konkan Mess (Ganpatipule)', 'Bhartiya Niwas (Kudal)']
  },
  {
    id: 'malvani-crab-masala',
    name: 'Malvani Crab Curry & Fry',
    marathiName: 'मालवणी खेकडा मसाला',
    category: 'Seafood Special',
    region: 'Devbagh & Malvan',
    description: 'Fresh sea crabs simmered in aromatic roasted coconut gravy rich with stone-ground Malvani spices, roasted coriander, and whole dry chilies.',
    priceEstimate: '₹350 - ₹600 per portion',
    ingredients: ['Fresh Sea Crabs', 'Kanda Lasun Masala', 'Dry Coconut (Kopra)', 'Tamarind / Kokum', 'Garlic'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    isSpicy: true,
    mustTryPlaces: ['Devbagh Sangam Shack', 'Atithi Parinay', 'Hotel Sea View (Dapoli)']
  }
];

export const INITIAL_FESTIVALS: Festival[] = [
  {
    id: 'ganesh-chaturthi-kokan',
    name: 'Kokan Ganesh Chaturthi',
    marathiName: 'कोकण गणेशोत्सव',
    month: 'August - September (Bhadrapada)',
    description: 'The soul of Kokan. Millions of Kokanis working across the world return to their ancestral village homes (Ghar) for 5 to 11 days of grand deity worship, lighting, and community feasts.',
    significance: 'Celebrates Lord Ganesha as the protector of sea voyagers and crop harvest. Ancestral houses are decorated with banana leaves, hibiscus, and handcrafted eco-friendly idols.',
    topDistricts: ['Ratnagiri', 'Sindhudurg', 'Raigad'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    keyAttractions: ['Jakadi & Naman Folk Songs', 'Home-cooked Ukadiche Modak', 'Village Aarti Processions', 'Eco-friendly Immersion']
  },
  {
    id: 'shimga-holi-kokan',
    name: 'Kokan Shimga (Holi)',
    marathiName: 'कोकण शिमगा',
    month: 'March (Phalguna)',
    description: 'A 15-day vibrant cultural festival where village Palkhis (Palanqins of local deities) travel house to house accompanied by traditional dhol drums, dancing, and color spraying.',
    significance: 'Deities visit every home to bless crops and fishermen before the onset of summer. Village folk perform "Sankasur" theatrical folk dance.',
    topDistricts: ['Ratnagiri', 'Sindhudurg'],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    keyAttractions: ['Palkhi Nrutya (Dancing Palanquin)', 'Sankasur Folk Drama', 'Homghat Bonfire', 'Village Community Feasts']
  },
  {
    id: 'narali-purnima',
    name: 'Narali Purnima (Coconut Festival)',
    marathiName: 'नारळी पौर्णिमा',
    month: 'August (Shravan)',
    description: 'Fishermen community festival marking the official end of monsoon sea ban. Golden coconuts are offered to the Ocean God (Darya Raja) before boats set sail into deep ocean.',
    significance: 'Fishermen express gratitude to the ocean, decorate their colorful trawlers, and cook sweet Narali Bhat (Coconut Rice).',
    topDistricts: ['Raigad', 'Sindhudurg', 'Palghar', 'Thane'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    keyAttractions: ['Decorated Boat Rally in Sea', 'Golden Coconut Offering', 'Narali Bhat Sweet Dish', 'Koli Dance Performance']
  },
  {
    id: 'anganewadi-jatra',
    name: 'Anganewadi Bharadi Devi Jatra',
    marathiName: 'आंगणेवाडी भराडी देवी जत्रा',
    month: 'February',
    description: 'Massive annual fair in Malvan drawing over 10-15 lakh devotees to worship Goddess Bharadi Devi who fulfills wishes (Navas).',
    significance: 'The date is decided dynamically by Goddess prasad-kaul omens. Entire district transformed into a grand festive bazaar.',
    topDistricts: ['Sindhudurg'],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    keyAttractions: ['Mass Community Kitchen (Mahaprasad)', 'Malvani Handicraft Fair', 'Devotional Bhajans', 'Traditional Night Bazaars']
  }
];

export const DEFAULT_WEATHER_DATA: Record<string, WeatherData> = {
  'Sindhudurg': {
    district: 'Sindhudurg',
    tempC: 28,
    condition: 'Pleasant Coastal Breeze',
    humidity: 72,
    monsoonAlert: false,
    recommendedActivities: ['Scuba diving at Tarkarli', 'Sunset ferry to Sindhudurg Fort', 'Sawantwadi Palace tour'],
    placesToVisitNow: ['Tarkarli Beach', 'Devbagh Sangam', 'Kunkeshwar Temple'],
    seaCondition: 'Calm'
  },
  'Ratnagiri': {
    district: 'Ratnagiri',
    tempC: 29,
    condition: 'Partly Sunny',
    humidity: 70,
    monsoonAlert: false,
    recommendedActivities: ['Ganpatipule Ganesha Darshan', 'Aare Ware coastal drive', 'Alphonso tasting at orchards'],
    placesToVisitNow: ['Ganpatipule Beach', 'Velas Turtle Village', 'Guhagar Beach'],
    seaCondition: 'Calm'
  },
  'Raigad': {
    district: 'Raigad',
    tempC: 30,
    condition: 'Warm Sunshine',
    humidity: 68,
    monsoonAlert: false,
    recommendedActivities: ['Murud Janjira boat trip', 'Varsoli jet skiing', 'Pradakshina at Harihareshwar'],
    placesToVisitNow: ['Murud Janjira', 'Harihareshwar', 'Alibaug'],
    seaCondition: 'Calm'
  },
  'Palghar': {
    district: 'Palghar',
    tempC: 31,
    condition: 'Sunny Shoreline',
    humidity: 65,
    monsoonAlert: false,
    recommendedActivities: ['Kelwa cypress wood walks', 'Sheetla Devi Temple', 'Buggy rides'],
    placesToVisitNow: ['Kelwa Beach', 'Shirgaon Fort', 'Bordain Shore'],
    seaCondition: 'Calm'
  },
  'Thane': {
    district: 'Thane',
    tempC: 31,
    condition: 'Clear Sky',
    humidity: 64,
    monsoonAlert: false,
    recommendedActivities: ['Gaimukh promenade walk', 'Yeoor Hills nature trail', 'Creek boat safari'],
    placesToVisitNow: ['Yeoor Hills', 'Upvan Lake', 'Gaimukh Waterfront'],
    seaCondition: 'Calm'
  }
};

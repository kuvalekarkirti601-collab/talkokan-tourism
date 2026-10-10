import { Destination, FoodItem, Festival, WeatherData } from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  // =========================
  // EXISTING SINDHUDURG
  // =========================

  {
    id: 'sindhudurg-tarkarli',
    name: 'Tarkarli Beach & Scuba Haven',
    marathiName: 'तारकर्ली समुद्रकिनारा',
    category: 'Beaches',
    district: 'Sindhudurg',
    taluka: 'Malvan',
    description:
      'A beautiful white-sand beach famous for clear waters, water sports and scuba diving.',
    longDescription:
      'Tarkarli is one of the most popular coastal destinations in Sindhudurg, known for its clean beach, turquoise water, scuba diving, snorkeling and peaceful surroundings.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'Summer Water Sports',
    coordinates: { lat: 16.0397, lng: 73.4933 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    highlights: [
      'Scuba Diving',
      'Snorkeling',
      'Water Sports',
      'Beautiful Beach',
    ],
    travelTips:
      'Carry sunscreen, sunglasses and comfortable beachwear. Book water activities from authorized operators.',
    distanceKm: { mumbai: 490, pune: 390 },
    estimatedCostPerDay: 1800,
    popularFoodNearby: ['Malvani Fish Thali', 'Sol Kadhi', 'Kombdi Vade'],
    rating: 4.8,
    featured: true,
  },

  {
    id: 'sindhudurg-fort',
    name: 'Sindhudurg Sea Fort',
    marathiName: 'सिंधुदुर्ग किल्ला',
    category: 'Sea Forts',
    district: 'Sindhudurg',
    taluka: 'Malvan',
    description:
      'Historic sea fort built by Chhatrapati Shivaji Maharaj in the Arabian Sea.',
    longDescription:
      'Sindhudurg Fort is a magnificent sea fort near Malvan. Built by Chhatrapati Shivaji Maharaj, it represents Maratha naval strength and coastal architecture.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.0418, lng: 73.4626 },
    images: [
      'https://images.unsplash.com/photo-1595658658481-d53d3f999875',
    ],
    highlights: [
      'Historic Fort',
      'Boat Ride',
      'Arabian Sea Views',
      'Maratha History',
    ],
    travelTips:
      'Take a boat from Malvan jetty. Avoid visiting during rough sea conditions.',
    distanceKm: { mumbai: 490, pune: 390 },
    estimatedCostPerDay: 1600,
    popularFoodNearby: ['Malvani Fish Curry', 'Sol Kadhi'],
    rating: 4.8,
    featured: true,
  },

  {
    id: 'amboli',
    name: 'Amboli Hill Station & Waterfalls',
    marathiName: 'आंबोली घाट',
    category: 'Hill Stations',
    district: 'Sindhudurg',
    taluka: 'Sawantwadi',
    description:
      'A lush Western Ghats hill station famous for monsoon waterfalls and misty landscapes.',
    longDescription:
      'Amboli is one of Maharashtra’s most scenic hill stations. During monsoon, the region becomes extremely green and numerous waterfalls appear along the Sahyadri ranges.',
    bestTimeToVisit: 'June to February',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 15.9566, lng: 74.0025 },
    images: [
      'https://images.unsplash.com/photo-1500534623283-312aade485b7',
    ],
    highlights: [
      'Waterfalls',
      'Western Ghats',
      'Misty Roads',
      'Nature Photography',
    ],
    travelTips:
      'Drive carefully during monsoon because roads can become slippery and foggy.',
    distanceKm: { mumbai: 475, pune: 390 },
    estimatedCostPerDay: 1500,
    popularFoodNearby: ['Kanda Bhaji', 'Misal', 'Hot Tea'],
    rating: 4.7,
    featured: true,
  },

  {
    id: 'devbagh',
    name: 'Devbagh Sangam & Tsunami Island',
    marathiName: 'देवबाग संगम',
    category: 'Beaches',
    district: 'Sindhudurg',
    taluka: 'Malvan',
    description:
      'A scenic coastal area where the Karli River meets the Arabian Sea.',
    longDescription:
      'Devbagh is famous for its scenic river-sea meeting point, boat rides and nearby Tsunami Island. It is a peaceful destination for nature lovers.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'Summer Water Sports',
    coordinates: { lat: 16.0202, lng: 73.4665 },
    images: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
    ],
    highlights: [
      'River-Sea Sangam',
      'Boat Ride',
      'Tsunami Island',
      'Sunset',
    ],
    travelTips:
      'Check local boat timings before planning your visit to Tsunami Island.',
    distanceKm: { mumbai: 495, pune: 395 },
    estimatedCostPerDay: 1700,
    popularFoodNearby: ['Fresh Fish', 'Sol Kadhi', 'Malvani Thali'],
    rating: 4.7,
  },

  {
    id: 'vijaydurg',
    name: 'Vijaydurg Marine Fort',
    marathiName: 'विजयदुर्ग किल्ला',
    category: 'Sea Forts',
    district: 'Sindhudurg',
    taluka: 'Devgad',
    description:
      'Historic coastal fort surrounded by the Arabian Sea.',
    longDescription:
      'Vijaydurg is one of the strongest sea forts on the Konkan coast and has an important place in Maratha naval history.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.5574, lng: 73.3367 },
    images: [
      'https://images.unsplash.com/photo-1595658658481-d53d3f999875',
    ],
    highlights: [
      'Historic Fort',
      'Sea Views',
      'Maratha History',
      'Coastal Architecture',
    ],
    travelTips:
      'Wear comfortable shoes because you will walk around the fort area.',
    distanceKm: { mumbai: 440, pune: 370 },
    estimatedCostPerDay: 1500,
    popularFoodNearby: ['Malvani Fish Curry', 'Sol Kadhi'],
    rating: 4.7,
  },

  {
    id: 'kunkeshwar',
    name: 'Kunkeshwar Temple & Beach',
    marathiName: 'कुणकेश्वर मंदिर',
    category: 'Temples',
    district: 'Sindhudurg',
    taluka: 'Devgad',
    description:
      'Ancient Shiva temple located beside a beautiful Arabian Sea beach.',
    longDescription:
      'Kunkeshwar is a peaceful pilgrimage destination where the historic Shiva temple stands beside the Arabian Sea, creating a unique spiritual and coastal experience.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.2862, lng: 73.3908 },
    images: [
      'https://images.unsplash.com/photo-1604608672516-f1b9a2f3b7b4',
    ],
    highlights: [
      'Ancient Temple',
      'Beach',
      'Sunrise',
      'Spiritual Experience',
    ],
    travelTips:
      'Visit early morning for a peaceful temple and beach experience.',
    distanceKm: { mumbai: 455, pune: 370 },
    estimatedCostPerDay: 1400,
    popularFoodNearby: ['Ghavane', 'Sol Kadhi', 'Fish Curry'],
    rating: 4.6,
  },

  // =========================
  // KANKAVLI TALUKA
  // =========================

  {
    id: 'kankavli-nadivade',
    name: 'Nadivade Waterfall',
    marathiName: 'नादिवडे धबधबा',
    category: 'Waterfalls',
    district: 'Sindhudurg',
    taluka: 'Kankavli',
    description:
      'A peaceful seasonal waterfall surrounded by greenery near Kankavli.',
    longDescription:
      'Nadivade and the surrounding Kankavli region become especially scenic during the monsoon season, with greenery, streams and small waterfalls.',
    bestTimeToVisit: 'June to September',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 16.26, lng: 73.68 },
    images: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    ],
    highlights: [
      'Monsoon Waterfall',
      'Greenery',
      'Nature Photography',
      'Peaceful Location',
    ],
    travelTips:
      'Wear proper footwear and avoid slippery rocks during heavy rain.',
    distanceKm: { mumbai: 470, pune: 390 },
    estimatedCostPerDay: 1000,
    popularFoodNearby: ['Ghavane', 'Sol Kadhi'],
    rating: 4.4,
  },

  {
    id: 'kankavli-kumbhavade',
    name: 'Kumbhavade Waterfall',
    marathiName: 'कुंभवडे धबधबा',
    category: 'Waterfalls',
    district: 'Sindhudurg',
    taluka: 'Kankavli',
    description:
      'A green monsoon destination surrounded by the Sahyadri landscape.',
    longDescription:
      'The Kankavli region offers several seasonal streams and waterfalls during monsoon, making it ideal for short nature trips.',
    bestTimeToVisit: 'June to September',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 16.28, lng: 73.65 },
    images: [
      'https://images.unsplash.com/photo-1511497584788-876760111969',
    ],
    highlights: [
      'Waterfall',
      'Forest',
      'Monsoon',
      'Photography',
    ],
    travelTips:
      'Check local road conditions before travelling during heavy rainfall.',
    distanceKm: { mumbai: 475, pune: 395 },
    estimatedCostPerDay: 1000,
    popularFoodNearby: ['Malvani Thali', 'Sol Kadhi'],
    rating: 4.3,
  },

  {
    id: 'kankavli-kasarda',
    name: 'Kasarda Ghat',
    marathiName: 'कासार्डा घाट',
    category: 'Viewpoints',
    district: 'Sindhudurg',
    taluka: 'Kankavli',
    description:
      'A scenic ghat route offering beautiful Sahyadri views.',
    longDescription:
      'Kasarda Ghat connects the Konkan region with the interior and offers beautiful green landscapes, especially during the monsoon.',
    bestTimeToVisit: 'June to February',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 16.35, lng: 73.67 },
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    ],
    highlights: [
      'Mountain Views',
      'Monsoon Greenery',
      'Road Trip',
      'Photography',
    ],
    travelTips:
      'Drive slowly around bends and avoid stopping at unsafe road edges.',
    distanceKm: { mumbai: 470, pune: 390 },
    estimatedCostPerDay: 1000,
    popularFoodNearby: ['Tea', 'Bhaji', 'Ghavane'],
    rating: 4.5,
  },

  // =========================
  // KUDAL TALUKA
  // =========================

  {
    id: 'kudal-nerur',
    name: 'Nerurpar Temple & Nature',
    marathiName: 'नेरूरपर मंदिर',
    category: 'Temples',
    district: 'Sindhudurg',
    taluka: 'Kudal',
    description:
      'A peaceful cultural and natural destination around Nerur.',
    longDescription:
      'Nerur and nearby villages showcase traditional Konkan culture, temples, greenery and peaceful rural landscapes.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.08, lng: 73.69 },
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada',
    ],
    highlights: [
      'Temple',
      'Village Culture',
      'Greenery',
      'Photography',
    ],
    travelTips:
      'Respect local customs when visiting temples and village areas.',
    distanceKm: { mumbai: 485, pune: 400 },
    estimatedCostPerDay: 1000,
    popularFoodNearby: ['Ghavane', 'Usal', 'Sol Kadhi'],
    rating: 4.3,
  },

  {
    id: 'kudal-tillari-view',
    name: 'Tillari Valley View',
    marathiName: 'तिलारी खोरे',
    category: 'Viewpoints',
    district: 'Sindhudurg',
    taluka: 'Kudal',
    description:
      'Scenic valley landscapes with lush Sahyadri greenery.',
    longDescription:
      'The Tillari region around northern Sindhudurg provides beautiful views of forests, valleys and the Western Ghats.',
    bestTimeToVisit: 'June to February',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 15.98, lng: 74.08 },
    images: [
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    ],
    highlights: [
      'Valley Views',
      'Western Ghats',
      'Greenery',
      'Road Trip',
    ],
    travelTips:
      'Carry water and avoid isolated trails after sunset.',
    distanceKm: { mumbai: 500, pune: 420 },
    estimatedCostPerDay: 1100,
    popularFoodNearby: ['Local Thali', 'Tea', 'Bhaji'],
    rating: 4.5,
  },

  // =========================
  // MALVAN TALUKA
  // =========================

  {
    id: 'malvan-rock-garden',
    name: 'Malvan Rock Garden',
    marathiName: 'मालवण रॉक गार्डन',
    category: 'Viewpoints',
    district: 'Sindhudurg',
    taluka: 'Malvan',
    description:
      'A scenic rocky coastal garden overlooking the Arabian Sea.',
    longDescription:
      'Malvan Rock Garden is popular for sunset views, sea breeze and its rocky coastline.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.058, lng: 73.471 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    highlights: [
      'Sunset',
      'Sea View',
      'Photography',
      'Rocky Coast',
    ],
    travelTips:
      'Wear comfortable footwear and be careful near wet rocks.',
    distanceKm: { mumbai: 490, pune: 390 },
    estimatedCostPerDay: 1200,
    popularFoodNearby: ['Fish Fry', 'Sol Kadhi'],
    rating: 4.5,
  },

  {
    id: 'malvan-chivla',
    name: 'Chivla Beach',
    marathiName: 'चिवला बीच',
    category: 'Beaches',
    district: 'Sindhudurg',
    taluka: 'Malvan',
    description:
      'A peaceful beach near Malvan town.',
    longDescription:
      'Chivla Beach is a relatively quiet coastal destination with beautiful sunsets and a relaxed atmosphere.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.064, lng: 73.475 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    highlights: [
      'Sunset',
      'Beach Walk',
      'Photography',
      'Peaceful Atmosphere',
    ],
    travelTips:
      'Avoid swimming in rough sea conditions.',
    distanceKm: { mumbai: 490, pune: 390 },
    estimatedCostPerDay: 1200,
    popularFoodNearby: ['Malvani Fish Thali', 'Sol Kadhi'],
    rating: 4.6,
  },

  {
    id: 'malvan-backwaters',
    name: 'Tarkarli Backwaters',
    marathiName: 'तारकर्ली बॅकवॉटर',
    category: 'Backwaters',
    district: 'Sindhudurg',
    taluka: 'Malvan',
    description:
      'Peaceful waterways surrounded by coconut trees and Konkan greenery.',
    longDescription:
      'The Tarkarli backwater region offers a calmer side of Sindhudurg, with boating, greenery and beautiful village landscapes.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.025, lng: 73.49 },
    images: [
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    ],
    highlights: [
      'Backwaters',
      'Boating',
      'Coconut Trees',
      'Nature',
    ],
    travelTips:
      'Choose authorized local boating services.',
    distanceKm: { mumbai: 495, pune: 395 },
    estimatedCostPerDay: 1500,
    popularFoodNearby: ['Fish Curry', 'Sol Kadhi'],
    rating: 4.6,
  },

  // =========================
  // SAWANTWADI TALUKA
  // =========================

  {
    id: 'sawantwadi-moti-talao',
    name: 'Moti Talao',
    marathiName: 'मोती तलाव',
    category: 'Lakes',
    district: 'Sindhudurg',
    taluka: 'Sawantwadi',
    description:
      'A beautiful lake located in the heart of Sawantwadi.',
    longDescription:
      'Moti Talao is a popular landmark of Sawantwadi and provides a peaceful place to enjoy the town’s cultural atmosphere.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'All Season',
    coordinates: { lat: 15.905, lng: 73.82 },
    images: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    ],
    highlights: [
      'Lake',
      'Sawantwadi Town',
      'Evening Walk',
      'Photography',
    ],
    travelTips:
      'Visit in the evening for a pleasant atmosphere.',
    distanceKm: { mumbai: 475, pune: 395 },
    estimatedCostPerDay: 1100,
    popularFoodNearby: ['Ghavane', 'Kaju Usal'],
    rating: 4.4,
  },

  {
    id: 'sawantwadi-chitar-ali',
    name: 'Chitar Ali Craft Village',
    marathiName: 'चित्तर आळी',
    category: 'Heritage',
    district: 'Sindhudurg',
    taluka: 'Sawantwadi',
    description:
      'A cultural area famous for traditional Sawantwadi handicrafts.',
    longDescription:
      'Sawantwadi has a long tradition of handmade crafts including wooden toys, Ganjifa art and traditional artistic work.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'All Season',
    coordinates: { lat: 15.905, lng: 73.82 },
    images: [
      'https://images.unsplash.com/photo-1564399579883-451a5d44ec08',
    ],
    highlights: [
      'Handicrafts',
      'Traditional Art',
      'Wooden Toys',
      'Ganjifa Culture',
    ],
    travelTips:
      'Support local artisans by purchasing authentic handmade products.',
    distanceKm: { mumbai: 475, pune: 395 },
    estimatedCostPerDay: 1200,
    popularFoodNearby: ['Kaju Usal', 'Ghavane'],
    rating: 4.6,
  },

  {
    id: 'sawantwadi-palace',
    name: 'Sawantwadi Palace',
    marathiName: 'सावंतवाडी राजवाडा',
    category: 'Cultural Heritage',
    district: 'Sindhudurg',
    taluka: 'Sawantwadi',
    description:
      'Historic palace associated with the Sawantwadi royal family.',
    longDescription:
      'Sawantwadi Palace is an important cultural landmark showcasing the heritage, art and history of the region.',
    bestTimeToVisit: 'October to March',
    seasonBadge: 'All Season',
    coordinates: { lat: 15.9047, lng: 73.8212 },
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523',
    ],
    highlights: [
      'Royal Heritage',
      'Architecture',
      'Traditional Art',
      'History',
    ],
    travelTips:
      'Check local visiting hours before planning a detailed palace visit.',
    distanceKm: { mumbai: 475, pune: 395 },
    estimatedCostPerDay: 1200,
    popularFoodNearby: ['Ghavane', 'Kaju Usal'],
    rating: 4.6,
    featured: true,
  },

  // =========================
  // VENGURLA TALUKA
  // =========================

  {
    id: 'vengurla-beach',
    name: 'Vengurla Beach',
    marathiName: 'वेंगुर्ला समुद्रकिनारा',
    category: 'Beaches',
    district: 'Sindhudurg',
    taluka: 'Vengurla',
    description:
      'A scenic and relatively peaceful beach in southern Sindhudurg.',
    longDescription:
      "Vengurla is one of southern Sindhudurg's most scenic coastal towns, combining beaches, historic lighthouse views and traditional fishing culture.",
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 15.855, lng: 73.633 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    highlights: [
      'Clean Beach',
      'Sunset',
      'Fishing Culture',
      'Photography',
    ],
    travelTips:
      'Visit during sunset for the best views.',
    distanceKm: { mumbai: 520, pune: 430 },
    estimatedCostPerDay: 1400,
    popularFoodNearby: ['Fish Thali', 'Sol Kadhi'],
    rating: 4.6,
  },

  {
    id: 'vengurla-lighthouse',
    name: 'Vengurla Lighthouse',
    marathiName: 'वेंगुर्ला दीपगृह',
    category: 'Heritage',
    district: 'Sindhudurg',
    taluka: 'Vengurla',
    description:
      'Historic lighthouse offering beautiful coastal views.',
    longDescription:
      'The Vengurla lighthouse is an important coastal landmark and offers scenic views of the Arabian Sea and surrounding coastline.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 15.82, lng: 73.63 },
    images: [
      'https://images.unsplash.com/photo-1498623116890-37e912163d5d',
    ],
    highlights: [
      'Lighthouse',
      'Sea Views',
      'Photography',
      'Coastal Heritage',
    ],
    travelTips:
      'Check local access rules and timings before visiting.',
    distanceKm: { mumbai: 525, pune: 435 },
    estimatedCostPerDay: 1300,
    popularFoodNearby: ['Fresh Fish', 'Sol Kadhi'],
    rating: 4.5,
  },

  {
    id: 'vengurla-shiroda',
    name: 'Shiroda Beach',
    marathiName: 'शिरोडा समुद्रकिनारा',
    category: 'Beaches',
    district: 'Sindhudurg',
    taluka: 'Vengurla',
    description:
      'A long and peaceful beach close to the Goa border.',
    longDescription:
      'Shiroda Beach is known for its wide coastline, peaceful surroundings and beautiful sunsets.',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 15.75, lng: 73.68 },
    images: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
    ],
    highlights: [
      'Long Beach',
      'Sunset',
      'Peaceful Coast',
      'Photography',
    ],
    travelTips:
      'Avoid swimming during rough sea conditions.',
    distanceKm: { mumbai: 530, pune: 440 },
    estimatedCostPerDay: 1300,
    popularFoodNearby: ['Fish Curry', 'Sol Kadhi'],
    rating: 4.5,
  },

  // =========================
  // DEVGAD TALUKA
  // =========================

  {
    id: 'devgad-beach',
    name: 'Devgad Beach',
    marathiName: 'देवगड समुद्रकिनारा',
    category: 'Beaches',
    district: 'Sindhudurg',
    taluka: 'Devgad',
    description:
      'A beautiful coastal destination famous for sea views and Alphonso mangoes.',
    longDescription:
      "Devgad combines beautiful coastal scenery with one of Maharashtra's most famous Alphonso mango-growing regions.",
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.376, lng: 73.37 },
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    highlights: [
      'Beach',
      'Alphonso Mangoes',
      'Sunset',
      'Coastal Views',
    ],
    travelTips:
      'Summer is especially interesting if you want to explore the mango-growing region.',
    distanceKm: { mumbai: 450, pune: 375 },
    estimatedCostPerDay: 1300,
    popularFoodNearby: ['Fish Thali', 'Sol Kadhi'],
    rating: 4.5,
  },

  {
    id: 'devgad-lighthouse',
    name: 'Devgad Lighthouse',
    marathiName: 'देवगड दीपगृह',
    category: 'Heritage',
    district: 'Sindhudurg',
    taluka: 'Devgad',
    description:
      'A coastal lighthouse with panoramic views of the Arabian Sea.',
    longDescription:
      "Devgad Lighthouse is an important coastal landmark and provides scenic views of the Arabian Sea and the surrounding coastline.",
    bestTimeToVisit: 'October to May',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.38, lng: 73.37 },
    images: [
      'https://images.unsplash.com/photo-1498623116890-37e912163d5d',
    ],
    highlights: [
      'Lighthouse',
      'Sea View',
      'Sunset',
      'Photography',
    ],
    travelTips:
      'Confirm visiting access and timings locally before travelling.',
    distanceKm: { mumbai: 450, pune: 375 },
    estimatedCostPerDay: 1300,
    popularFoodNearby: ['Fish Curry', 'Sol Kadhi'],
    rating: 4.5,
  },

  // =========================
  // VAIBHAVWADI TALUKA
  // =========================

  {
    id: 'vaibhavwadi-bhogawe',
    name: 'Bhogawe Waterfall Region',
    marathiName: 'भोगवे परिसर',
    category: 'Waterfalls',
    district: 'Sindhudurg',
    taluka: 'Vaibhavwadi',
    description:
      'A green monsoon region with streams and seasonal waterfalls.',
    longDescription:
      'Vaibhavwadi and its surrounding Sahyadri landscape become lush and green during monsoon, offering opportunities for nature exploration.',
    bestTimeToVisit: 'June to September',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 16.43, lng: 73.72 },
    images: [
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    ],
    highlights: [
      'Monsoon',
      'Waterfalls',
      'Greenery',
      'Nature',
    ],
    travelTips:
      'Avoid slippery trails during heavy rainfall.',
    distanceKm: { mumbai: 450, pune: 380 },
    estimatedCostPerDay: 1000,
    popularFoodNearby: ['Ghavane', 'Local Thali'],
    rating: 4.3,
  },

  {
    id: 'vaibhavwadi-trails',
    name: 'Vaibhavwadi Sahyadri Trails',
    marathiName: 'वैभववाडी सह्याद्री',
    category: 'Viewpoints',
    district: 'Sindhudurg',
    taluka: 'Vaibhavwadi',
    description:
      'Green Sahyadri landscapes ideal for nature and road-trip experiences.',
    longDescription:
      'Vaibhavwadi provides access to beautiful rural and Sahyadri landscapes, particularly attractive during and after the monsoon.',
    bestTimeToVisit: 'June to February',
    seasonBadge: 'All Season',
    coordinates: { lat: 16.49, lng: 73.72 },
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
    ],
    highlights: [
      'Sahyadri',
      'Valley Views',
      'Greenery',
      'Road Trips',
    ],
    travelTips:
      'Travel with local guidance for lesser-known trails.',
    distanceKm: { mumbai: 455, pune: 385 },
    estimatedCostPerDay: 1000,
    popularFoodNearby: ['Ghavane', 'Tea'],
    rating: 4.4,
  },

  // =========================
  // DODAMARG TALUKA
  // =========================

  {
    id: 'dodamarg-tillari',
    name: 'Tillari Dam & Valley',
    marathiName: 'तिलारी धरण व खोरे',
    category: 'Nature & Dams',
    district: 'Sindhudurg',
    taluka: 'Dodamarg',
    description:
      'A scenic dam and valley region surrounded by Western Ghats greenery.',
    longDescription:
      'The Tillari region around Dodamarg is known for forests, valleys and beautiful monsoon landscapes.',
    bestTimeToVisit: 'June to February',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 15.87, lng: 74.18 },
    images: [
      'https://images.unsplash.com/photo-1500534623283-312aade485b7',
    ],
    highlights: [
      'Dam',
      'Valley',
      'Western Ghats',
      'Monsoon Views',
    ],
    travelTips:
      'Avoid entering restricted dam areas and follow local safety instructions.',
    distanceKm: { mumbai: 540, pune: 450 },
    estimatedCostPerDay: 1100,
    popularFoodNearby: ['Local Thali', 'Tea'],
    rating: 4.5,
  },

  {
    id: 'dodamarg-forest',
    name: 'Dodamarg Forest Trails',
    marathiName: 'दोडामार्ग जंगल परिसर',
    category: 'Wildlife',
    district: 'Sindhudurg',
    taluka: 'Dodamarg',
    description:
      'Forest landscapes near the northern Western Ghats.',
    longDescription:
      "Dodamarg lies in the biodiversity-rich northern Western Ghats and provides a forest-oriented experience very different from Sindhudurg's beaches.",
    bestTimeToVisit: 'June to February',
    seasonBadge: 'Monsoon Magic',
    coordinates: { lat: 15.92, lng: 74.15 },
    images: [
      'https://images.unsplash.com/photo-1448375240586-882707db888b',
    ],
    highlights: [
      'Forest',
      'Biodiversity',
      'Nature Walks',
      'Western Ghats',
    ],
    travelTips:
      'Do not enter isolated forest areas without local guidance.',
    distanceKm: { mumbai: 540, pune: 450 },
    estimatedCostPerDay: 1100,
    popularFoodNearby: ['Local Food', 'Tea'],
    rating: 4.5,
  },
];


// =====================================================
// FOOD
// Photos: public/images/ folder madhe aahet.
// Spaces cha jagi %20 vaparla aahe (file naav jasa aahe tasach).
// =====================================================

export const INITIAL_FOOD_ITEMS: FoodItem[] = [
  {
    id: 'food-sol-kadhi',
    name: 'Sol Kadhi',
    marathiName: 'सोलकढी',
    description:
      'A refreshing Konkan drink made with kokum and coconut milk.',
    district: 'Sindhudurg',
    ingredients: ['Kokum', 'Coconut Milk', 'Garlic', 'Green Chilli'],
    image: '/images/Solkadhi.jpg',
    priceRange: '₹20 - ₹50',
    spiceLevel: 2,
  },

  {
    id: 'food-kombdi-vade',
    name: 'Malvani Kombdi Vade',
    marathiName: 'मालवणी कोंबडी वडे',
    description:
      'Traditional spicy Malvani chicken served with crispy vade.',
    district: 'Sindhudurg',
    ingredients: ['Chicken', 'Malvani Masala', 'Rice', 'Coconut'],
    image: '/images/Komdi_vade.jpg',
    priceRange: '₹180 - ₹350',
    spiceLevel: 4,
  },

  {
    id: 'food-surmai',
    name: 'Kokan Surmai Tawa Fry',
    marathiName: 'कोकणी सुरमई तवा फ्राय',
    description:
      'Fresh king fish marinated with traditional Konkan spices and shallow fried.',
    district: 'Sindhudurg',
    ingredients: ['Surmai', 'Rice Flour', 'Red Chilli', 'Turmeric'],
    image: '/images/surmai%20fry.jpg',
    priceRange: '₹250 - ₹500',
    spiceLevel: 3,
  },

  {
    id: 'food-modak',
    name: 'Steamed Ukadiche Modak',
    marathiName: 'उकडीचे मोदक',
    description:
      'Soft steamed rice-flour dumplings filled with coconut and jaggery.',
    district: 'Sindhudurg',
    ingredients: ['Rice Flour', 'Coconut', 'Jaggery', 'Cardamom'],
    image: '/images/Ukadiche_Modak.jpg',
    priceRange: '₹60 - ₹150',
    spiceLevel: 1,
  },

  {
    id: 'food-ghavane',
    name: 'Ghavane with Kaju Usal',
    marathiName: 'घावणे आणि काजू उसळ',
    description:
      'Soft rice crepes served with a traditional cashew-based Konkan curry.',
    district: 'Sindhudurg',
    ingredients: ['Rice', 'Cashew', 'Coconut', 'Spices'],
    image: '/images/Neer-dosa.jpg',
    priceRange: '₹100 - ₹220',
    spiceLevel: 2,
  },

  {
    id: 'food-crab',
    name: 'Malvani Crab Curry & Fry',
    marathiName: 'मालवणी खेकडा करी',
    description:
      'Fresh coastal crab prepared with aromatic Malvani spices.',
    district: 'Sindhudurg',
    ingredients: ['Crab', 'Coconut', 'Malvani Masala', 'Tamarind'],
    image: '/images/crab%20curry.jpg',
    priceRange: '₹300 - ₹600',
    spiceLevel: 4,
  },
];


// =====================================================
// FESTIVALS
// =====================================================

export const INITIAL_FESTIVALS: Festival[] = [
  {
    id: 'festival-ganesh',
    name: 'Kokan Ganesh Chaturthi',
    marathiName: 'कोकणातील गणेश चतुर्थी',
    month: 'August / September',
    description:
      'The most important festival celebrated with traditional rituals, decorations and family gatherings.',
    district: 'Sindhudurg',
    highlights: [
      'Traditional Ganpati Idols',
      'Modak',
      'Family Gatherings',
      'Cultural Programs',
    ],
    image: '/images/ganpati%20chaturthi.jpg',
  },

  {
    id: 'festival-shimga',
    name: 'Kokan Shimga',
    marathiName: 'कोकणातील शिमगा',
    month: 'March',
    description:
      'Traditional spring festival celebrated with folk performances and village traditions.',
    district: 'Sindhudurg',
    highlights: [
      'Folk Art',
      'Traditional Music',
      'Village Celebrations',
      'Cultural Heritage',
    ],
    image: '/images/Holika_Dahan.jpg',
  },

  {
    id: 'festival-narali',
    name: 'Narali Purnima',
    marathiName: 'नारळी पौर्णिमा',
    month: 'August',
    description:
      'A coastal festival connected with fishermen and the beginning of the fishing season.',
    district: 'Sindhudurg',
    highlights: [
      'Coconut Offering',
      'Fishing Community',
      'Sea Worship',
      'Traditional Rituals',
    ],
    image: '/images/Rakhi.jpg',
  },

  {
    id: 'festival-anganewadi',
    name: 'Anganewadi Bharadi Devi Jatra',
    marathiName: 'आंगणेवाडी भराडी देवी जत्रा',
    month: 'February / March',
    description:
      'A major annual religious gathering at Anganewadi in Sindhudurg.',
    district: 'Sindhudurg',
    highlights: [
      'Bharadi Devi Temple',
      'Large Pilgrimage',
      'Local Culture',
      'Traditional Market',
    ],
    image: '/images/Aangne%20wadi.jpg',
  },
];


// =====================================================
// DEFAULT WEATHER (server.ts import kartoy, mhanun thevla aahe)
// Weather Guide website madhun kadhla aahe, pan ha data aahe tasach.
// =====================================================

const makeWeather = (
  district: string,
  temperature: number,
  condition: string,
  humidity: number,
  windSpeed: number,
  next: [string, string]
): WeatherData =>
  ({
    district,
    temperature,
    condition,
    humidity,
    windSpeed,
    forecast: [
      { day: 'Today', temperature, condition },
      { day: 'Tomorrow', temperature: temperature + 1, condition: next[0] },
      { day: 'Day 3', temperature: temperature - 1, condition: next[1] },
    ],
  } as WeatherData);

export const DEFAULT_WEATHER_DATA: Record<string, WeatherData> = {
  Sindhudurg: makeWeather('Sindhudurg', 29, 'Partly Cloudy', 74, 12, ['Sunny', 'Cloudy']),
  Kankavali: makeWeather('Kankavali', 29, 'Partly Cloudy', 72, 12, ['Sunny', 'Cloudy']),
  Kudal: makeWeather('Kudal', 30, 'Sunny', 70, 10, ['Partly Cloudy', 'Cloudy']),
  Vengurla: makeWeather('Vengurla', 29, 'Cloudy', 74, 11, ['Sunny', 'Rainy']),
  Dodamarg: makeWeather('Dodamarg', 28, 'Partly Cloudy', 76, 13, ['Sunny', 'Cloudy']),
  Vaibhavwadi: makeWeather('Vaibhavwadi', 29, 'Cloudy', 75, 14, ['Sunny', 'Rainy']),
  Malvan: makeWeather('Malvan', 29, 'Cloudy', 75, 14, ['Sunny', 'Rainy']),
  Devgad: makeWeather('Devgad', 29, 'Cloudy', 75, 14, ['Sunny', 'Rainy']),
  Sawantwadi: makeWeather('Sawantwadi', 29, 'Cloudy', 75, 14, ['Sunny', 'Rainy']),
};

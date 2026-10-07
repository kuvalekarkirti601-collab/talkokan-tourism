export type DistrictName =
  | 'kankavali'
  | 'malvan'
  | 'devgad'
  | 'dodamarg'
    'kudal'
    'sawanwadi'  
  | 'Vaibhavvadi'
'vengurla';

export type DestinationCategory =
  | 'Beaches'
  | 'Sea Forts'
  | 'Hill Stations'
  | 'Temples'
  | 'Waterfalls'
  | 'Wildlife'
  | 'Cultural Heritage';

export type SeasonType =
  | 'Monsoon Magic'
  | 'Winter Bliss'
  | 'Summer Water Sports'
  | 'All Season';

export interface Destination {
  id: string;

  name: string;

  marathiName?: string;

  category: DestinationCategory;

  district: DistrictName;

  // ✅ Added for Sindhudurg Taluka-wise destinations
  taluka?: string;

  description: string;

  longDescription: string;

  bestTimeToVisit: string;

  seasonBadge: SeasonType;

  coordinates: {
    lat: number;
    lng: number;
  };

  images: string[];

  highlights: string[];

  travelTips: string;

  distanceKm: {
    mumbai: number;
    pune: number;
  };

  estimatedCostPerDay: number;

  popularFoodNearby: string[];

  rating: number;

  featured?: boolean;
}

export interface FoodItem {
  id: string;

  name: string;

  marathiName: string;

  category:
    | 'Seafood Special'
    | 'Traditional Veg'
    | 'Desserts & Sweets'
    | 'Beverages'
    | 'Snacks';

  region: string;

  description: string;

  priceEstimate: string;

  ingredients: string[];

  image: string;

  isSpicy: boolean;

  mustTryPlaces: string[];
}

export interface Festival {
  id: string;

  name: string;

  marathiName: string;

  month: string;

  description: string;

  significance: string;

  topDistricts: DistrictName[];

  image: string;

  keyAttractions: string[];
}

export interface DailyScheduleItem {
  day: number;

  title: string;

  morning: string;

  afternoon: string;

  evening: string;

  recommendedFood: string;

  staySuggestion: string;

  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ItineraryPlan {
  id: string;

  title: string;

  daysCount: number;

  totalEstimatedBudget: number;

  travelStyle:
    | 'Relaxation & Beaches'
    | 'Adventure & Trekking'
    | 'Culinary & Seafood'
    | 'Forts & Heritage'
    | 'Family & Culture';

  districtsCovered: DistrictName[];

  dailySchedule: DailyScheduleItem[];
}

export interface BudgetBreakdown {
  daysCount: number;

  travelersCount: number;

  luxuryLevel:
    | 'Budget / Backpacker'
    | 'Standard / Family'
    | 'Luxury Resort';

  travelMode:
    | 'Bus & Local Transport'
    | 'Self Car / Rental'
    | 'Private Taxi';

  stayCost: number;

  transportCost: number;

  foodCost: number;

  activityCost: number;

  totalCost: number;

  perPersonCost: number;
}

export interface Enquiry {
  id: string;

  name: string;

  email: string;

  phone: string;

  numTravelers: number;

  travelDates: string;

  preferredDistrict: DistrictName | 'Whole Kokan Belt';

  message: string;

  status: 'New' | 'Contacted' | 'Resolved';

  createdAt: string;
}

export interface WeatherData {
  district: DistrictName;

  tempC: number;

  condition: string;

  humidity: number;

  monsoonAlert: boolean;

  recommendedActivities: string[];

  placesToVisitNow: string[];

  seaCondition: 'Calm' | 'Moderate Waves' | 'Rough / High Tide';
}

export interface AdminUser {
  email: string;

  role: 'admin';

  token: string;
}
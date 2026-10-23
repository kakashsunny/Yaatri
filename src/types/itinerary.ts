export type PlaceType = 
  | 'temple' 
  | 'nature' 
  | 'food' 
  | 'adventure' 
  | 'heritage' 
  | 'shopping' 
  | 'beach' 
  | 'waterfall';

export interface LocationItem {
  name: string;
  name_kannada: string;
  description: string;
  description_kannada: string;
  type: PlaceType;
  duration_hours: number;
  estimated_cost_inr: number;
  tip: string;
  tip_kannada: string;
  lat: number;
  lng: number;
}

export interface ItineraryDay {
  day: number;
  theme: string;
  theme_kannada: string;
  locations: LocationItem[];
  food_recommendation: string;
  food_recommendation_kannada: string;
  estimated_daily_budget_inr: number;
}

export interface ItineraryResponse {
  title: string;
  title_kannada: string;
  summary: string;
  summary_kannada: string;
  days: ItineraryDay[];
  total_estimated_budget_inr: number;
  packing_tips: string[];
  packing_tips_kannada: string[];
  best_time_to_visit: string;
  highlights: string[];
}

export interface PlanTripRequest {
  city: string;
  days: number;
  budget: number;
  interests: string[];
  language?: 'en' | 'kn';
}

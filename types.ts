export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Storing icon name to map in component
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  url: string;
  instructions?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight?: boolean;
  buttonText: string;
}

export interface UserProfile {
  username: string;
  email: string;
  plan: string;
}
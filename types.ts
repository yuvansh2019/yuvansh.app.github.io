
export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  icon: string;
  isPopular?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

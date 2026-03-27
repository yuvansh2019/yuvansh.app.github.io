
import { ServiceItem } from './types';

export const YUVANSH_INFO = {
  name: "Yuvansh",
  email: "yuvansh@yuvansh.info",
  phone: "+91 82693 05347",
  website: "yuvansh.info",
  tagline: "I build the future of the web."
};

export const PRICING_DATA: ServiceItem[] = [
  {
    id: 'extension',
    name: 'Browser Extension',
    price: '$5',
    description: 'Custom browser tools to boost your productivity.',
    icon: 'fa-puzzle-piece'
  },
  {
    id: 'website',
    name: 'Standard Website',
    price: '$10',
    description: 'Beautiful, responsive landing pages and portals.',
    icon: 'fa-globe'
  },
  {
    id: 'app',
    name: 'Mobile App',
    price: '$50',
    description: 'Native or cross-platform applications.',
    icon: 'fa-mobile-screen'
  },
  {
    id: 'browser',
    name: 'Custom Browser',
    price: '$100',
    description: 'A specialized browsing experience built for you.',
    icon: 'fa-window-maximize'
  },
  {
    id: 'super-app',
    name: 'Super App',
    price: '$150',
    description: 'A massive ecosystem in a single application.',
    icon: 'fa-rocket',
    isPopular: true
  },
  {
    id: 'domain',
    name: 'Domain',
    price: '$29,999',
    description: 'Elite domain acquisition and infrastructure setup.',
    icon: 'fa-diamond'
  },
  {
    id: 'pricing-page',
    name: 'The Pricing Page',
    price: '$70M',
    description: 'The ultimate masterpiece of financial layout.',
    icon: 'fa-crown'
  }
];

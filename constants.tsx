
import { CountryInfo } from './types';

export const COUNTRIES: CountryInfo[] = [
  { id: 'USA', name: 'United States', currency: 'USD', currencyName: 'US Dollar', symbol: '$' },
  { id: 'POL', name: 'Poland', currency: 'PLN', currencyName: 'Polish Złoty', symbol: 'zł' },
  { id: 'GBR', name: 'United Kingdom', currency: 'GBP', currencyName: 'British Pound', symbol: '£' },
  { id: 'EU', name: 'Eurozone', currency: 'EUR', currencyName: 'Euro', symbol: '€' },
  { id: 'JPN', name: 'Japan', currency: 'JPY', currencyName: 'Japanese Yen', symbol: '¥' },
  { id: 'AUS', name: 'Australia', currency: 'AUD', currencyName: 'Australian Dollar', symbol: 'A$' },
  { id: 'CAN', name: 'Canada', currency: 'CAD', currencyName: 'Canadian Dollar', symbol: 'C$' },
  { id: 'CHE', name: 'Switzerland', currency: 'CHF', currencyName: 'Swiss Franc', symbol: 'CHF' },
  { id: 'CHN', name: 'China', currency: 'CNY', currencyName: 'Chinese Yuan', symbol: '元' },
  { id: 'BRA', name: 'Brazil', currency: 'BRL', currencyName: 'Brazilian Real', symbol: 'R$' },
  { id: 'IND', name: 'India', currency: 'INR', currencyName: 'Indian Rupee', symbol: '₹' },
  { id: 'MEX', name: 'Mexico', currency: 'MXN', currencyName: 'Mexican Peso', symbol: '$' },
  { id: 'THA', name: 'Thailand', currency: 'THB', currencyName: 'Thai Baht', symbol: '฿' },
];

export const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: '🍔' },
  { id: 'activities', label: 'Activities & Tours', icon: '🎨' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'hotel', label: 'Accommodation', icon: '🏨' },
  { id: 'transportation', label: 'Transportation', icon: '✈️' },
];

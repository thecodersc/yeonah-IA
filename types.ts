
export enum Step {
  Welcome = 1,
  BudgetInput = 2,
  DestinationSelection = 3,
  Results = 4
}

export interface BudgetData {
  food: number;
  activities: number;
  shopping: number;
  hotel: number;
  transportation: number;
  baseCurrency: string;
}

export interface CountryInfo {
  id: string;
  name: string;
  currency: string;
  currencyName: string;
  symbol: string;
}

export interface ExchangeRates {
  [key: string]: number;
}

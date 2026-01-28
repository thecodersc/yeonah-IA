
import { ExchangeRates } from '../types';

/**
 * Note: In a real-world scenario, you would use an API key from an environment variable.
 * Since this is a demo, we provide a robust mock mechanism that simulates a fetch call
 * to Currency Freaks or similar APIs.
 */
export const fetchExchangeRates = async (baseCurrency: string): Promise<ExchangeRates> => {
  try {
    // Simulated API latency
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock data based on realistic rates (Reference: 1 USD)
    const mockRates: ExchangeRates = {
      USD: 1,
      PLN: 3.98,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 151.4,
      AUD: 1.52,
      CAD: 1.35,
      CHF: 0.90,
      CNY: 7.23,
      BRL: 5.05,
      INR: 83.3,
      MXN: 16.5,
      THB: 36.4
    };

    // Recalculate rates based on requested baseCurrency
    const baseRate = mockRates[baseCurrency] || 1;
    const finalRates: ExchangeRates = {};
    
    Object.keys(mockRates).forEach(key => {
      finalRates[key] = mockRates[key] / baseRate;
    });

    return finalRates;
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    throw new Error("Unable to retrieve currency data. Please try again.");
  }
};

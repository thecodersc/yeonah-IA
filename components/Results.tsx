
import React from 'react';
import { BudgetData, CountryInfo, ExchangeRates } from '../types';
import { CATEGORIES, COUNTRIES } from '../constants';

interface ResultsProps {
  budget: BudgetData;
  country: CountryInfo;
  rates: ExchangeRates;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ budget, country, rates, onReset }) => {
  const rate = rates[country.currency] || 1;
  const baseCurrencySymbol = COUNTRIES.find(c => c.currency === budget.baseCurrency)?.symbol || '$';

  const calculateTotal = (isConverted: boolean) => {
    const total = CATEGORIES.reduce((acc, cat) => acc + (budget[cat.id as keyof BudgetData] as number), 0);
    return isConverted ? total * rate : total;
  };

  const totalBase = calculateTotal(false);
  const totalConverted = calculateTotal(true);

  return (
    <div className="p-8 md:p-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-8 border-b border-slate-100">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800">Your Travel Plan</h2>
          <p className="text-slate-500 flex items-center gap-2 mt-1">
            Trip to <span className="font-bold text-blue-600 underline decoration-blue-200 decoration-2 underline-offset-4">{country.name}</span>
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95 print:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
          </svg>
          Print PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-4 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <div className="col-span-2">Expense Category</div>
            <div className="text-right">{budget.baseCurrency}</div>
            <div className="text-right">{country.currency}</div>
          </div>
          {CATEGORIES.map(cat => {
            const amount = budget[cat.id as keyof BudgetData] as number;
            return (
              <div key={cat.id} className="grid grid-cols-4 items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="col-span-2 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-lg group-hover:bg-blue-50 transition-colors">
                    {cat.icon}
                  </span>
                  <span className="font-bold text-slate-700">{cat.label}</span>
                </div>
                <div className="text-right font-semibold text-slate-500">
                  {baseCurrencySymbol}{amount.toLocaleString()}
                </div>
                <div className="text-right font-bold text-blue-600">
                  {country.symbol}{(amount * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          
          <div>
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Grand Total</span>
            <div className="mt-2 mb-8">
              <h3 className="text-4xl font-extrabold mb-1">
                {country.symbol}{totalConverted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
              <p className="text-blue-300/60 font-medium text-sm">
                Equivalent to {baseCurrencySymbol}{totalBase.toLocaleString()} {budget.baseCurrency}
              </p>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Exchange Rate</span>
                <span className="font-bold">1 {budget.baseCurrency} = {rate.toFixed(2)} {country.currency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Destination</span>
                <span className="font-bold">{country.name}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="mt-10 w-full py-4 bg-white text-slate-900 rounded-2xl font-extrabold text-lg hover:bg-slate-100 transition-all active:scale-95 shadow-xl print:hidden"
          >
            Start Over
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-blue-50 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-sm text-blue-800 leading-relaxed font-medium">
          <strong>Tip:</strong> These calculations are based on mid-market exchange rates. Always budget an extra 10-15% for transaction fees and local price fluctuations during your travel.
        </p>
      </div>
    </div>
  );
};

export default Results;

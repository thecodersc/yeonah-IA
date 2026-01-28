import React from 'react';
import { BudgetData } from '../types';
import { CATEGORIES, COUNTRIES } from '../constants';

interface BudgetFormProps {
  data: BudgetData;
  onChange: (data: BudgetData) => void;
  onNext: () => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ data, onChange, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: name === 'baseCurrency' ? value : parseFloat(value) || 0
    });
  };

  // Fixed: explicitly check for number type to avoid comparison errors with unknown types
  const isFormValid = Object.values(data).every(val => 
    typeof val === 'string' ? val !== '' : (typeof val === 'number' && val >= 0)
  );

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Estimate Your Expenses</h2>
        <p className="text-slate-500">Break down your expected costs in your home currency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="col-span-full mb-4">
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Home Currency
          </label>
          <select
            name="baseCurrency"
            value={data.baseCurrency}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none cursor-pointer"
          >
            {COUNTRIES.map(c => (
              <option key={c.id} value={c.currency}>
                {c.currency} - {c.name}
              </option>
            ))}
          </select>
        </div>

        {CATEGORIES.map(cat => (
          <div key={cat.id}>
            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              <span>{cat.icon}</span> {cat.label}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                {COUNTRIES.find(c => c.currency === data.baseCurrency)?.symbol || '$'}
              </span>
              <input
                type="number"
                name={cat.id}
                placeholder="0.00"
                value={data[cat.id as keyof BudgetData] || ''}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t border-slate-100">
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
            isFormValid 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          Next Step
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BudgetForm;
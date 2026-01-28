
import React, { useState } from 'react';
import { COUNTRIES } from '../constants';
import { CountryInfo } from '../types';

interface DestinationMapProps {
  onSelect: (country: CountryInfo) => void;
  selectedCountry: CountryInfo | null;
  onBack: () => void;
  onNext: () => void;
}

const DestinationMap: React.FC<DestinationMapProps> = ({ onSelect, selectedCountry, onBack, onNext }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  // Simplified visual representation of the world
  // In a full implementation, we'd use a GeoJSON file with react-simple-maps or d3.
  // Here we use a clean grid list which is more accessible and reliable without external large assets.
  
  return (
    <div className="p-8 md:p-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Where are you heading?</h2>
        <p className="text-slate-500">Select your destination country to calculate the converted budget.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {COUNTRIES.map(country => (
          <button
            key={country.id}
            onClick={() => onSelect(country)}
            onMouseEnter={() => setHovered(country.name)}
            onMouseLeave={() => setHovered(null)}
            className={`relative group flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${
              selectedCountry?.id === country.id
                ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-50'
                : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-md'
            }`}
          >
            <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center text-2xl bg-white shadow-inner transition-transform group-hover:scale-110 ${
              selectedCountry?.id === country.id ? 'ring-2 ring-blue-400' : ''
            }`}>
              {/* Flag placeholder using stylized emoji or icon */}
              <span role="img" aria-label={country.name}>🌍</span>
            </div>
            <span className={`text-sm font-bold transition-colors ${
              selectedCountry?.id === country.id ? 'text-blue-700' : 'text-slate-600'
            }`}>
              {country.name}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              {country.currency}
            </span>

            {selectedCountry?.id === country.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {hovered && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-xl pointer-events-none animate-bounce">
          Exploring: {hovered}
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-slate-500 hover:text-slate-800 transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedCountry}
          className={`flex items-center gap-2 px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-95 ${
            selectedCountry 
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          Calculate
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DestinationMap;

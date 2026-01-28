
import React from 'react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="p-8 md:p-12 md:w-1/2">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
          New Generation Planner
        </span>
        <h2 className="text-4xl font-extrabold text-slate-800 leading-tight mb-6">
          Plan Your Next <span className="text-blue-600">Adventure</span> Without Financial Stress.
        </h2>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Create detailed travel budgets, visualize your destination on our interactive map, and get real-time currency conversions instantly.
        </p>
        <button 
          onClick={onStart}
          className="group relative w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-200 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
        </button>
      </div>
      <div className="hidden md:block md:w-1/2 bg-blue-50 relative overflow-hidden h-[500px]">
        <img 
          src="https://picsum.photos/seed/travel/800/800" 
          alt="Travel exploration" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-blue-600/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default Welcome;

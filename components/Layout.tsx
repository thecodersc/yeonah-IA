
import React from 'react';
import { Step } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: Step;
}

const Layout: React.FC<LayoutProps> = ({ children, currentStep }) => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">GloboBudget</h1>
            <p className="text-sm text-slate-500 font-medium">Global Travel Expense Planner</p>
          </div>
        </div>

        {currentStep > Step.Welcome && (
          <nav className="flex items-center gap-2">
            {[2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  currentStep === s 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                    : currentStep > s 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  {currentStep > s ? '✓' : s - 1}
                </div>
                {s < 4 && <div className={`w-8 h-px ${currentStep > s ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </nav>
        )}
      </header>

      <main className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        {children}
      </main>

      <footer className="mt-8 text-slate-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} GloboBudget - Built for Travelers
      </footer>
    </div>
  );
};

export default Layout;

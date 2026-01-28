
import React, { useState, useCallback } from 'react';
import { Step, BudgetData, CountryInfo, ExchangeRates } from './types';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import BudgetForm from './components/BudgetForm';
import DestinationMap from './components/DestinationMap';
import Results from './components/Results';
import { fetchExchangeRates } from './services/api';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Welcome);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [budgetData, setBudgetData] = useState<BudgetData>({
    food: 0,
    activities: 0,
    shopping: 0,
    hotel: 0,
    transportation: 0,
    baseCurrency: 'USD'
  });
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(null);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});

  const handleNext = async () => {
    if (currentStep === Step.Welcome) {
      setCurrentStep(Step.BudgetInput);
    } else if (currentStep === Step.BudgetInput) {
      setCurrentStep(Step.DestinationSelection);
    } else if (currentStep === Step.DestinationSelection) {
      setLoading(true);
      setError(null);
      try {
        const rates = await fetchExchangeRates(budgetData.baseCurrency);
        setExchangeRates(rates);
        setCurrentStep(Step.Results);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === Step.BudgetInput) setCurrentStep(Step.Welcome);
    if (currentStep === Step.DestinationSelection) setCurrentStep(Step.BudgetInput);
    if (currentStep === Step.Results) setCurrentStep(Step.DestinationSelection);
  };

  const handleReset = () => {
    setCurrentStep(Step.Welcome);
    setBudgetData({
      food: 0,
      activities: 0,
      shopping: 0,
      hotel: 0,
      transportation: 0,
      baseCurrency: 'USD'
    });
    setSelectedCountry(null);
  };

  return (
    <Layout currentStep={currentStep}>
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-600 font-bold animate-pulse">Fetching latest exchange rates...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 flex justify-between items-center border-b border-red-100">
          <p className="text-sm font-medium">{error}</p>
          <button onClick={() => setError(null)} className="text-red-900 font-bold">×</button>
        </div>
      )}

      <div className="step-transition">
        {currentStep === Step.Welcome && <Welcome onStart={handleNext} />}
        
        {currentStep === Step.BudgetInput && (
          <BudgetForm 
            data={budgetData} 
            onChange={setBudgetData} 
            onNext={handleNext} 
          />
        )}

        {currentStep === Step.DestinationSelection && (
          <DestinationMap 
            onSelect={setSelectedCountry} 
            selectedCountry={selectedCountry}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {currentStep === Step.Results && selectedCountry && (
          <Results 
            budget={budgetData} 
            country={selectedCountry} 
            rates={exchangeRates}
            onReset={handleReset}
          />
        )}
      </div>
    </Layout>
  );
};

export default App;

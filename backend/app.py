#!/usr/bin/env python3
"""
GloboBudget Backend - Travel Finance Planner
Handles budget calculations and API integrations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from typing import Dict, Optional
from dataclasses import dataclass

app = Flask(__name__)
CORS(app)

# Configuration
CURRENCY_FREAKS_API_KEY = os.getenv('CURRENCY_FREAKS_API_KEY', 'YOUR_API_KEY_HERE')
CURRENCY_FREAKS_BASE_URL = 'https://api.currencyfreaks.com/v2.0/rates/latest'

@dataclass
class BudgetCategory:
    """Represents a budget category"""
    food: float
    activities: float
    shopping: float
    hotel: float
    transportation: float

class BudgetCalculator:
    """Handles budget calculations and currency conversions"""
    
    @staticmethod
    def fetch_exchange_rates(base_currency: str = 'USD') -> Dict[str, float]:
        """
        Fetch real-time exchange rates from Currency Freaks API
        
        Args:
            base_currency: The base currency code (e.g., 'USD', 'EUR')
            
        Returns:
            Dictionary of currency codes to exchange rates
        """
        try:
            params = {
                'apikey': CURRENCY_FREAKS_API_KEY,
                'base': base_currency
            }
            
            response = requests.get(CURRENCY_FREAKS_BASE_URL, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if 'rates' in data:
                # Convert string rates to floats
                rates = {k: float(v) for k, v in data['rates'].items()}
                return rates
            else:
                raise ValueError("Invalid API response format")
                
        except requests.exceptions.RequestException as e:
            print(f"Error fetching exchange rates: {e}")
            # Return mock data as fallback
            return BudgetCalculator._get_mock_rates(base_currency)
    
    @staticmethod
    def _get_mock_rates(base_currency: str) -> Dict[str, float]:
        """Fallback mock rates for development/testing"""
        mock_rates = {
            'USD': 1.0,
            'PLN': 3.98,
            'EUR': 0.92,
            'GBP': 0.79,
            'JPY': 151.4,
            'AUD': 1.52,
            'CAD': 1.35,
            'CHF': 0.90,
            'CNY': 7.23,
            'BRL': 5.05,
            'INR': 83.3,
            'MXN': 16.5,
            'THB': 36.4
        }
        
        # Recalculate based on base currency
        base_rate = mock_rates.get(base_currency, 1.0)
        return {k: v / base_rate for k, v in mock_rates.items()}
    
    @staticmethod
    def convert_budget(budget: Dict[str, float], exchange_rate: float) -> Dict[str, float]:
        """
        Convert budget categories to target currency
        
        Args:
            budget: Dictionary of budget categories and amounts
            exchange_rate: Exchange rate to target currency
            
        Returns:
            Converted budget dictionary
        """
        converted = {}
        for category, amount in budget.items():
            if category != 'baseCurrency':
                converted[category] = round(amount * exchange_rate, 2)
        
        return converted
    
    @staticmethod
    def calculate_total(budget: Dict[str, float]) -> float:
        """Calculate total budget amount"""
        categories = ['food', 'activities', 'shopping', 'hotel', 'transportation']
        return sum(budget.get(cat, 0) for cat in categories)


# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'GloboBudget API'})


@app.route('/api/exchange-rates', methods=['GET'])
def get_exchange_rates():
    """
    Get current exchange rates
    
    Query params:
        base: Base currency code (default: USD)
    """
    base_currency = request.args.get('base', 'USD').upper()
    
    try:
        rates = BudgetCalculator.fetch_exchange_rates(base_currency)
        return jsonify({
            'success': True,
            'base': base_currency,
            'rates': rates
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/convert-budget', methods=['POST'])
def convert_budget():
    """
    Convert budget to target currency
    
    Request body:
        {
            "budget": {
                "food": 500,
                "activities": 300,
                "shopping": 200,
                "hotel": 1000,
                "transportation": 400,
                "baseCurrency": "USD"
            },
            "targetCurrency": "PLN"
        }
    """
    try:
        data = request.get_json()
        
        if not data or 'budget' not in data or 'targetCurrency' not in data:
            return jsonify({
                'success': False,
                'error': 'Missing required fields: budget and targetCurrency'
            }), 400
        
        budget = data['budget']
        base_currency = budget.get('baseCurrency', 'USD')
        target_currency = data['targetCurrency']
        
        # Fetch exchange rates
        rates = BudgetCalculator.fetch_exchange_rates(base_currency)
        
        if target_currency not in rates:
            return jsonify({
                'success': False,
                'error': f'Currency {target_currency} not supported'
            }), 400
        
        exchange_rate = rates[target_currency]
        
        # Convert budget
        converted_budget = BudgetCalculator.convert_budget(budget, exchange_rate)
        
        # Calculate totals
        total_base = BudgetCalculator.calculate_total(budget)
        total_converted = BudgetCalculator.calculate_total(converted_budget)
        
        return jsonify({
            'success': True,
            'baseCurrency': base_currency,
            'targetCurrency': target_currency,
            'exchangeRate': exchange_rate,
            'originalBudget': {
                **budget,
                'total': total_base
            },
            'convertedBudget': {
                **converted_budget,
                'total': total_converted
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/countries', methods=['GET'])
def get_countries():
    """Get list of supported countries with currency info"""
    countries = [
        {'id': 'USA', 'name': 'United States', 'currency': 'USD', 'symbol': '$'},
        {'id': 'POL', 'name': 'Poland', 'currency': 'PLN', 'symbol': 'zł'},
        {'id': 'GBR', 'name': 'United Kingdom', 'currency': 'GBP', 'symbol': '£'},
        {'id': 'EU', 'name': 'Eurozone', 'currency': 'EUR', 'symbol': '€'},
        {'id': 'JPN', 'name': 'Japan', 'currency': 'JPY', 'symbol': '¥'},
        {'id': 'AUS', 'name': 'Australia', 'currency': 'AUD', 'symbol': 'A$'},
        {'id': 'CAN', 'name': 'Canada', 'currency': 'CAD', 'symbol': 'C$'},
        {'id': 'CHE', 'name': 'Switzerland', 'currency': 'CHF', 'symbol': 'CHF'},
        {'id': 'CHN', 'name': 'China', 'currency': 'CNY', 'symbol': '元'},
        {'id': 'BRA', 'name': 'Brazil', 'currency': 'BRL', 'symbol': 'R$'},
        {'id': 'IND', 'name': 'India', 'currency': 'INR', 'symbol': '₹'},
        {'id': 'MEX', 'name': 'Mexico', 'currency': 'MXN', 'symbol': '$'},
        {'id': 'THA', 'name': 'Thailand', 'currency': 'THB', 'symbol': '฿'},
    ]
    
    return jsonify({
        'success': True,
        'countries': countries
    })


if __name__ == '__main__':
    print("=" * 60)
    print("GloboBudget Backend Server Starting...")
    print("=" * 60)
    print(f"Currency Freaks API: {'Configured' if CURRENCY_FREAKS_API_KEY != 'YOUR_API_KEY_HERE' else 'Using Mock Data'}")
    print("Server running on http://localhost:5000")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
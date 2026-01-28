# 🌍 GloboBudget - Travel Finance Planner

A sophisticated travel budget calculator that helps travelers plan their expenses with real-time currency conversion and interactive map visualization.

## ✨ Features

- 📊 **Detailed Budget Planning**: Break down expenses into categories (Food, Activities, Shopping, Hotel, Transportation)
- 💱 **Real-Time Currency Conversion**: Powered by Currency Freaks API for accurate exchange rates
- 🗺️ **Interactive Map**: Visualize destinations using Leaflet maps with OpenStreetMap data
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🔄 **Step-by-Step Flow**: Intuitive wizard-style interface
- 📱 **Mobile Responsive**: Works perfectly on all devices

## 🏗️ Project Structure

```
globobudget/
├── backend/
│   ├── app.py              # Flask backend server
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
├── frontend/
│   └── index.html          # Complete React frontend (single-file)
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Modern web browser
- Currency Freaks API key (free tier available at https://currencyfreaks.com/)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Currency Freaks API key:
   ```
   CURRENCY_FREAKS_API_KEY=your_actual_api_key_here
   ```

4. **Start the Flask server**:
   ```bash
   python app.py
   ```
   
   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Open in browser**:
   Simply open `index.html` in your web browser, or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or use any other local server
   npx serve .
   ```

3. **Access the application**:
   Open `http://localhost:8000` in your browser

## 🔧 Configuration

### Currency Freaks API

1. Sign up for a free account at https://currencyfreaks.com/
2. Get your API key from the dashboard
3. Add it to `backend/.env`:
   ```
   CURRENCY_FREAKS_API_KEY=your_key_here
   ```

### Supported Currencies

The application supports 13+ major currencies:
- 🇺🇸 USD - US Dollar
- 🇵🇱 PLN - Polish Złoty
- 🇬🇧 GBP - British Pound
- 🇪🇺 EUR - Euro
- 🇯🇵 JPY - Japanese Yen
- 🇦🇺 AUD - Australian Dollar
- 🇨🇦 CAD - Canadian Dollar
- 🇨🇭 CHF - Swiss Franc
- 🇨🇳 CNY - Chinese Yuan
- 🇧🇷 BRL - Brazilian Real
- 🇮🇳 INR - Indian Rupee
- 🇲🇽 MXN - Mexican Peso
- 🇹🇭 THB - Thai Baht

## 📡 API Endpoints

### Backend API

#### GET `/api/health`
Health check endpoint
```json
{
  "status": "healthy",
  "service": "GloboBudget API"
}
```

#### GET `/api/exchange-rates`
Get current exchange rates
```
Query Parameters:
  - base: Base currency code (default: USD)

Response:
{
  "success": true,
  "base": "USD",
  "rates": {
    "PLN": 3.98,
    "EUR": 0.92,
    ...
  }
}
```

#### POST `/api/convert-budget`
Convert budget to target currency
```json
Request:
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

Response:
{
  "success": true,
  "baseCurrency": "USD",
  "targetCurrency": "PLN",
  "exchangeRate": 3.98,
  "originalBudget": {
    "food": 500,
    "activities": 300,
    "shopping": 200,
    "hotel": 1000,
    "transportation": 400,
    "total": 2400
  },
  "convertedBudget": {
    "food": 1990.0,
    "activities": 1194.0,
    "shopping": 796.0,
    "hotel": 3980.0,
    "transportation": 1592.0,
    "total": 9552.0
  }
}
```

#### GET `/api/countries`
Get list of supported countries
```json
{
  "success": true,
  "countries": [...]
}
```

## 🎯 Usage Flow

1. **Welcome Screen**: Introduction and overview
2. **Budget Input**: Enter expenses in your home currency
3. **Destination Selection**: Choose your destination from the interactive map
4. **Results**: View converted budget with real-time exchange rates

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**: Core language
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Requests**: HTTP library for API calls
- **Currency Freaks API**: Real-time exchange rates

### Frontend
- **React 19**: UI framework
- **Leaflet.js**: Interactive maps
- **Tailwind CSS**: Styling framework
- **OpenStreetMap**: Map tiles

## 🔐 Security Notes

- Never commit your `.env` file with real API keys
- Use environment variables for sensitive data
- The application includes CORS protection
- API keys should be kept server-side only

## 🐛 Troubleshooting

### Backend Issues

**Problem**: `ImportError: No module named 'flask'`
```bash
Solution: pip install -r requirements.txt
```

**Problem**: API returns mock data
```bash
Solution: Check that CURRENCY_FREAKS_API_KEY is set in .env
```

### Frontend Issues

**Problem**: Map doesn't load
```bash
Solution: Ensure you're running from a web server, not file://
```

## 📝 Development

### Adding New Currencies

1. Update `COUNTRIES` array in both:
   - `backend/app.py`
   - `frontend/index.html`

2. Add currency symbol and coordinates:
```javascript
{
  id: 'XXX',
  name: 'Country Name',
  currency: 'CUR',
  symbol: '$',
  lat: 0.0,
  lng: 0.0
}
```

### Running Tests

```bash
# Backend tests
cd backend
python -m pytest

# Manual API testing
curl http://localhost:5000/api/health
```

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Currency Freaks** for providing the exchange rate API
- **OpenStreetMap** contributors for map data
- **Leaflet.js** for the mapping library
- **Tailwind CSS** for the styling framework

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review API documentation

## 🚀 Future Enhancements

- [ ] Historical exchange rate charts
- [ ] Budget recommendations based on destination
- [ ] Multi-destination trip planning
- [ ] PDF export of budget breakdown
- [ ] User accounts and saved budgets
- [ ] Integration with geoportal.gov.pl for Polish-specific maps
- [ ] Mobile app versions
- [ ] Offline mode with cached rates

---

Built with ❤️ for travelers worldwide

# 📖 GloboBudget Usage Guide

## Overview

GloboBudget is a travel budget calculator that combines:
1. **Python Backend** with Flask for API management
2. **Currency Freaks API** for real-time exchange rates
3. **Interactive Map** using Leaflet.js and OpenStreetMap
4. **React Frontend** for smooth user experience

## Step-by-Step Usage

### Step 1: Welcome Screen

When you first open the application, you'll see:
- Beautiful gradient background
- Project introduction
- "Get Started" button

**Action**: Click "Get Started" to begin planning your budget

### Step 2: Budget Input

Enter your expected expenses in your home currency:

**Example Budget (USD)**:
- 🍔 Food & Dining: $500
- 🎨 Activities & Tours: $300
- 🛍️ Shopping: $200
- 🏨 Accommodation: $1,000
- ✈️ Transportation: $400

**Home Currency Selection**:
- Choose from 13+ supported currencies
- Dropdown shows: Symbol, Code, Country name

**Total Display**:
- Live calculation shows total as you type
- Example: $2,400 total budget

**Action**: Fill in all categories, then click "Next Step"

### Step 3: Destination Selection

Choose your destination using:

**Interactive Map**:
- World map with clickable markers
- Click any country marker to select
- Selected countries show blue checkmark icon

**Grid View**:
- Alternative selection via grid buttons
- Shows country flag emoji, name, currency
- Selected countries highlighted in blue

**Example Selections**:
- Poland (PLN) for European trip
- Japan (JPY) for Asian adventure
- Brazil (BRL) for South American journey

**Action**: Select destination, then click "Calculate Budget"

### Step 4: Results

View your converted budget:

**Conversion Table**:
```
Category          USD      PLN (example)
Food & Dining     $500     zł1,990
Activities        $300     zł1,194
Shopping          $200     zł796
Accommodation     $1,000   zł3,980
Transportation    $400     zł1,592
```

**Grand Total Card**:
- Shows total in destination currency
- Displays exchange rate used
- Shows equivalent in home currency
- Data source attribution

**Pro Tip Box**:
- Reminds about transaction fees
- Suggests 10-15% buffer for safety

**Actions**:
- Print/Export budget (browser print)
- Start Over to create new budget

## API Integration Examples

### Backend API Calls

**Health Check**:
```bash
curl http://localhost:5000/api/health

Response:
{
  "status": "healthy",
  "service": "GloboBudget API"
}
```

**Get Exchange Rates**:
```bash
curl "http://localhost:5000/api/exchange-rates?base=USD"

Response:
{
  "success": true,
  "base": "USD",
  "rates": {
    "USD": 1.0,
    "PLN": 3.98,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 151.4,
    ...
  }
}
```

**Convert Budget**:
```bash
curl -X POST http://localhost:5000/api/convert-budget \
  -H "Content-Type: application/json" \
  -d '{
    "budget": {
      "food": 500,
      "activities": 300,
      "shopping": 200,
      "hotel": 1000,
      "transportation": 400,
      "baseCurrency": "USD"
    },
    "targetCurrency": "PLN"
  }'

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

## Real-World Examples

### Example 1: European Vacation

**Scenario**: US traveler visiting Poland

```
Input:
- Home Currency: USD
- Food: $600
- Activities: $400
- Shopping: $300
- Hotel: $1,200
- Transportation: $500
- Total: $3,000

Destination: Poland (PLN)
Exchange Rate: 1 USD = 3.98 PLN

Output:
- Food: zł2,388
- Activities: zł1,592
- Shopping: zł1,194
- Hotel: zł4,776
- Transportation: zł1,990
- Total: zł11,940
```

### Example 2: Asian Adventure

**Scenario**: European traveler visiting Japan

```
Input:
- Home Currency: EUR
- Food: €500
- Activities: €600
- Shopping: €400
- Hotel: €1,500
- Transportation: €800
- Total: €3,800

Destination: Japan (JPY)
Exchange Rate: 1 EUR = 164.57 JPY

Output:
- Food: ¥82,285
- Activities: ¥98,742
- Shopping: ¥65,828
- Hotel: ¥246,855
- Transportation: ¥131,656
- Total: ¥625,366
```

### Example 3: South American Trip

**Scenario**: Canadian traveler visiting Brazil

```
Input:
- Home Currency: CAD
- Food: C$400
- Activities: C$300
- Shopping: C$200
- Hotel: C$900
- Transportation: C$350
- Total: C$2,150

Destination: Brazil (BRL)
Exchange Rate: 1 CAD = 3.74 BRL

Output:
- Food: R$1,496
- Activities: R$1,122
- Shopping: R$748
- Hotel: R$3,366
- Transportation: R$1,309
- Total: R$8,041
```

## Tips for Best Results

### Budget Planning

1. **Be Realistic**: Research average costs for your destination
2. **Add Buffer**: Budget 10-15% extra for unexpected expenses
3. **Consider Seasons**: Prices vary by tourist season
4. **Check Exchange Rates**: Rates fluctuate daily

### Using the Application

1. **Update Regularly**: Check rates before finalizing plans
2. **Compare Destinations**: Try multiple countries to compare costs
3. **Save Results**: Use browser print to save as PDF
4. **Mobile Friendly**: Works on phones and tablets

### Currency Conversion

1. **Mid-Market Rates**: App shows interbank rates
2. **Real Costs Higher**: Add 3-5% for ATM/card fees
3. **Cash vs Cards**: Consider best payment methods
4. **Dynamic Pricing**: Some merchants charge in home currency (avoid this)

## Troubleshooting Common Issues

### Issue: Exchange rates not loading

**Symptoms**: Loading spinner doesn't disappear
**Solution**: 
1. Check backend is running (`python app.py`)
2. Verify API key in `.env` file
3. Check internet connection
4. App will use fallback mock data if API fails

### Issue: Map not displaying

**Symptoms**: White box instead of map
**Solution**:
1. Ensure running from web server (not file://)
2. Check browser console for errors
3. Try different browser
4. Check Leaflet.js CDN is accessible

### Issue: Currency not converting correctly

**Symptoms**: Wrong conversion amounts
**Solution**:
1. Verify you selected correct home currency
2. Check if destination selected properly
3. Ensure all budget fields filled
4. Try refreshing exchange rates

### Issue: CORS errors in console

**Symptoms**: API calls failing with CORS error
**Solution**:
1. Ensure backend running on localhost:5000
2. Check Flask-CORS is installed
3. Update frontend API_BASE_URL if needed
4. Try clearing browser cache

## Advanced Features

### Custom API Integration

The backend is designed to be extended. You can add:
- Historical exchange rate tracking
- Multiple API source fallbacks
- Rate alerts and notifications
- Budget recommendation engine

### Map Customization

The Leaflet map can be enhanced with:
- Custom country markers
- Region grouping
- Heat maps for popular destinations
- Travel route visualization

### Data Export

Current print functionality can be extended to:
- JSON export for records
- CSV for spreadsheet analysis
- API integration with travel booking sites
- Calendar integration for trip planning

## Support Resources

- **Documentation**: README.md in project root
- **API Reference**: See API Endpoints section
- **Code Examples**: Check usage guide examples
- **Issue Tracking**: GitHub issues (if applicable)

---

For additional help or feature requests, please refer to the main README.md file.
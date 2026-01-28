#!/bin/bash

echo "=================================="
echo "🌍 GloboBudget Setup Script"
echo "=================================="
echo ""

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Python 3 detected: "+ $(python3 --version)"
echo ""

# Setup backend
echo "📦 Setting up backend..."
cd backend

if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your Currency Freaks API key"
fi

echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Get your API key from https://currencyfreaks.com/"
echo "2. Edit backend/.env and add your API key"
echo "3. Start the backend: cd backend && python app.py"
echo "4. Open frontend/index.html in your browser"
echo ""
echo "=================================="
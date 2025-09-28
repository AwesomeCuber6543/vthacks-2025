#!/bin/bash

echo "🚀 Starting Advisr.ai Setup..."

# Check if Python virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Run database initialization
echo "🗄️  Setting up database..."
mysql -h localhost -P 8889 -u root -proot < database_schema.sql

# Run model initialization
echo "🤖 Initializing AI models..."
python app/initial.py

# Index documents in docs folder
echo "📚 Indexing documents..."
python index_docs.py

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install

# Setup frontend environment
echo "🔧 Setting up frontend environment..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: python app/main.py"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "🎉 Advisr.ai is ready to go!"

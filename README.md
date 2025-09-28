# Advisr.ai - VT Hacks 2025

An AI-powered financial advisory platform that helps students make informed decisions about loans, scholarships, and financial planning.

## Features

- **Document Analysis**: Upload and analyze financial documents using ColPali and Gemini AI
- **Personal Information Management**: Store and manage user financial data
- **AI-Powered Insights**: Get personalized financial recommendations
- **Document Search**: Search through uploaded documents with natural language queries
- **Chat History**: Keep track of all your financial discussions and analyses

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **ChromaDB** - Vector database for document search
- **ColPali** - Multimodal document understanding
- **Gemini AI** - Google's AI for document analysis
- **MySQL** - Relational database for user data
- **Perplexity API** - Real-time web search

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **Lucide React** - Beautiful icons

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- MySQL 8.0+

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vthacks-2025
   ```

2. **Run the setup script**
   ```bash
   ./startup.sh
   ```

3. **Configure environment variables**
   ```bash
   # Backend environment
   cp .env.example .env
   # Edit .env with your API keys and database credentials
   
   # Frontend environment
   cd frontend
   cp .env.example .env.local
   # Edit .env.local with your API URL (default: http://localhost:8000)
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   python app/main.py
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## API Endpoints

### User Management
- `POST /db/users` - Create user
- `GET /db/users` - Get all users
- `GET /db/users/{id}` - Get user by ID
- `PUT /db/users/{id}` - Update user

### Document Processing
- `POST /documents/upload` - Upload document
- `POST /documents/search` - Search documents
- `POST /documents/search-and-analyze` - Search and analyze with AI
- `GET /documents/indexed` - Get indexed documents

### AI Services
- `POST /query-perplexity` - Query Perplexity AI
- `POST /index-text` - Index text in ChromaDB
- `GET /search-text` - Search ChromaDB

## Project Structure

```
vthacks-2025/
├── app/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   ├── database.py          # Database utilities
│   ├── document_service.py  # Document processing
│   ├── model_manager.py     # ColPali model management
│   └── initial.py           # Model initialization
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   ├── components/      # React components
│   │   └── services/        # API services
│   └── package.json
├── docs/                    # Sample documents
├── database_schema.sql      # Database schema
└── requirements.txt         # Python dependencies
```

## Development

### Backend Development
```bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## Deployment

### Backend Deployment
1. Deploy your FastAPI backend to your preferred platform (Railway, Heroku, AWS, etc.)
2. Set up your database and environment variables
3. Note your backend URL (e.g., `https://your-app.railway.app`)

### Frontend Deployment
1. Update the frontend environment variable:
   ```bash
   cd frontend
   # Update .env.local or set in your deployment platform
   NEXT_PUBLIC_API_URL=https://your-backend-deployment-url.com
   ```

2. Deploy to your preferred platform:
   ```bash
   # For Vercel
   vercel --prod
   
   # For Netlify
   npm run build
   # Upload dist folder to Netlify
   
   # For Railway
   railway deploy
   ```

### Environment Variables Reference

#### Backend (.env)
```
PERPLEXITY_API_KEY=your_perplexity_api_key
GEMINI_API_KEY=your_gemini_api_key
DB_HOST=localhost
DB_PORT=8889
DB_USER=root
DB_PASSWORD=root
DB_NAME=vthacks_2025
```

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
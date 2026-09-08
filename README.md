# JobConnect

JobConnect is a job-matching platform that connects candidates, CVs, recruiters, and job offers. The project combines a FastAPI backend with a React frontend and uses an Ollama language model to support CV and job matching workflows.

## Features

- Candidate and recruiter authentication with JWT tokens
- CV upload and storage
- Job categories, job offers, requirements, bookmarks, and applications
- Fake development data for users, CVs, jobs, and applications
- CV analysis and matching through Ollama
- React interface for finding jobs, managing offers, and handling user profiles

## Project Structure

```text
src/cv_intelligent/    FastAPI backend, SQLAlchemy models, routers, and services
hire-hub/              React frontend
Fake data/             Legacy fake-data files
```

## Requirements

- Python 3.14 or newer
- PostgreSQL
- `uv`
- Node.js and npm
- Ollama with the `llama3.2` model for LLM features

## Backend Setup

Install Python dependencies from the project root:

```bash
uv sync
```

Create a `.env` file in the project root:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
SECRET_KEY=replace-with-a-long-random-secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Start the API:

```bash
uv run fastapi dev src/cv_intelligent/main.py
```

The API is available at `http://localhost:8000`. FastAPI interactive documentation is available at `/docs`.

The application initializes the database and loads fake development data when it starts. The current startup lifecycle drops and recreates all tables, so do not use it against a database containing data that must be preserved.

## Ollama Setup

Install and start Ollama, then download the configured model:

```bash
ollama pull llama3.2
```

The LLM service is used for CV extraction and matching features.

## Frontend Setup

Install frontend dependencies and start the React development server:

```bash
cd hire-hub
npm install
npm start
```

The frontend is available at `http://localhost:3000` and is configured to communicate with the local backend.

Create a production build with:

```bash
npm run build
```

## Development Seed Users

The fake-data seed creates these development accounts:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@fake.cv-intelligent.local` | `Admin123!` |
| Recruiter | `recruiter@fake.cv-intelligent.local` | `Recruiter123!` |
| User | `user@fake.cv-intelligent.local` | `User123!` |

Change or remove these credentials before using the project outside local development.

## Main Backend Areas

- `src/cv_intelligent/models/`: SQLAlchemy database models
- `src/cv_intelligent/Routers/`: API route handlers
- `src/cv_intelligent/schemas/`: Pydantic request and response schemas
- `src/cv_intelligent/services/`: CV and LLM services
- `src/cv_intelligent/FakeData/`: repeatable development seed data
- `hire-hub/src/`: React components, pages, API clients, and styles

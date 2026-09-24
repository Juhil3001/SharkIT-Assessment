# SharkIT

Investor deal feed. Founders post an equity, loan, or grant ask. Investors sign in, filter the feed, and see a new ask at the top without a reload.

**Live URL:** https://sharkit-assessment.netlify.app

**Demo login:** `demo@sharkit.in` / `SharkIT@2024`

## Run locally

API (from `backend/`):

```text
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
```

Set `DATABASE_URL` in `backend/.env` to your local Postgres database, then:

```text
uvicorn main:app --port 8000
```

The app runs Alembic on startup and loads the six seed deals.

Frontend (from `frontend/`):

```text
npm install
npx ng serve --port 4200
```

Open `http://localhost:4200`.

## API

| Method | Path | What it does |
|--------|------|----------------|
| `GET` | `/health` | Returns `{ "status": "ok" }` |
| `POST` | `/api/login` | Demo login. Wrong credentials return 401. |
| `GET` | `/api/deals` | Lists deals, newest last. Optional `?type=equity`, `loan`, or `grant`. |
| `POST` | `/api/deals` | Creates a deal. Equity asks require `equity_pct`. |

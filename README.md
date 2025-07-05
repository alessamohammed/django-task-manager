# Django Task Manager Starter

Quick-start Django project preconfigured with Login, Task CRUD, and optional Docker + Postgres.

## Features

* JWT-based authentication (login, register).  
* Task CRUD with title, description, **priority** (low/medium/high) & **status** (pending / in-progress / completed).  
* Filter & full-text search (`?status=`, `?priority=`, `?q=`).  
* React front-end with Bootstrap styling, toast notifications, and protected routes.  
* Docker compose stack: Django + PostgreSQL (and optional Celery + Redis).  

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `DJANGO_SECRET_KEY` | `django-insecure-change-me` | Django secret key |
| `DJANGO_DEBUG` | `True` | Toggle debug mode |
| `DB_ENGINE` | `django.db.backends.postgresql` (in Docker) / `sqlite3` (local) | DB backend |
| `DB_NAME`   | `task_db` | DB name |
| `DB_USER`   | `postgres` | DB user |
| `DB_PASSWORD` | `postgres` | DB password |
| `DB_HOST`   | `db` | DB host |
| `DB_PORT`   | `5432` | DB port |

You can override these in a `.env` file or directly in the compose file.

## Docs

* System design: [`docs/system_design.md`](docs/system_design.md)  
* Entity-relationship diagram: [`docs/erd.md`](docs/erd.md)

## Local Development

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver
```

Open `http://localhost:8000/` and register a new user or sign in with the superuser.

## Docker

```powershell
docker compose up --build
```

The web app will be available at `http://localhost:8000/` and the Postgres database on port `5432`. 

## Running Tests

```powershell
pytest  # backend tests (if added)
```

## CI / CD (optional)

A sample GitHub Actions workflow (`.github/workflows/ci.yml`) can build the Docker image, run Django tests, and build the React front-end.

---

© 2025. Built for the TAM recruitment assignment. 
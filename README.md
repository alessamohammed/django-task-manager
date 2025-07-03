# Django Task Manager Starter

Quick-start Django project preconfigured with Login, Task CRUD, and optional Docker + Postgres.

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
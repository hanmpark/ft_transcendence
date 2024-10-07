#!/bin/sh

# Wait for the database to be ready
while ! nc -z postgres 5432; do
  sleep 0.1
done

# Run the migrations
python3 manage.py makemigrations
python3 manage.py migrate

# Start the server
exec python3 manage.py runserver

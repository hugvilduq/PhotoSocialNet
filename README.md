# PhotoSocialNet

This is a RESTful API-based web project for a social media platform dedicated to photography. Users can share, like, and comment on photography posts, enhancing the community experience for photographers.

## Demo

You can check out the demo of the project in Spanish [here](https://www.youtube.com/watch?v=C4G38xzAJ0Y).

## Features

- User registration and authentication
- Upload and display high-quality photographs
- Interact with posts (like, comment)
- Follow other users
- Responsive design for both mobile and desktop

## Prerequisites

- Python 3.x
- MySQL or any relational database provider
- Virtual environment for Python (optional but recommended)

## Setup Instructions
Open your relational database provider (e.g., MySQL), and create a new database with your preferred name. In the settings.py, update the DB_CONN object
´´´
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "your_username",
    "password": "your_password",
    "database": "your_database_name",
}
´´´

then open a terminal at the project folder and run:
silence createdb

Create APIs and endpoints
silence createapi

Pictures from myself, available at my photography account
https://www.instagram.com/h.blink

[SILENCE RESTful API]https://github.com/DEAL-US/Silence

[Maginific Popup]https://dimsemenov.com/plugins/magnific-popup

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
- SILENCE library

## Setup Instructions
Open your relational database provider (e.g., MySQL), and create a new database with your preferred name. In the settings.py, update the DB_CONN object


```
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "your_username",
    "password": "your_password",
    "database": "your_database_name",
}
```

Then open a terminal at the project folder and run:
```
silence createdb
```
You can check at your DB manager how the tables will populate with all the data from the project.

To Create APIs and endpoints, run:
```
silence createapi
```
Now everything is set, run the application
```
silence run
```
And visit your hosted website at 
[127.0.0.1/8080](127.0.0.1/8080)

Pictures from myself, available at my photography account
https://www.instagram.com/h.blink

[SILENCE](https://github.com/DEAL-US/Silence)

[Maginific Popup](https://dimsemenov.com/plugins/magnific-popup)

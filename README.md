# Flask-Based Task Management Application

## Overview

This document outlines the structure and functionality of a professional-grade web-based task management system, commonly known as a "Todo List." I've developed this application using the Flask microframework for Python, with SQLite serving as the database for task storage. The system allows users to create, view, update, and delete tasks through a user-friendly web interface.

## Directory Structure

```
Todo-List
├── README.md
├── app.py
├── create.sql
├── database.db
├── init_db.py
├── requirements.txt
├── static
│   └── style.css
└── templates
    ├── create.html
    ├── edit.html
    ├── index.html
    └── show.html
```

## Key Components

- `app.py`: The main Flask application file that drives the system.
- `templates/`: Contains HTML templates for rendering the application's UI.
  - `index.html`: Displays the main task list.
  - `show.html`: Shows detailed information for individual tasks.
  - `create.html`: Provides a form for creating new tasks.
  - `edit.html`: Allows users to modify existing tasks.
- `static/`: Houses static assets like CSS files and images.
  - `style.css`: Defines the application's visual styling.
- `schema.sql`: SQL script for creating the `TASK` table in the SQLite database.
- `database.db`: The SQLite database file for persistent data storage.
- `requirements.txt`: Lists all Python dependencies required for the application.

## Prerequisites

Ensure you have Python (version 3.6 or higher) and pip installed on your system.

## Setup Instructions

1. Clone the repository:

```bash
git clone git@github.com:nameisalfio/Todo-List.git
cd Todo-List
```

2. Set up a virtual environment (recommended):

```bash
python -m venv venv
source venv/bin/activate   # For Windows: venv\Scripts\activate
```

3. Install the required dependencies:

```bash
pip install -r requirements.txt
```

4. Initialize the SQLite database:

```bash
sqlite3 database.db < schema.sql
```

## Running the Application

To start the application, execute these commands in your terminal:

```bash
export FLASK_APP=app
export FLASK_ENV=development
export FLASK_DEBUG=1
flask run
```

Once running, you can access the application at <http://127.0.0.1:5000>.

## Key Features

1. Create Tasks: Use the form on the main page to add new tasks.
2. View Task Details: Click the "Show Details" button next to a task for more information.
3. Update Task Status: Use the "Toggle Status" button to switch between "Completed" and "Incomplete" states. You can also edit task titles and descriptions from the Show Details panel.
4. Delete Tasks: Remove tasks from the list using the "Delete" button.

## Contributing

I welcome contributions to this project. If you'd like to suggest improvements or report issues, please submit a pull request or open an issue through the appropriate channels.

## Conclusion

This Task Management Application, built on the Flask framework, offers a robust solution for organizing personal or professional tasks. Its intuitive interface and powerful backend provide a seamless experience for managing daily activities. I encourage you to explore the full capabilities of this application and welcome your feedback for continuous improvement.
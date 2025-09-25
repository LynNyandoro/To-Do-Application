# React + TypeScript To-Do App

A simple To-Do application built with **React** and **TypeScript**.  
Add, edit, toggle, and delete tasks with a friendly interface and simulated API.

---

## Prerequisites

- **Node.js** v16 or higher  
- **npm** (comes with Node)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/LynNyandoro/To-Do-Application.git
cd my-todo-app
````

2. **Install dependencies**

```bash
npm install
```

---

## Running the App

Start the development server:

```bash
npm start
```

Open your browser and navigate to:

```
http://localhost:3000
```

You should see the To-Do app running. Now you can **add, edit, toggle, and delete tasks**.

---

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `build/` folder with all the production-ready assets.

---

## Notes

* The app uses a **mock API**, so data will **not persist across page reloads**.
* Network delays and errors are simulated to mimic real API behavior.
* Components include:

  * `AddTodoForm` — Form for adding new tasks
  * `TodoList` — Displays all tasks
  * `TodoItem` — Handles editing, toggling, and deleting tasks

---

## Project Folder Structure

todo-react-ts/
├─ node_modules/                 # Installed dependencies
├─ public/
│  ├─ index.html                 # Main HTML file
│  └─ favicon.ico                # App icon
├─ src/
│  ├─ api/
│  │  └─ mockAPI.ts              # Simulated API calls (GET, POST, UPDATE, DELETE)
│  ├─ components/
│  │  ├─ AddTodoForm.tsx         # Form to add new todos
│  │  ├─ TodoItem.tsx            # Single todo item with edit/delete/toggle
│  │  └─ TodoList.tsx            # List of todos, maps over TodoItem
│  ├─ interfaces/
│  │  └─ todo.ts                 # TypeScript interfaces (Todo, ApiResponse)
│  ├─ pages/
│  │  └─ Home.tsx                # Main page, handles state and API interactions
│  ├─ utils/
│  │  └─ helpers.ts              # Helper functions (truncate, filter, simulate errors)
│  ├─ App.tsx                     # Root App component
│  ├─ index.tsx                   # Entry point for React app
│  └─ index.css                   # Global styles
├─ .gitignore                     # Git ignore rules
├─ package.json                   # Project dependencies & scripts
├─ tsconfig.json                  # TypeScript configuration
└─ README.md                      # Project instructions


```

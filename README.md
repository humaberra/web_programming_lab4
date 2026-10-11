# Task Dashboard - Assignment 4

This is a Dynamic Task Dashboard built with vanilla JavaScript. The project demonstrates DOM manipulation, event handling, asynchronous JavaScript, ES6 classes, and immutability.

## File Organization

- `index.html`: Contains the basic DOM structure, elements, and script tags to load the JavaScript files.
- `styles.css`: Provides basic styling for the task list and visual feedback for completed tasks (e.g., line-through).
- `api.js`: Simulates a backend server. It contains the `fetchTasks` function which returns a Promise that resolves after a 1500ms delay with raw task data.
- `taskManager.js`: Defines the `Task` and `TaskManager` classes. It handles state changes immutably without mutating the original arrays or objects.
- `main.js`: The entry point that orchestrates the DOM events, calls the simulated API, handles JSON parsing, and renders the tasks dynamically to the screen.
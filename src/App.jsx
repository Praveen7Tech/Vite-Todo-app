import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [Task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  // Load from localStorage once when the app starts
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todo-list")) || [];
    setTodo(savedList);
  }, []);

  // Save todo to localStorage every time it's changed
  const updateTodo = (newTodo) => {
    setTodo(newTodo);
    localStorage.setItem("todo-list", JSON.stringify(newTodo));
  };

  return (
    <div className="todo-container">
      <h1>To Do List</h1>
      <div className="input-group">
        <input
          className="input"
          type="text"
          value={Task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Your Task here.."
        />
        <button
          className="add-button"
          onClick={() => {
            if (Task.trim()) {
              const newTask = {
                id: Date.now(),
                text: Task,
                completed: false,
              };
              const newTodoList = [...todo, newTask];
              updateTodo(newTodoList);
              setTask("");
            }
          }}
        >
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todo.map((task, index) => (
          <li key={task.id} className="todo-item">
            <span className="todo-text">{index + 1}</span>
            <span
              className="todo-text"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button
              className="complete-button"
              onClick={() => {
                const updatedList = todo.map((t) =>
                  t.id === task.id ? { ...t, completed: !t.completed } : t
                );
                updateTodo(updatedList);
              }}
            >
              complete
            </button>
            <button
              className="delete-button"
              onClick={() => {
                const updatedList = todo.filter((t) => t.id !== task.id);
                updateTodo(updatedList);
              }}
            >
              delete
            </button>
          </li>
        ))}
      </ul>

      <div>
        <button
          className="remove-button"
          onClick={() => {
            const updatedList = todo.filter((t) => !t.completed);
            updateTodo(updatedList);
          }}
        >
          Remove Completed
        </button>
      </div>
    </div>
  );
}

export default App;

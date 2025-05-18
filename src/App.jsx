import "./App.css";
import { useState } from "react";

function App() {
  const [Task, setTask] = useState("");
  const [todo, setTodo] = useState([]);

  return (
    <div className="todo-container">
        <h1>To Do List</h1>
      <div className="input-group">
        <input className="input" type="text" value={Task}
          onChange={(e) => {
            setTask(e.target.value);
          }} placeholder="Enter Your Task here.."
        />
        <button  className="add-button" onClick={() => {
            if (Task.trim()) {
              setTodo([...todo, Task]);
              setTask("");
              console.log(todo);
            }
          }}>
          Add
        </button>
      </div>
      <div>
        <ul className="todo-list">
          {todo.map((task, index) => (
            <li key={index} className="todo-item">
              <input
               type="checkbox"
               className="todo-checkbox"
               />
              <span className="todo-text">
                {task}
              </span>
              <button className="delete-button"
                onClick={() => {
                  const removeTodo = todo.filter((_, i) => i !== index);
                  console.log("remov", removeTodo);
                  setTodo(removeTodo);
                }} >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

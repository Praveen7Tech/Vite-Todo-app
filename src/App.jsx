import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [Task, setTask] = useState("");
  const [todo, setTodo] = useState([]);


  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todo));
  }, [todo]);


  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("todo-list")) || [];
    setTodo(savedList);
  }, []);


  return (
    <div className="todo-container">
        <h1>To Do List</h1>
      <div className="input-group">
        <input className="input" type="text" value={Task}
          onChange={(e) => {
            setTask(e.target.value);
          }} placeholder="Enter Your Task here.."
        />
        <button  className="add-button" 
        onClick={() => {
            if (Task.trim()) {
              const newTodo = {
                    id: Date.now(),
                    text: Task,
                    completed: false,
                  };
              setTodo([...todo, newTodo]);
              setTask("");
              console.log(todo);
            }
          }}>
          Add
        </button>
      </div>
      <div>
        <ul className="todo-list">
          {todo.map((task,index) => (
            <li key={task.id} className="todo-item">
              <span className="todo-text">{index + 1}</span>
              <span className="todo-text"
                style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </span>
              <button className="complete-button" 
                onClick={() => {
                  const updateTodo = todo.map((t) => 
                    t.id === task.id ? {...t, completed: !t.completed} : t
                  )
                  setTodo(updateTodo)
                }}>
                complete
              </button>
              <button className="delete-button"
                onClick={() => {
                  const removeTodo = todo.filter((to) => to.id !== task.id);
                  console.log("remov", removeTodo);
                  setTodo(removeTodo);
                }} >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="remove-button"
        onClick={() => {
          const updated = todo.filter((list) => list.completed == false)
          setTodo(updated)
        }}>Remove Compleated</button>
      </div>
    </div>
  );
}

export default App;

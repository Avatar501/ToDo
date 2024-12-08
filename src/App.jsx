import { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [darkMode, setDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      const newTask = { text: taskInput, priority, completed: false, updated: false };
      setTasks((prevTasks) => sortTasks([...prevTasks, newTask]));
      setTaskInput("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskInput(taskToEdit.text);
    setPriority(taskToEdit.priority);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleSaveTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editingIndex
        ? { ...task, text: taskInput, priority, updated: true }
        : task
    );
    setTasks(sortTasks(updatedTasks));
    setTaskInput("");
    setIsEditing(false);
    setEditingIndex(null);
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasks(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(sortTasks(updatedTasks));
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const sortTasks = (tasks) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">React To-Do List</h1>
        <button className="toggle-mode" onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="Add a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        {isEditing ? (
          <button className="save-button" onClick={handleSaveTask}>
            Save
          </button>
        ) : (
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        )}
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.updated ? "highlight" : ""}`}
          >
            <span
              onClick={() => toggleTask(index)}
              className={`task-text ${task.completed ? "completed" : ""}`}
            >
              {task.text} - <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
            </span>
            <div className="task-buttons">
              <button
                className="edit-button"
                onClick={() => handleEditTask(index)}
              >
                ✏ Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                ✖ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {tasks.length > 0 && (
        <button className="clear-button" onClick={clearTasks}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default App;

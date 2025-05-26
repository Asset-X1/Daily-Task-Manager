import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import '../src/styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-panel">
        <Navbar />
        <div className="dashboard-content">
          <div className="task-controls">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort by</option>
              <option value="priority">Priority</option>
              <option value="date">Due Date</option>
            </select>
          </div>

          <TaskForm onTaskAdded={fetchTasks} />
          <TaskList
            tasks={tasks}
            onTaskChange={fetchTasks}
            category={category}
            search={search}
            sort={sort}
          />
        </div>
      </div>
    </div>
  );
}

export default App; 
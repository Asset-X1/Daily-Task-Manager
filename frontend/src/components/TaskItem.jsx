const TaskItem = ({ task, onTaskChange }) => {
  const toggleComplete = async () => {
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    });
    onTaskChange();
  };

  const deleteTask = async () => {
    await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: 'DELETE'
    });
    onTaskChange();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
      <div className="task-details">
        <div>{task.title}</div>
        {task.description && <small>{task.description}</small>}
        {(task.due_date || task.priority) && (
          <small>🗓️ {task.due_date} | ⚠️ {task.priority}</small>
        )}
      </div>
      <button onClick={deleteTask} title="Delete task">&times;</button>
    </div>
  );
};

export default TaskItem;

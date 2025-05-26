import TaskItem from './TaskItem';

const TaskList = ({ tasks, onTaskChange, category, search, sort }) => {
  let filtered = tasks;

  // Filter by category
  if (category !== 'All') {
    filtered = filtered.filter(t => t.category === category);
  }

  // Search by title
  if (search.trim()) {
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sorting
  if (sort === 'priority') {
    const order = { High: 1, Medium: 2, Low: 3 };
    filtered = filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  } else if (sort === 'date') {
    filtered = filtered.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  }

  return (
    <div className="task-list">
      {filtered.length ? (
        filtered.map(task => (
          <TaskItem key={task.id} task={task} onTaskChange={onTaskChange} />
        ))
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>No matching tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;

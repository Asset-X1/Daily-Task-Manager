const TaskFilter = ({ category, setCategory, sort, setSort }) => {
  return (
    <div className="task-filter">
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
      </select>
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="default">Sort by</option>
        <option value="date">Due Date</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default TaskFilter;

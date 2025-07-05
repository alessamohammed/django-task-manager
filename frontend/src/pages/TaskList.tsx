import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Task } from '../types';
import { toast } from 'react-toastify';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    const params: Record<string, string> = {};
    if (filter !== 'all') {
      params.status = filter;
    }
    if (priorityFilter !== 'all') {
      params.priority = priorityFilter;
    }
    if (search.trim()) {
      params.q = search.trim();
    }
    const { data } = await api.get<Task[]>('tasks/', { params });
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter, priorityFilter, search]);

  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await api.patch(`tasks/${task.id}/`, { status: newStatus });
      toast.success('Task updated');
      fetchTasks();
    } catch {
      toast.error('Error updating task');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.delete(`tasks/${id}/`);
      toast.success('Task deleted');
      fetchTasks();
    } catch {
      toast.error('Error deleting task');
    }
  };

  return (
    <div className="container py-4">
      <h1>Tasks</h1>
      <div className="mb-3">
        {/* Search box */}
        <div className="input-group mb-2" style={{ maxWidth: 300 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-secondary" onClick={fetchTasks}>
            Go
          </button>
        </div>

        {/* Status filter */}
        <div className="btn-group me-3" role="group">
          {(['all', 'pending', 'in_progress', 'completed'] as const).map((s) => (
            <button
              key={s}
              className={`btn btn-secondary${filter === s ? ' active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Priority filter */}
        <div className="btn-group" role="group">
          {(['all', 'low', 'medium', 'high'] as const).map((p) => (
            <button
              key={p}
              className={`btn btn-outline-primary${priorityFilter === p ? ' active' : ''}`}
              onClick={() => setPriorityFilter(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <Link to="/tasks/new" className="btn btn-primary float-end">
          New Task
        </Link>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <input
                type="checkbox"
                className="form-check-input me-2"
                checked={task.status === 'completed'}
                onChange={() => toggleStatus(task)}
              />
              <span style={{ textDecoration: task.status === 'completed' ? 'line-through' : 'none' }}>
                {task.title} ({task.priority})
              </span>
            </div>
            <div>
              <Link to={`/tasks/${task.id}`} className="btn btn-sm btn-outline-primary me-2">
                Edit
              </Link>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList; 
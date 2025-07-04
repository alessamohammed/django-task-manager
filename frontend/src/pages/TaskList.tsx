import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const fetchTasks = async () => {
    const params: Record<string, string> = {};
    if (filter !== 'all') {
      params.status = filter;
    }
    const { data } = await api.get<Task[]>('tasks/', { params });
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const toggleCompleted = async (task: Task) => {
    await api.patch(`tasks/${task.id}/`, { completed: !task.completed });
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await api.delete(`tasks/${id}/`);
    fetchTasks();
  };

  return (
    <div className="container py-4">
      <h1>Tasks</h1>
      <div className="mb-3">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className="btn btn-secondary me-2"
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
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
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
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
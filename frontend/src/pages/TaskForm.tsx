import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { Task } from '../types';

const TaskForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Pick<Task, 'title' | 'description' | 'completed'>>({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const { data } = await api.get<Task>(`tasks/${id}/`);
        setFormData({
          title: data.title,
          description: data.description,
          completed: data.completed,
        });
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      await api.put(`tasks/${id}/`, formData);
    } else {
      await api.post('tasks/', formData);
    }
    navigate('/');
  };

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h1>{isEdit ? 'Edit Task' : 'New Task'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        {isEdit && (
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="completed"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <label htmlFor="completed" className="form-check-label">
              Completed
            </label>
          </div>
        )}
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskForm; 
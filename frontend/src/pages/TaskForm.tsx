import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { Task } from '../types';
import { toast } from 'react-toastify';

const TaskForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Pick<Task, 'title' | 'description' | 'priority' | 'status'>>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
  });

  useEffect(() => {
    if (isEdit) {
      (async () => {
        const { data } = await api.get<Task>(`tasks/${id}/`);
        setFormData({
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
        });
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`tasks/${id}/`, formData);
        toast.success('Task updated');
      } else {
        await api.post('tasks/', formData);
        toast.success('Task created');
      }
      navigate('/');
    } catch (err) {
      toast.error('Error saving task');
    }
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
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {isEdit && (
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
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
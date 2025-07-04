import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import Login from './pages/Login';
import Register from './pages/Register';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          TaskManager
        </Link>
        <div>
          {user ? (
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskForm />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
};

export default App; 
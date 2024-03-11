import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from './layouts';
import { useAuthContext } from './providers';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { Dashboard } from './pages/Dashboard';

export const Routing = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <AuthLayout>
        <Routes>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthLayout>
    );
  }

  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

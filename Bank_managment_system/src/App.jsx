import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HomePage } from './views/HomePage';
import { DashboardPage } from './views/DashboardPage';
import { AuthModal } from './components/AuthModal';

const MainApp = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <HomePage />
      ) : (
        <DashboardPage onReturnHome={logout} />
      )}
      <AuthModal />
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

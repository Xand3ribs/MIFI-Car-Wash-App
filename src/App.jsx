import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0D1B2A]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1565C0]"></div>
      </div>
    );
  }

  return <AppRoutes user={user} />;
}

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </HashRouter>
  );
}

export default App;

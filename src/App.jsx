import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider, useAuth } from './context/AuthContext'; // Make sure this path matches your file structure

function AppContent() {
  const { user, loading } = useAuth();

  // Protect routes from flashing/crashing while checking if a session exists
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0D1B2A]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1565C0]"></div>
      </div>
    );
  }

  // Pass the real Supabase user object (with its database role) down into your routes
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

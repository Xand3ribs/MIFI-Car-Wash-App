import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import Home from './pages/Home';
import AppRoutes from './routes';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

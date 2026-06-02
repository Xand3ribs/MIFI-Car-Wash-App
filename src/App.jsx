import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

const currentUser = {
  name: "jojoi",
  role: "user", 
  slug: "mifai-boss"
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes user={currentUser} />
    </BrowserRouter>
  );
}

export default App;
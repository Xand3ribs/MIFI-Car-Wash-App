import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';

const currentUser = {
  name: "jojoi",
  role: "user", 
  slug: "mifai-boss"
};

function App() {
  return (
    <HashRouter>
      <AppRoutes user={currentUser} />
    </HashRouter>
  );
}

export default App;
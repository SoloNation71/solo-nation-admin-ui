
import { useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import LoginPage from '@/components/LoginPage';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const auth = sessionStorage.getItem('soloNationAuth');
    if (auth) {
      setIsAuthenticated(true);
    }
  }, []);

  return isAuthenticated ? <Dashboard /> : <LoginPage onLogin={() => setIsAuthenticated(true)} />;
};

export default Index;

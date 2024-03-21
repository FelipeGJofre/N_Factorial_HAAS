import { useNavigate } from 'react-router-dom';

function TestComponent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/app');
  }, []);

  return null;
}
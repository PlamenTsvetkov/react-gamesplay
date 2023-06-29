import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const isAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Component: React.FC<any> = (props) => {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate(`/login`);
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default isAuth;
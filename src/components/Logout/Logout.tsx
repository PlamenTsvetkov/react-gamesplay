import {auth} from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const  Logout=() =>{
    const navigate = useNavigate();
  
    useEffect(() => {
      auth.signOut().then(() => {
        navigate('/login'); // Redirect to the login page after signing out
      });
    }, [navigate]);
  
    return null; // or you can return a loading component here
  }
export default Logout;

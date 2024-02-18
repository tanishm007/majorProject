import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';

function GoogleAuth() {

    const navigate = useNavigate();

    const [decodedData, setDecodedData] = useState(null);

    useEffect(() => {
        if (decodedData) {
            navigate('/student', { state: { decodedData } });
        }
    }, [decodedData, navigate]);



    return (
      <>            
        <GoogleLogin
    onSuccess={credentialResponse => {
      
      
      const decoded = jwtDecode(credentialResponse.credential); 
      setDecodedData(decoded);
     
    
       
      
     
      
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />
    </>
  
    )
  }
  
  export default GoogleAuth
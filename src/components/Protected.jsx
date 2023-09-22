import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';


const Protected = ({ children }) => {
  const { adminData } = useContext(AdminContext);
  let token = adminData?.token;
  return token ? children : <Navigate to="/login" replace />;
};

export default Protected;

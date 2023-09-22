import React, { createContext } from 'react';
import jwt_decode from 'jwt-decode';

export const AdminContext = createContext();
const AdminContextProvider = ({ children }) => {
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  let isMainAdmin = adminData?.token ? jwt_decode(adminData?.token) : false;
  return (
    <AdminContext.Provider
      value={{ adminData, isMainAdmin: isMainAdmin.mainAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

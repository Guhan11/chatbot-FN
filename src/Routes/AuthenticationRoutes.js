import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need for Router here if you have it in index.js or App.js
import Login from '../LoginCredential/Login'; // Correctly import the Login component from your file
import SignUp from '../LoginCredential/SignUp';
import ChatApp from '../ChatBotMain/ChatApp'

export const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} /> 
      <Route path="/chatApp" element={<ChatApp />} />
    </Routes>
  );
};

export default AuthenticationRoutes;

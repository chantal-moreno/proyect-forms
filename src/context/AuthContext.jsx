import PropTypes from 'prop-types';
import { createContext, useState, useEffect } from 'react';
import { signUpRequest, signInRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await signUpRequest(user);
      // console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.warn(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await signInRequest(user);
      // console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.warn(error.response);
      setErrors(error.response.data);
    }
  };

  const signout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkSignIn() {
      const cookies = Cookies.get();
      if (cookies.token) {
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data) return setIsAuthenticated(false);
          // console.log(res.data);
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.warn(error.response);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    }
    checkSignIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, signout, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

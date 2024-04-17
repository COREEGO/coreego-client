import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeToken } from './variables';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        if (response) {
          toast.success(response?.data?.message)
          return response;
        }
        return response; // Pass through successful responses without modification
      },
      (error) => {
        if (error) {
          if (error.response) {
            const { status, data } = error.response;

            // Handle unauthorized errors (401)
            if (status === 401) {
              removeToken();
              navigate("/login");
              toast.error(data?.message || 'Unauthorized'); // Use data.message if available, fallback message otherwise
              return Promise.reject(error);
            }

            // Handle forbidden errors (403)
            if (status === 403) {
              toast.error(data?.message || 'Forbidden'); // Use data.message if available, fallback message otherwise
              navigate('/');
              return Promise.reject(error);
            }

            // Handle server errors (500) and potentially redirect to an error page
            if (status === 500) {
                if (error.config.url === "/me") {
                    toast.error("Vous êtes déconnectés");
                    removeToken();
                    navigate("/login");
                    return;
                }
              toast.error(data?.message);
              return Promise.reject(error);
            }
          } else {
            // Handle non-response errors (e.g., network issues)
            toast.error('Network Error'); // Inform the user about network problems
            return Promise.reject(error);
          }
        }
        return Promise.reject(error); // Fallback for unexpected errors
      }
    );

    // Cleanup function to remove the interceptor on component unmount
    return () => axios.interceptors.response.eject(interceptor);
  }, []); // Empty dependency array to run the effect only once

  return {}; // No need to return anything from the hook function
};

export default useAxiosInterceptor;

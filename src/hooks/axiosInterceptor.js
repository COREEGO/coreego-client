import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeToken } from '../utils/variables';

const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => {
        if (response) {
          toast.success(response?.data?.message)
          return response;
        }
        return response;
      },
      (error) => {
        if (error) {
          if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
              removeToken();
              navigate("/login");
              toast.error(data?.message || 'Unauthorized');
              return Promise.reject(error);
            }else if(status === 403) {
              toast.error(data?.message || 'Forbidden');
              navigate('/');
              return Promise.reject(error);
            }else if(status === 500) {
              if (error.config.url === "/me") {
                  toast.error("Vous êtes déconnectés");
                  removeToken();
                  navigate("/login");
                  return;
              }
            toast.error(data?.message);
            return Promise.reject(error);
          }else{
            toast.error(data?.message);
          }


          } else {
            toast.error('Network Error');
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return {};
};

export default useAxiosInterceptor;

import React, { JSXElementConstructor, ReactElement, Suspense, useEffect, useState } from 'react';
import { Box, ChakraProvider, Container, Fade, SkipNavLink, extendTheme, position, withDefaultColorScheme } from '@chakra-ui/react'
import './App.scss';
import RouterOutleft from './pages/components/RouterOutlet';
import { Provider } from 'react-redux';
import store from './store/app.store';
import Layout from './pages/layouts/Layout';
import { FilterProvider } from './contexts/FilterProvider';
import { SWRConfig } from 'swr';
import { swrConfig } from './http-common/swrConfig';
import { AuthProvider } from './contexts/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from "material-ui-confirm";
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: () => ({
        body: {
          backgroundColor: 'var(--main)',
        },
        a: {
          textDecoration: 'none'
        },
      }),
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: 'var(--mui-light)',
          '&:hover':{
             boxShadow: 'var( --box-shadow)',
             borderColor: 'var(--mui-light)'
          }
        },
      }
    },
    MuiOutlinedInput:{
      styleOverrides: {
        root: {
          '&:hover':{
             boxShadow: 'var( --box-shadow)',
          },
        },
      }
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SWRConfig value={swrConfig}>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ConfirmProvider
            defaultOptions={{
              title: 'Confirmation',
              cancellationText: 'Non',
              confirmationText: 'Oui',
              confirmationButtonProps: { autoFocus: true },
            }}
          >
            <FilterProvider>
              <Provider store={store}>
                <Layout>
                  <RouterOutleft />
                </Layout>
              </Provider>
            </FilterProvider>
          </ConfirmProvider>
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>

  );
}

export default App;

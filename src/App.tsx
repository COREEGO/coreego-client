import React, { Suspense, useEffect, useState } from 'react';
import { Box, ChakraProvider, Container, Fade, SkipNavLink, extendTheme, position } from '@chakra-ui/react'
import './App.css';
import RouterOutleft from './pages/components/RouterOutlet';
import { CONTAINER_SIZE } from './utils/variables';
// import { swrConfig } from './http-common/swrConfig'
import { AuthProvider } from './contexts/AuthProvider';
import { Provider } from 'react-redux';
import store from './store/app.store';
import Layout from './pages/layouts/Layout';
import { FilterProvider } from './contexts/FilterProvider';

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  // styles: {
  //   global: {
  //     // Modifier la couleur du texte du corps ici
  //     body: {
  //       backgroundColor: 'var(--main)',
  //     },
  //   },
  // },
})

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={{
      defaultOptions: {
        position: 'top-right', duration: 2000,
        isClosable: true,
      }
    }}>
      <AuthProvider>
        <FilterProvider>
          <Provider store={store}>
            <Layout>
                <RouterOutleft />
            </Layout>
          </Provider>
        </FilterProvider>
      </AuthProvider>
    </ChakraProvider >
  );
}

export default App;

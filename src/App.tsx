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
import { SWRConfig } from 'swr';
import { swrConfig } from './http-common/swrConfig';

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
})

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={{
      defaultOptions: {
        position: 'top-right', duration: 2000,
        isClosable: true,
      }
    }}>
      <SWRConfig value={swrConfig}>
        <AuthProvider>
          <FilterProvider>
            <Provider store={store}>
              <Layout>
                <RouterOutleft />
              </Layout>
            </Provider>
          </FilterProvider>
        </AuthProvider>
      </SWRConfig>
    </ChakraProvider >
  );
}

export default App;

import React, { Suspense, useEffect, useState } from 'react';
import { Box, ChakraProvider, Container, SkipNavLink, extendTheme, position } from '@chakra-ui/react'
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
    heading: `'Josefin Sans', sans-serif`,
    body: `'Josefin Sans', sans-serif`,
  },
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <FilterProvider>
          <Provider store={store}>
            <Layout>
              <Box my={10}>
                <RouterOutleft />
              </Box>
            </Layout>
          </Provider>
        </FilterProvider>
      </AuthProvider>
    </ChakraProvider >
  );
}

export default App;

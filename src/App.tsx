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

function App() {
  return (
    <ChakraProvider>
        <AuthProvider>
          <Provider store={store}>
            <Layout>
              <Container maxW={CONTAINER_SIZE}>
                <Box my={10}>
                  <RouterOutleft />
                </Box>
              </Container>
            </Layout>
          </Provider>
        </AuthProvider>
    </ChakraProvider >
  );
}

export default App;

import React from 'react';
import { ChakraProvider, Container, SkipNavLink } from '@chakra-ui/react'
import './App.css';
import DefaultLayout from './pages/layouts/DefaultLayout';
import RouterOutleft from './pages/components/RouterOutlet';
import { CONTAINER_SIZE } from './utils/config';
import { swrConfig } from './http-common/swrConfig'
import { SWRConfig as SWR } from 'swr';


function App() {
  return (
    <ChakraProvider>
      <DefaultLayout />
      <Container maxW={CONTAINER_SIZE}>
        <SWR value={swrConfig}>
          <RouterOutleft />
        </SWR>
      </Container>
    </ChakraProvider>
  );
}

export default App;

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
  //   }
  // },
},
)

function App() {
  return (
    <ChakraProvider theme={theme} toastOptions={{
      defaultOptions: {
        position: 'top', duration: 2000,
        isClosable: true,
      }
    }}>
      <AuthProvider>
        <SWRConfig value={swrConfig}>
          <FilterProvider>
            <Provider store={store}>
              <Layout>
                <RouterOutleft />
              </Layout>
            </Provider>
          </FilterProvider>
        </SWRConfig>
      </AuthProvider>
    </ChakraProvider >
  );
}

export default App;

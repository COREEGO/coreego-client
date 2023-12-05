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
  styles: {
    global: {
      // Modifier la couleur du texte du corps ici
      body: {
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRradius: '90px',
          borderRadius: 'md'
        },
        '&::-webkit-scrollbar': {
          width: '7px !important',
          padding: '10px',
          height: '5px !important'
        }
      },
    }
  },
},
)

function App() {
  return (

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

  );
}

export default App;

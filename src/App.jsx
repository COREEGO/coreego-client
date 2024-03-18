import './App.scss'
import RouterOutleft from './pages/components/RouterOutlet'
import { Provider } from 'react-redux'
import store from './store/app.store'
import Layout from './pages/layouts/Layout'
import { FilterProvider } from './contexts/FilterProvider'
import { SWRConfig } from 'swr'
import { swrConfig } from './http-common/swrConfig'
import { AuthProvider } from './contexts/AuthProvider'
import { ToastContainer } from 'react-toastify'
import { ConfirmProvider } from 'material-ui-confirm'
import 'react-toastify/dist/ReactToastify.css'

import {
	CssBaseline,
	ThemeProvider,
	createTheme,
  responsiveFontSizes
} from '@mui/material'

let theme = createTheme({
  typography: {
    fontFamily:
			'Open Sans, Roboto, Lato, Source Sans Pro, Montserrat, sans-serif'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: 'var(--coreego-blue)'
        },
        outlinedPrimary: {
          borderColor: 'var(--coreego-blue)',
          color: 'var(--coreego-blue)'
        },
        containedError: {
          backgroundColor: 'var(--coreego-red)'
        },
        outlinedError: {
          borderColor: 'var(--coreego-red)',
          color: 'var(--coreego-red)'
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '&.string_count': {
            position: 'absolute',
            right: ' 10px',
            bottom: '15px'
          }
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '16px'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: () => ({
        a: {
          textDecoration: 'none',
          color: 'black'
        }
      })
    }
  },
})

theme = responsiveFontSizes(theme);

function App () {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SWRConfig value={swrConfig}>
          <ToastContainer
            position='top-right'
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='colored'
					/>
          <ConfirmProvider
            defaultOptions={{
              title: 'Confirmation',
              cancellationText: 'Non',
              confirmationText: 'Oui',
              confirmationButtonProps: { autoFocus: true }
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
  )
}

export default App

import './App.scss'
import RouterOutlet from './pages/components/RouterOutlet'
import { Provider } from 'react-redux'
import store from './store/app.store'
import Layout from './pages/layouts/Layout'
import { FilterProvider } from './contexts/FilterProvider'
import { SWRConfig } from 'swr'
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
import axios from 'axios'
import CookieConsent from 'react-cookie-consent'
import Cookies from 'js-cookie';
import { useEffect } from 'react'

function setFunctionalCookies () {
  Cookies.set('functional-cookie', 'value', {
    expires: 365,
    sameSite: 'None',
    secure: true
  })
}

function initializeAnalytics () {
  if (!window.dataLayer) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', 'G-K6C3C1FZQR', { send_page_view: false })
  }
}

let theme = createTheme({
  typography: {
    fontFamily:
			'Open Sans, Roboto, Lato, Source Sans Pro, Montserrat, sans-serif'
  },
  components: {
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
  palette: {
    primary: {
      main: '#005998'
    },
    error: {
      main: '#ce293b'
    }
  }
})

theme = responsiveFontSizes(theme)

const swrConfig = {
  fetcher: (url) => axios.get(url).then((res) => res.data)
}

function App () {

  useEffect(()=>{
    setFunctionalCookies()
  },[])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CookieConsent
        location='bottom'
        buttonText='Accepter'
        declineButtonText='Refuser'
        enableDeclineButton
        cookieName='userConsentCookies'
        style={{
          background: 'var(--coreego-blue)',
          color: 'white',
          fontFamily: 'Open Sans, sans-serif',
          boxShadow: '0 0 5px black'
        }}
        declineButtonStyle={{ color: 'white', background: 'var(--coreego-red)', fontSize: 18 }}
        buttonStyle={{ background: 'green', color: 'white', fontSize: 18 }}
        expires={150}
        onAccept={() => {
          initializeAnalytics()
        }}
        onDecline={() => {
          //
        }}
			>
				Ce site utilise des cookies pour améliorer l'expérience
				utilisateur. En utilisant notre site, vous acceptez tous les
				cookies conformément à notre Politique de Confidentialité.
			</CookieConsent>
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
              cancellationText: 'Annuler',
              confirmationText: 'Valider',
              cancellationButtonProps: {
                variant: 'contained',
                color: 'error'
              },
              confirmationButtonProps: { variant: 'contained' }
            }}
					>
            <FilterProvider>
              <Provider store={store}>
                <Layout>
                  <RouterOutlet />
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

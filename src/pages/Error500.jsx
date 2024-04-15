import { NavLink } from 'react-router-dom'
import SYSTEM_ERROR from '../images/svgs/500.svg'
import LOGO from '../images/coreego-logo-rb.png'
import {
	Stack,
	Typography,
	Container,
	Button,
	Box
} from '@mui/material'
import {Helmet} from 'react-helmet'


const Error500 = () => {
  return (
    <>
    <Helmet>
				<title>serveur error</title>
		</Helmet>
    <Box
      sx={{
        position: 'fixed',
        zIndex: 3000,
        top: 0,
        background: 'white',
        width: '100vw',
        height: '100vh',
        bottom: 0
      }}
      >
      <Container>
        <Stack my={5} spacing={3} maxWidth='100%' alignItems='center'>
          <img
            width={300}
            style={{ maxWidth: '100%' }}
            height='auto'
            src={LOGO}
            title='coreego'
            alt='coreego logo'
            />
          <img
            style={{ maxWidth: '100%' }}
            width='auto'
            height={300}
            src={SYSTEM_ERROR}
            />
          <Typography fontWeight='bold'>
						Une erreur système est apparue
					</Typography>
          <Typography textAlign='center'>
						Notre équipe est déjà informée et travaille activement à
						résoudre ce problème. Nous vous prions de nous excuser
						pour la gêne occasionnée.
					</Typography>
          <NavLink to='/'>
            <Button variant='outlined'>
							Cliquer ici pour réessayer
						</Button>
          </NavLink>
        </Stack>
      </Container>
    </Box>
            </>
  )
}

export default Error500

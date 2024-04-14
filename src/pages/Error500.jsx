import { NavLink } from 'react-router-dom'
import SYSTEM_ERROR from '../images/svgs/500.svg'
import { Stack, Typography, Container, Button } from '@mui/material'

const Error500 = () => {
  return (
    <Container>
      <Stack my={5} spacing={3} maxWidth='100%' alignItems='center'>
        <img
          style={{ maxWidth: '100%' }}
          width='auto'
          height={300}
          src={SYSTEM_ERROR}
				/>
        <Typography fontWeight='bold'>
					Une erreur système est apparue
				</Typography>
        <Typography>
					Notre équipe est déjà informée et travaille activement à
					résoudre ce problème. Nous vous prions de nous excuser pour
					la gêne occasionnée.
				</Typography>
        <NavLink to='/'>
          <Button variant='outlined'>
						Cliquer ici pour réessayer
					</Button>
        </NavLink>
      </Stack>
    </Container>
  )
}

export default Error500

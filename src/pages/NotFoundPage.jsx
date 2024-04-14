import { Button, Stack, Typography, Container } from '@mui/material'
import NOT_FOUND from '../images/svgs/404.svg'
import { NavLink } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <Container>
      <Stack my={5} spacing={3} maxWidth='100%' alignItems='center'>
        <img
          style={{ maxWidth: '100%' }}
          width='auto'
          height={300}
          src={NOT_FOUND}
				/>
        <Typography fontWeight='bold'>Page non trouvée</Typography>
        <NavLink to='/'>
          <Button variant='outlined'>Retourner à l'accueil</Button>
        </NavLink>
      </Stack>
    </Container>
  )
}

export default NotFoundPage

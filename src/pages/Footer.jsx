import {
	Box,
	Container,
	Divider,
	Stack,
	Typography
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { INSTAGRAM_ICON } from '../utils/icon'

const Footer = ({...props}) => {
  return (
    <Box sx={{borderTop: '2px solid grey'}} {...props} py={5} component="footer">
      <Container>
        <Stack
          role='links'
          pb={5}
          gap={5}
          flexDirection='row'
          flexWrap='wrap'
				>
          <Box>
            <Typography fontWeight='bold' gutterBottom>
							Accès rapide
						</Typography>
            <Stack
              sx={{
                alignItems: 'start',
                '> a:hover': {
                  textDecoration: 'underline'
                }
              }}
						>
              <NavLink to="/forum">Forum</NavLink>
              <NavLink to="/market-place">Market place</NavLink>
              <NavLink to="/voyage">Voyage</NavLink>
            </Stack>
          </Box>

          <Box>
            <Typography fontWeight='bold' gutterBottom>
							Coreego
						</Typography>
            <Stack
              sx={{
                alignItems: 'start',
                '> a:hover': {
                  textDecoration: 'underline'
                }
              }}
						>
              <a href="mailto: contact.coreego.fr">Nous contacter</a>
            </Stack>
          </Box>
        </Stack>
        <Divider />

        <Stack mt={3} flexDirection='row' flexWrap='wrap'>
          <Stack
            flexDirection='row'
            flexWrap='wrap'
            flex={1}
            gap={2}
            sx={{
              '> a:hover': {
                textDecoration: 'underline'
              }
            }}
					>
            <NavLink>Confidentialité</NavLink>
            <NavLink>Conditions générales</NavLink>
            <NavLink>Fonctionnement du site</NavLink>
          </Stack>
          <Stack role='social network'>
            <NavLink to="https://www.instagram.com/coreego_fr/" target="__blank">
              <INSTAGRAM_ICON />
            </NavLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer

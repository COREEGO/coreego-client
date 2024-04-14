import { Stack, Box, Container } from '@mui/material'
import { FONCTIONNEMENT_SITE } from '../../utils/mentions-legale'
import TitleSectionText from '../../components/texts/TitleSectionText'

const FonctionalsPage = () => {
  return (
    <Container>
      <Stack my={5}>
        <Stack spacing={3}>
            <TitleSectionText startText='Fonctionnement' endText='du site' />
          <Box dangerouslySetInnerHTML={{ __html: FONCTIONNEMENT_SITE }} />
        </Stack>
      </Stack>
    </Container>
  )
}

export default FonctionalsPage

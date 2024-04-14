import { Stack, Box, Container } from '@mui/material'
import { CONDITIONS_GENERALES } from '../../utils/mentions-legale'
import TitleSectionText from '../../components/texts/TitleSectionText'

const ConditionsPage = () => {
  return (
    <Container>
      <Stack my={5}>
        <Stack spacing={3}>
            <TitleSectionText endText="Conditions générales d'utilisation" />
            <Box dangerouslySetInnerHTML={{ __html: CONDITIONS_GENERALES }} />
        </Stack>
      </Stack>
    </Container>
  )
}

export default ConditionsPage

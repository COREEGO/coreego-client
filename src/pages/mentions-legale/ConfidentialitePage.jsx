import { Stack, Box, Container } from '@mui/material'
import { CONFIDENTIALITE } from '../../utils/mentions-legale'
import TitleSectionText from '../../components/texts/TitleSectionText'

const ConfidentialitePage = () => {
  return (
    <Container>
      <Stack my={5}>
        <Stack spacing={3}>
            <TitleSectionText endText='Confidentialité' />
          <Box dangerouslySetInnerHTML={{ __html: CONFIDENTIALITE }} />
        </Stack>
      </Stack>
    </Container>
  )
}

export default ConfidentialitePage

import { Stack, Box, Container } from '@mui/material'
import { CONFIDENTIALITE } from '../../utils/mentions-legale'
import TitleSectionText from '../../components/texts/TitleSectionText'
import { Helmet } from "react-helmet";

const ConfidentialitePage = () => {
  return (
    <>
    <Helmet>
				<title>Confidentialité | Coreego</title>
			</Helmet>
    <Container>
      <Stack my={5}>
        <Stack spacing={3}>
            <TitleSectionText endText='Confidentialité' />
          <Box dangerouslySetInnerHTML={{ __html: CONFIDENTIALITE }} />
        </Stack>
      </Stack>
    </Container>
    </>
  )
}

export default ConfidentialitePage

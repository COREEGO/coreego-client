import { Stack, Box, Container } from '@mui/material'
import DashboardNavigation from '../../components/navigation/DashboardNavigation'

const DashboardLayout = ({ children }) => {
  return (
    <Stack direction='row' alignItems="flex-start">
      <DashboardNavigation />
      <Box my={5} sx={{flex: 1}}>
        <Container>{children}</Container>
      </Box>
    </Stack>
  )
}

export default DashboardLayout

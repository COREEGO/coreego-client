import { Box, Stack } from '@mui/material'
import StarsFilterInput from './inputs/StarsFilterInput'
import React from 'react'
import ClearFilterButton from '../../../components/buttons/ClearFilterButton'
import OrderByDateFilterInput from './inputs/OrderByDateFilterInput'
import SearchFilterInput from './inputs/SearchFilterInput'

const ReviewsFilter = () => {
  return (
    <React.Fragment>
      <Stack
        direction='row'
        gap={2}
        flexWrap='wrap'
			>
        <SearchFilterInput />
        <OrderByDateFilterInput />
        <StarsFilterInput />
        <Box mt={1.5}>
          <ClearFilterButton />
        </Box>
      </Stack>
    </React.Fragment>
  )
}

export default ReviewsFilter

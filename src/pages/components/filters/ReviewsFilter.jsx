import { Box, Stack } from '@mui/material'
import StarsFilterInput from './inputs/StarsFilterInput'
import React from 'react'
import ClearFilterButton from './inputs/ClearFilterButton'
import OrderByDateFilterInput from './inputs/OrderByDateFilterInput'
import SearchFilterInput from './inputs/SearchFilterInput'

const ReviewsFilter = () => {
  return (
    <React.Fragment>
      <Stack direction='row' gap={2} flexWrap='wrap' alignItems="flex-start">
        <ClearFilterButton />
        <SearchFilterInput />
        <OrderByDateFilterInput />
        <StarsFilterInput />
      </Stack>
    </React.Fragment>
  )
}

export default ReviewsFilter

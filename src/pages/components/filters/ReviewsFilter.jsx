import { Stack } from '@mui/material'
import ClearFilterButton from './inputs-rework/ClearFilterButton'
import SearchFilterRework from './inputs-rework/SearchFilerRework'
import OrderByDateFilterRework from './inputs-rework/OrderByDateFilterRework'
import StarsFilterRework from './inputs-rework/StarsFilterRework'

const ReviewsFilter = () => {
  return (
    <Stack py={1} borderTop="1px solid black" borderBottom="1px solid black" direction="row" gap={1} flexWrap="wrap">
        <SearchFilterRework />
        <OrderByDateFilterRework />
        <StarsFilterRework />
        <ClearFilterButton />
    </Stack>
  )
}

export default ReviewsFilter

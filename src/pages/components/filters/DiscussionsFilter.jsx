import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import ClearFilterButton from './inputs-rework/ClearFilterButton'
import SearchFilterRework from './inputs-rework/SearchFilerRework'
import CategoryFilterRework from './inputs-rework/CategoryFilterRework'

const DiscussionsFilter = () => {

  const { discussionCategories } = useSelector((state) => state.app)

  return (
    <Stack
      py={1}
      borderTop='1px solid black'
      borderBottom='1px solid black'
      direction='row'
      gap={1}
      flexWrap='wrap'
		>
      <SearchFilterRework />
      <CategoryFilterRework categories={discussionCategories} />
      <ClearFilterButton />
    </Stack>
  )
}

export default DiscussionsFilter

import ClearFilterButton from './inputs-rework/ClearFilterButton'
import SearchFilterRework from './inputs-rework/SearchFilerRework'
import CategoryFilterRework from './inputs-rework/CategoryFilterRework'
import LocalisationFilterRework from './inputs-rework/LocalisationFilterRework'
import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'

const TravelLogueFilter = () => {
  const { placeCategories } = useSelector((state) => state.app)

  return (
    <Stack
      flexWrap='wrap'
      gap={1}
      py={1}
      borderTop='1px solid black'
      borderBottom='1px solid black'
      direction='row'
		>
      <SearchFilterRework />
      <CategoryFilterRework categories={placeCategories} />
      <LocalisationFilterRework />
      <ClearFilterButton />
    </Stack>
  )
}

export default TravelLogueFilter

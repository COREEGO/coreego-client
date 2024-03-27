import React from 'react'
import { useFilterContext } from '../../../contexts/FilterProvider'
import SearchFilterInput from './inputs/SearchFilterInput'
import OrderByDateFilterInput from './inputs/OrderByDateFilterInput'
import { Box, Stack } from '@mui/material'
import ClearFilterButton from './inputs/ClearFilterButton'

const CommentsFilter = ({ showModal = true }) => {
  const [isOpenFilterModal, setIsOpenFilterModal] =
		React.useState(false)

  return (
    <React.Fragment>
      <Stack
        direction='row'
        alignItems='flex-start'
        gap={2}
        flexWrap='wrap'
			>
        <ClearFilterButton />
        <SearchFilterInput />
        <OrderByDateFilterInput />
      </Stack>
    </React.Fragment>
  )
}

export default CommentsFilter

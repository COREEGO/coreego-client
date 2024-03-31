import { MenuItem, Menu, Button } from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import React from 'react'
import { FILTER_ICON } from '../../../../utils/icon'

const OrderByDateFilterRework = ({ ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState()

  const { updateFilter, searchParams } = useFilterContext()

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        startIcon={<FILTER_ICON />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
			>
        {searchParams.get('orderbydate')
					? searchParams.get('orderbydate') == 'desc'
						? 'Du plus résent'
						: 'Du plus ancient'
					: 'Du plus résent'}
      </Button>
      <Menu
        onClick={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
			>
        <MenuItem
          value='desc'
          onClick={() => updateFilter('orderbydate', 'desc')}
          selected={
						searchParams.get('orderbydate') == 'desc' ||
						!searchParams.get('orderbydate')
					}
				>
					Du plus résent
				</MenuItem>
        <MenuItem
          value='asc'
          onClick={() => updateFilter('orderbydate', 'asc')}
          selected={searchParams.get('orderbydate') == 'asc'}
				>
					Du plus ancient
				</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default OrderByDateFilterRework

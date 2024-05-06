import { MenuItem, Menu, Button } from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import React from 'react'
import { FILTER_ICON } from '../../../../utils/icon'

const OrderByDateFilterRework = ({ ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState()

  const { updateFilter, searchParam } = useFilterContext()

  return (
    <React.Fragment>
      <Button
        variant='outlined'
        startIcon={<FILTER_ICON />}
        onClick={(event) => setAnchorEl(event.currentTarget)}
			>
        {searchParam.get('orderbydate')
					? searchParam.get('orderbydate') == 'desc'
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
						searchParam.get('orderbydate') == 'desc' ||
						!searchParam.get('orderbydate')
					}
				>
					Du plus résent
				</MenuItem>
        <MenuItem
          value='asc'
          onClick={() => updateFilter('orderbydate', 'asc')}
          selected={searchParam.get('orderbydate') == 'asc'}
				>
					Du plus ancient
				</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default OrderByDateFilterRework

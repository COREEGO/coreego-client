import { Button, IconButton, Tooltip } from '@mui/material'
import { CLOSE_ICON, FILTER_OFF_ICON } from '../../../../utils/icon'
import { useFilterContext } from '../../../../contexts/FilterProvider'

const ClearFilterButton = ({ ...props }) => {
  const { clearFilters } = useFilterContext()

  return (
    <Tooltip title='reset filtres'>
      <IconButton
        {...props}
        size='small'
        sx={{ border: '2px solid grey' }}
        onClick={() => clearFilters()}
			>
        <FILTER_OFF_ICON />
      </IconButton>
    </Tooltip>
  )
}

export default ClearFilterButton

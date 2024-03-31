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
        onClick={() => clearFilters()}
			>
        <FILTER_OFF_ICON sx={{color: 'black'}} />
      </IconButton>
    </Tooltip>
  )
}

export default ClearFilterButton

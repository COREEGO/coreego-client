import { Button } from '@mui/material'
import { CLOSE_ICON } from '../../utils/icon'
import { useFilterContext } from '../../contexts/FilterProvider'

const ClearFilterButton = ({ ...props }) => {
  const { clearFilters } = useFilterContext()

  return (
    <Button
      {...props}
      onClick={() => clearFilters()}
      variant='outlined'
      startIcon={<CLOSE_ICON />}
		>
			clear
		</Button>
  )
}

export default ClearFilterButton

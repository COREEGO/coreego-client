import {
	TextField,
	MenuItem,
	ListItemIcon,
	Typography
} from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import { STAR_ICON } from '../../../../utils/icon'

const StarsFilterInput = ({ ...props }) => {
  const { updateFilter, searchParams } = useFilterContext()

  return (
    <TextField
      {...props}
      value={searchParams.get('stars') || '0'}
      onChange={(event) =>
				updateFilter('stars', event.target.value.toString())
			}
      select
		>
      <MenuItem value='0'>Toutes les notes</MenuItem>
      {Array.from({ length: 5 }, (_, index) => index + 1).map(
				(value) => (
  <MenuItem key={value} value={value}>
    <ListItemIcon>
      <STAR_ICON sx={{ color: 'orange' }} />
    </ListItemIcon>
    {value}
  </MenuItem>
				)
			)}
    </TextField>
  )
}

export default StarsFilterInput

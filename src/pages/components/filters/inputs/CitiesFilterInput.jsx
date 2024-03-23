import { MenuItem, Select, TextField } from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import { useSelector } from 'react-redux'

const CitiesFilterInput = ({ ...props }) => {
  const { placeCategories, cities } = useSelector(
		(state) => state.app
	)
  const { updateFilter, searchParams } = useFilterContext()

  return (
    <TextField
      {...props}
      placeholder='Villes'
      select
      value={searchParams.get('city') || '0'}
      onChange={(city) =>
				updateFilter('city', city.target.value.toString())
			}
		>
      <MenuItem value='0'> Toutes les villes </MenuItem>
      {cities.map((city) => {
        return (
          <MenuItem key={city.id} value={city.id}>
            {city.label}
          </MenuItem>
        )
      })}
    </TextField>
  )
}

export default CitiesFilterInput

import { ListItemIcon, MenuItem, TextField } from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import { CIRCLE_ICON } from '../../../../utils/icon'

const CategoriesFilterInput = ({ categories, ...props }) => {
  const { updateFilter, searchParams } = useFilterContext()

  return (
    <TextField
      {...props}
      value={searchParams.get('category') || '0'}
      onChange={(value) =>
				updateFilter('category', value.target.value.toString())
			}
      select
		>
      <MenuItem value='0'>Toutes les catégories</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.id}>
           <ListItemIcon>
              <CIRCLE_ICON color={category.color} />
           </ListItemIcon>
          {category.label}
        </MenuItem>
			))}
    </TextField>
  )
}

export default CategoriesFilterInput

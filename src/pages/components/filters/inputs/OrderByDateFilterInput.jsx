import { MenuItem, TextField } from "@mui/material"
import { useFilterContext } from "../../../../contexts/FilterProvider"



const OrderByDateFilterInput = ({...props}) => {
    const { updateFilter, searchParams } = useFilterContext()

    return (
      <TextField
        {...props}
        value={searchParams.get('orderbydate') || 'desc'}
        onChange={(value) =>
                  updateFilter('orderbydate', value.target.value.toString())
              }
        select
        >
         <MenuItem value="desc">
            Du plus résent
          </MenuItem>
         <MenuItem value="asc">
            Du plus ancient
          </MenuItem>
      </TextField>
    )
}

export default OrderByDateFilterInput
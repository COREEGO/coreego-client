import React from 'react'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import {
	Box,
	Button,
	FormGroup,
	FormLabel,
	IconButton,
	InputAdornment,
	Slider,
	Stack,
	TextField,
	Typography
} from '@mui/material'
import { CHECKED_ICON, CHECK_ICON, SEARCH_ICON } from '../../../../utils/icon'

const PriceFilterInput = ({ rangeValue }) => {
  const { updateFilter, searchParams } = useFilterContext()

  const [minPrice, setMinPrice] = React.useState(
		searchParams.get('min_price') || rangeValue[0]
	)
  const [maxPrice, setMaxPrice] = React.useState(
		searchParams.get('max_price') || rangeValue[1]
	)

  const handleSubmit = (e) => {
    e.preventDefault()
    const element = e.target

    updateFilter('min_price', element.min_price.value.toString())
    updateFilter('max_price', element.max_price.value.toString())
  }

  React.useEffect(() => {
    setMinPrice(searchParams.get('min_price') || rangeValue[0])
    setMaxPrice(searchParams.get('max_price') || rangeValue[1])
  }, [searchParams.get('min_price'), searchParams.get('max_price')])

  return (
    <Stack
      sx={{ width: '100%' }}
      direction='row'
      component='form'
      alignItems='flex-start'
      onSubmit={handleSubmit}
		>
      <Box flex={1}>
        <TextField
          fullWidth
          type='number'
          name='min_price'
          onChange={(event) => setMinPrice(event.target.value)}
          value={minPrice}
          helperText='Min (₩)'
				/>
      </Box>
      <Box flex={1}>
        <TextField
          fullWidth
          name='max_price'
          type='number'
          onChange={(event) => setMaxPrice(event.target.value)}
          value={maxPrice}
          helperText='Max (₩)'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  type='submit'
                  aria-label='button valider'
                  edge='end'
								>
                  <CHECK_ICON />
                </IconButton>
              </InputAdornment>
						)
          }}
				/>
      </Box>
    </Stack>
  )
}

export default PriceFilterInput

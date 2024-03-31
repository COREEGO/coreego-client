import React from 'react'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import { Box, Button, Menu, Stack, TextField, Typography } from '@mui/material'
import { PRICE_ICON } from '../../../../utils/icon'

const PriceFilterRework = ({ min, max }) => {
  const { updateFilter, searchParams } = useFilterContext()
  const [anchorEl, setAnchorEl] = React.useState(null)

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{textTransform: 'inherit'}}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        startIcon={<PRICE_ICON />}
			>
				Min: {searchParams.get('min_price') || min + ' ₩' } - Max:{' '}
        {searchParams.get('max_price') || max + ' ₩' }
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
			>
        <Box p={1} component="form" direction="row" onSubmit={(e) => {
            e.preventDefault()
            const element = e.target
            updateFilter('min_price', element.min_price.value.toString() )
            updateFilter('max_price', element.max_price.value.toString() )
            setAnchorEl(null)
          }}>
          <Typography fontWeight='bold'>Prix en won</Typography>
          <Stack direction="row">
            <TextField
                defaultValue={searchParams.get('min_price') || min}
                name="min_price"
                label="min"
                type="number"
                margin='normal'
            />
            <TextField
                defaultValue={searchParams.get('max_price') || max}
                name="max_price"
                label="max"
                type="number"
                margin='normal'
            />
          </Stack>
          <Button fullWidth type="submit" variant='contained'>Valider</Button>
        </Box>
      </Menu>
    </React.Fragment>
  )
}

export default PriceFilterRework

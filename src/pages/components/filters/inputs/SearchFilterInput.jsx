import { Box, TextField } from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import React, { useEffect, useState } from 'react'
import { SEARCH_ICON } from '../../../../utils/icon'

const SearchFilterInput = ({ ...props }) => {
  const { updateFilter, searchParams } = useFilterContext()

  function handleSubmit (e) {
    e.preventDefault()
    const element =  e.target
    updateFilter('q', element.q.value)
  }

  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(searchParams.get('q') || '')
  }, [searchParams.get('q')])

  return (
    <Box
      width={props.fullWidth ? '100%' : 'auto'}
      component='form'
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        value={value}
        placeholder='Rechercher...'
        id='q'
        name='q'
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          startAdornment: (
            <SEARCH_ICON
              sx={{ color: 'var(--coreego-blue)', mr: 2 }}
            />
          )
        }}
      />
    </Box>
  )
}

export default SearchFilterInput

import { useFilterContext } from "../../../contexts/FilterProvider";

import { InputBase, Paper, IconButton, Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'
import MenuIcon from '@mui/icons-material/Menu'

export default function SearchFilter() {

  const { updateFilter } = useFilterContext()


  const handleSubmit = (e: any) => {
    e.preventDefault()
    const element = e.target.elements
    updateFilter('q', element.search.value)
  }

  return (

    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <TextField
        InputProps={{
          startAdornment: <SearchIcon sx={{color: 'var(--coreego-blue)',  mr: 1 }} />,
        }}
        sx={{
          width: '100%', background: 'white',
          borderRadius: 1
        }}
        type="search"
        id="search"
        placeholder="Recherchez..."
        inputProps={{ 'aria-label': 'search google maps' }}
      />
    </Box>

  )

}
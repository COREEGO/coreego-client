import { Box, Button,  Divider,  Input, InputGroup, InputRightAddon, InputRightElement, Stack } from "@chakra-ui/react";
import { useFilterContext } from "../../../contexts/FilterProvider";

import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search'
import DirectionsIcon from '@mui/icons-material/Directions'
import MenuIcon from '@mui/icons-material/Menu'

export default function SearchFilter() {

    const { updateFilter, searchParams } = useFilterContext()


    const handleSubmit = (e: any) => {
        e.preventDefault()
        const element = e.target.elements
        updateFilter('q', element.search.value)
    }

    return (
        <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', flex: 1 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          type="search"
          id="search"
          placeholder="Recherchez..."
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon color="primary" />
        </IconButton>
      </Paper>
    )

}
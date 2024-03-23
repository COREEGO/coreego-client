import { Search as SearchIcon } from "@mui/icons-material";
import { TextField, Box } from "@mui/material";
import React from "react";
import { useFilterContext } from "../../contexts/FilterProvider";

const SearchInput = ({...props}) => {

  const [value, setValue] = React.useState(props.defaultValue)
  const { updateFilter, searchParams } = useFilterContext();


  function handleSubmit(e) {
    e.preventDefault();
    props.onChange(value);
  }

  return (
    <Box width={props.fullWidth ? '100%' : 'auto' } component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        onInput={event => setValue(event.target.value)}
        value={value}
        placeholder="Rechercher..."
        id="q"
        name="q"
        InputProps={{
          startAdornment: (
            <SearchIcon sx={{ color: "var(--coreego-blue)", mr: 2 }} />
          ),
        }}
      />
    </Box>
  );
};

export default SearchInput;

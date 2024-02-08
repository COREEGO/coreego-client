import { Search as SearchIcon } from "@mui/icons-material";
import { TextField, Box } from "@mui/material";

const SearchInput = ({...props}) => {
  function handleSubmit(e) {
    e.preventDefault();
    const element = e.target.elements;
    props.onChange(element.q.value);
  }

  return (
    <Box width={props.fullWidth ? '100%' : 'auto' } component="form" onSubmit={handleSubmit}>
      <TextField
      {...props}
        sx={{backgroundColor: 'white'}}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
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

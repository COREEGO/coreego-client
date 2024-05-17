import { Button, Dialog, IconButton, TextField } from "@mui/material";
import React from "react";
import { useFilterContext } from "../../../../contexts/FilterProvider";
import { SEARCH_ICON } from "../../../../utils/icon";

const SearchFilterRework = () => {
	const { updateFilter, searchParam } = useFilterContext();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');

    React.useEffect(() => {
        setValue(searchParam.get('q') || '')
    }, [searchParam.get('q')])

	return (
		<>
			<Button
				data-testid="button-search"
				onClick={() => setOpen(true)}
				startIcon={<SEARCH_ICON />}
			>
				{searchParam.get("q") || ' '}
			</Button>
			<Dialog
				data-testid="dialog-search"
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				PaperProps={{
					component: "form",
					onSubmit: (e) => {
						e.preventDefault();
						const element = e.target;
						updateFilter("q", element.q.value);
                        setOpen(false)
					}
				}}
			>
				<TextField
					data-testid="input-search"
					fullWidth
					value={value}
                    type="search"
					placeholder="Rechercher..."
					id="q"
					name="q"
					onChange={(e) => setValue(e.target.value)}
					InputProps={{
						startAdornment: (
							<SEARCH_ICON
								sx={{ color: "var(--coreego-blue)", mr: 2 }}
							/>
						)
					}}
				/>
			</Dialog>
		</>
	);
};

export default SearchFilterRework;

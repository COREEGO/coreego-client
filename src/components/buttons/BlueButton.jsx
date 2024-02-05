import { Button } from "@mui/material";

export const BlueButton = (props) => {
	return (
		<Button
			{...props}
			sx={{
				"&:hover": {
					backgroundColor: "var(--coreego-blue-light)"
				},
				bgcolor: "var(--coreego-blue)",
				color: "white"
			}}
			variant="contained"
		>
			{props.children}
		</Button>
	);
};

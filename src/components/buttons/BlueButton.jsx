import { Button } from "@mui/material";

export const BlueButton = (props) => {
	return (
		<Button
			{...props}
			sx={{
				"&:hover": {
					backgroundColor: `var(--coreego-blue-${props.variant == 'contained' ? 'dark' : 'light'})` ,
					borderColor: "var(--coreego-blue)",
					color: props.variant == 'contained' ? "white" : "var(--coreego-blue)"
				},
				bgcolor: props.variant == 'contained' ?   "var(--coreego-blue)" : "transparent" ,
				borderColor: "var(--coreego-blue)",
				color: props.variant == 'contained' ? "white" : "var(--coreego-blue)",
			}}
		>
			{props.children}
		</Button>
	);
};

import { Button } from "@mui/material";

const RedButton = (props) => {



	return (
		<Button
			{...props}
			sx={{
				"&:hover": {
					backgroundColor: "var(--coreego-red-light)",
					borderColor: "var(--coreego-red)",
					color: "white"
				},
				bgcolor: props.variant == 'contained' ?   "var(--coreego-red)" : "transparent" ,
				borderColor: "var(--coreego-red)",
				color: props.variant == 'contained' ? "white" : "var(--coreego-red)",
			}}
		>
			{props.children}
		</Button>
	);
};

export default RedButton

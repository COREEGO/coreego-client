import {
	Box,
	IconButton,
	InputAdornment,
	TextField
} from "@mui/material";
import { ADD_ICON, MOIN_ICON } from "../../utils/icon";
import React, { useEffect } from "react";

const InputTextArray = ({ value, onchange }) => {
	const [inputs, setInputs] = React.useState(() => {
		if (Array.isArray(value)) {
			return value;
		} else {
			return JSON.parse(value);
		}
	}); // State pour stocker les valeurs des champs d'entrée

	useEffect(() => {
		onchange(inputs);
	}, [inputs]);


	// Fonction pour ajouter un nouveau champ d'entrée

	// Fonction pour mettre à jour la valeur d'un champ d'entrée
	const handleInputChange = (index, event) => {
		const newInputs = [...inputs];
		newInputs[index] = event.target.value;
		setInputs(newInputs);
	};

	const removeInput = (index) => {
		const newInputs = [...inputs];
		newInputs.splice(index, 1);
		setInputs(newInputs);
	};

	const handleKeyDown = (event, index) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setInputs([...inputs, ""]);
		}
	};

	return (
		<Box>
			{inputs.map((input, index) => (
				<TextField
					type="text"
					key={index}
					value={input}
					onKeyDown={(event) => handleKeyDown(event, index)}
					onChange={(event) => handleInputChange(index, event)}
					fullWidth
					label={`Argument ${index + 1}`}
					margin="normal"
					InputProps={{
						endAdornment: (
							<>
								{inputs.length > 1 && (
									<InputAdornment position="end">
										<IconButton onClick={() => removeInput(index)}>
											<MOIN_ICON />
										</IconButton>
									</InputAdornment>
								)}
							</>
						)
					}}
				/>
			))}

			<IconButton
				onClick={() => setInputs([...inputs, ""])}
				aria-label="Add"
			>
				<ADD_ICON />
			</IconButton>
		</Box>
	);
};

export default InputTextArray;

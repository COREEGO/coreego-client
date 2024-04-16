import { useAuthContext } from "../../contexts/AuthProvider";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	SAVED_PLACE_ICON,
	UNSAVED_PLACE_ICON
} from "../../utils/icon";
import { useNavigate } from "react-router";
import axios from "axios";
import { BEARER_HEADERS } from "../../utils/variables";

const SavePlaceButton = ({
	placeId,
	users,
	mutate
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const { auth } = useAuthContext();

	const navigate = useNavigate();

	const existPlace = React.useMemo(() => {
		return users?.includes(auth?.id);
	}, [users, placeId]);

	const handleClick = async () => {
		try {
			setIsBusy(true);
			await axios.post('/save-place', {
				place_id: placeId
			}, BEARER_HEADERS)
				mutate();
		} catch (error) {
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<LoadingButton
			loading={isBusy}
			variant="outlined"
			color="success"
			sx={{ widht: "fit-content" }}
			onClick={auth ? handleClick : () => navigate("/login")}
		>
			{existPlace ? <SAVED_PLACE_ICON /> : <UNSAVED_PLACE_ICON />}
		</LoadingButton>
	);
};

export default SavePlaceButton;

import {
	IconButton,
	Menu,
	TextField,
	Typography,
	Box,
} from "@mui/material";
import { REPORT_ICON } from "../../../utils/icon";
import React from "react";
import { useForm } from "react-hook-form";
import {
	errorField,
	validationReport
} from "../../../utils/formValidation";
import { vestResolver } from "@hookform/resolvers/vest";
import { getViolationField } from "../../../utils";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { BEARER_HEADERS } from "../../../utils/variables";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../contexts/AuthProvider";

const ReportModule = ({
	placeholder = "En quoi ce sujet ne convient pas ?",
  targetElement,
  targetValue
}) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const {user} = useAuthContext()

	const {
		register,
		setError,
		handleSubmit,
    reset,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onSubmit",
		resolver: vestResolver(validationReport)
	});

	const onSubmitReport = async (data) => {
    try{
      const response = await axios.post('/reports', {
        content: data.content,
        [targetElement] : targetValue
      }, BEARER_HEADERS)
      toast.success(response.data.message)
      setAnchorEl(null)
      reset();
    }catch(error){
      toast.error(error?.data?.message)
      getViolationField(error, setError)
    }
  };

	return user ? (
		<React.Fragment>
			<IconButton onClick={event => setAnchorEl(event.currentTarget)}>
				<REPORT_ICON />
			</IconButton>
			<Menu
      variant="menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      >
					<Box p={1}>
						<Typography
							gutterBottom
							textTransform="uppercase"
							variant="body2"
						>
							Raison du signalement
						</Typography>
						<Box
							maxWidth={212}
							component="form"
							onSubmit={handleSubmit(onSubmitReport)}
						>
							<TextField
								{...register("content")}
								{...errorField(errors?.content)}
								multiline
								rows={3}
								placeholder={placeholder}
							/>
							<Box mt={2}>
								<LoadingButton loading={isSubmitting} type="submit" variant="contained">
									Envoyer
								</LoadingButton>
							</Box>
						</Box>
					</Box>
			</Menu>
		</React.Fragment>
	) : <></>;
};

export default ReportModule;

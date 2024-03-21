import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import TitleText from "../texts/TitleText";
import { BEARER_HEADERS, IMAGE_PATH } from "../../utils/variables";
import {
	errorField,
	maxLengthValidator,
	noEmptyValidator,
	notEmptyQuillEditor,
	requiredValidator,
	validationDiscussion
} from "../../utils/formValidation";
import useFile from "../../hooks/useFile";
import { apiFetch } from "../../http-common/apiFetch";
import React, { useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

import {
	Box,
	Button,
	Container,
	Divider,
	FormControl,
	FormHelperText,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import { useAuthContext } from "../../contexts/AuthProvider";
import useMalware from "../../hooks/useMalware";
import ReactQuillInput from "../inputs/ReactQuillInput";
import TitleSectionText from "../texts/TitleSectionText";
import axios from "axios";
import { discussionStep, getViolationField } from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";

import { FormLabel } from "@mui/material";
import StepperForm from "./_StepperForm";

const DiscussionForm = ({
	isEditMode = false,
	discussion = null
}) => {
	const [activeStep, setActiveStep] = React.useState(0);

	const navigate = useNavigate();
	const { user } = useAuthContext();

	useEffect(() => {
		if (isEditMode) {
			if (discussion.user.id !== user.id && !user.role.is_admin) {
				navigate("/");
			}
		}
	}, []);

	const { discussionCategories } = useSelector((state) => state.app);

	const {
		control,
		register,
		getValues,
		setValue,
		setError,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onBlur",
		resolver: vestResolver(validationDiscussion),
		defaultValues: {
			title: discussion?.title,
			content: discussion?.content,
			category_id: discussion?.category?.id || ""
		}
	});

	const onSubmitForm = async (data) => {
		try {
			const response = !isEditMode
				? await axios.post("/discussions", data, BEARER_HEADERS)
				: await axios.put(
						`/discussions/edit/${discussion.id}`,
						data,
						BEARER_HEADERS
				  );

			toast.success(response.data.message);
			navigate(`/forum/discussion/${response.data.data.slug}`);
		} catch (error) {
			toast.error(error?.response?.data?.message);
			getViolationField(error, setError);
		}
	};

	return (
		<Container>
			<Stack spacing={5} my={5} width="100%">
				<TitleSectionText
					variant="h5"
					alignSelf="center"
					startText={isEditMode ? "Modifier une" : "Nouvelle"}
					endText="discussion"
				/>

				<StepperForm
					steps={discussionStep}
					errors={errors}
					setActiveStep={(index) => setActiveStep(index)}
					activeStep={activeStep}
				/>

				<Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
					{activeStep === 0 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="title" sx={{ mb: 3 }}>
								De quoi parlera votre discussion ?
							</FormLabel>
							<TextField
								id="title"
								{...register("title")}
								{...errorField(errors?.title)}
								required
								fullWidth
								placeholder="Titre de ma discussion"
								InputProps={{
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{watch("title")?.length || 0}/{100}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 100
									}
								}}
							/>
						</FormControl>
					)}
					{activeStep === 1 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="category" sx={{ mb: 3 }}>
								Dans quelle catégorie se place cette discussion ?
							</FormLabel>
							<Controller
								control={control}
								name="category_id"
								render={({ field }) => (
									<TextField
										{...field}
										label="Choisir une catégorie"
										{...errorField(errors?.category_id)}
										select
									>
										{discussionCategories.map((category) => (
											<MenuItem key={category.id} value={category.id}>
												{category.label}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</FormControl>
					)}
					{activeStep === 2 && (
						<>
							<FormControl fullWidth>
								<FormLabel htmlFor="content" sx={{ mb: 3 }}>
									Que voulez vous dire ?
								</FormLabel>
								<Controller
									control={control}
									name="content"
									render={({ field: {value, onChange} }) => (
										<ReactQuillInput
											value={value}
											onChange={onChange}
										/>
									)}
								/>
								{Boolean(errors?.content) && (
									<FormHelperText>
										{errors?.content?.message}
									</FormHelperText>
								)}
							</FormControl>
							<Stack alignItems="flex-end" mt={3}>
								<LoadingButton
									sx={{ width: "fit-content" }}
									type="submit"
									loading={isSubmitting}
									variant="contained"
								>
									enregistrer
								</LoadingButton>
							</Stack>
						</>
					)}
				</Box>
			</Stack>
		</Container>
	);
};

export default DiscussionForm;

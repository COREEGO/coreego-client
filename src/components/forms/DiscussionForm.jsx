import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BEARER_HEADERS, TOKEN } from "../../utils/variables";
import {
	errorField,
	validationDiscussion
} from "../../utils/formValidation";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	Box,
	Container,
	FormControl,
	FormHelperText,
	InputAdornment,
	MenuItem,
	Stack,
	TextField
} from "@mui/material";
import { useAuthContext } from "../../contexts/AuthProvider";
import ReactQuillInput from "../inputs/ReactQuillInput";
import TitleSectionText from "../texts/TitleSectionText";
import axios from "axios";
import { discussionStep, getViolationField, handlePreventDefault } from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";

import { FormLabel } from "@mui/material";
import StepperForm from "./_StepperForm";

const DiscussionForm = ({
	isEditMode = false,
	discussion = null
}) => {
	const [activeStep, setActiveStep] = React.useState(0);

	const navigate = useNavigate();
	const { auth } = useAuthContext();

	React.useEffect(() => {
		if (isEditMode) {
			if (discussion.user.id !== auth.id && !auth.role.is_admin) {
				navigate("/");
			}
		}
	}, []);

	const { discussionCategories } = useSelector((state) => state.app);

	const {
		control,
		register,
		setError,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
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
				? await axios.post("/discussions", data, {
						headers: {
							Authorization: `Bearer ${TOKEN}`
						}
				  })
				: await axios.put(
						`/discussions/edit/${discussion.id}`,
						data,
						BEARER_HEADERS
				  );
			navigate(`/forum/discussion/${response.data.data.slug}`);
		} catch (error) {
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
								onKeyDown={(event) => handlePreventDefault(event)}
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
									render={({ field: { value, onChange } }) => (
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

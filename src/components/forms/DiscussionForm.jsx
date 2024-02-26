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
import { useEffect } from "react";
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
import { getViolationField } from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";

const DiscussionForm = ({
	isEditMode = false,
	discussion = null
}) => {
	const navigate = useNavigate();
	const params = useParams();
	const { user } = useAuthContext();
	const { owner } = useMalware();

	useEffect(() => {
		if (isEditMode) owner(discussion?.user?.id);
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
			content: discussion?.content
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
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						variant="h5"
						alignSelf="center"
						startText={isEditMode ? "Modifier une" : "Nouvelle"}
						endText="discussion"
					/>
					<Stack
						spacing={3}
						component="form"
						onSubmit={handleSubmit(onSubmitForm)}
					>
						<TextField
							{...register("title")}
							{...errorField(errors?.title)}
							required
							fullWidth
							placeholder="Titre de ma discussion"
							label="De quoi parlera ma discussion ?"
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
						<FormControl error={Boolean(errors?.category_id)}>
							<InputLabel>Catégorie de la discussion</InputLabel>
							<Select
								{...register("category_id")}
								label="Catégorie de la discussion"
								defaultValue={discussion?.category?.id}
							>
								<MenuItem value="">-------</MenuItem>
								{discussionCategories.map((category) => (
									<MenuItem key={category.id} value={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
							{(Boolean(errors?.city_id) ||
								Boolean(errors?.district_id)) && (
								<FormHelperText>
									{errors?.city_id?.message ||
										errors?.district_id?.message}
								</FormHelperText>
							)}
						</FormControl>
						<FormControl>
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
							{errors.content && (
								<FormHelperText>
									{errors.content.message}
								</FormHelperText>
							)}
						</FormControl>
						<Box>
							<LoadingButton
								type="submit"
								loading={isSubmitting}
								variant="contained"
							>
								{isEditMode ? "Modifier ce sujet" : " Créer ce sujet"}
							</LoadingButton>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Container>
		// <Box my={3}>
		// 	<Container maxWidth="lg">
		// 		<Stack spacing={5}>
		// 			<TitleSectionText
		// 				variant="h4"
		// 				startText={isEditMode ? 'Modifier un' : 'Nouveau' }
		// 				endText="sujet"
		// 			/>
		// 			<Stack
		// 				spacing={3}
		// 				component="form"
		// 				onSubmit={handleSubmit(onSubmitForm)}
		// 			>

		// 			</Stack>
		// 		</Stack>
		// 	</Container>
		// </Box>
	);
};

export default DiscussionForm;

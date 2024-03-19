import { useNavigate, useParams } from "react-router";
import useFile from "../../hooks/useFile";
import { Controller, useForm } from "react-hook-form";
import {
	errorField,
	noEmptyLocalisationValidator,
	maxLengthValidator,
	noEmtyFileValidator,
	requiredValidator,
	validationProduct
} from "../../utils/formValidation";
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput";
import React, { useEffect } from "react";
import { apiFetch } from "../../http-common/apiFetch";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Box,
	Button,
	Container,
	Divider,
	FormControl,
	FormHelperText,
	InputAdornment,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import UpladButton from "../buttons/UplaodButton";
import FormImage from "../images/FormImage";
import { BEARER_HEADERS, IMAGE_PATH } from "../../utils/variables";
import {
	CAMERA_ICON,
	TRASH_ICON,
	UPLOAD_ICON
} from "../../utils/icon";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useMalware from "../../hooks/useMalware";
import TitleSectionText from "../texts/TitleSectionText";
import {
	createBlobImage,
	getBlobImage,
	getViolationField,
	isAdmin,
	productSteps
} from "../../utils";
import axios from "axios";
import { vestResolver } from "@hookform/resolvers/vest";
import { Stepper } from "@mui/material";
import { StepButton } from "@mui/material";
import { Step } from "@mui/material";
import { StepLabel } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardMedia } from "@mui/material";
import { IconButton } from "@mui/material";
import { CardHeader } from "@mui/material";
import PreviewImageCard from "../card/PreviewImageCard";
import { Input } from "@mui/material";
import StepperForm from "./_StepperForm";

const ProductForm = ({
	isEditMode = false,
	mutate = Function,
	product = null
}) => {
	const [activeStep, setActiveStep] = React.useState(0);

	const navigate = useNavigate();
	const { user } = useAuthContext();

	const { files, addFile, removeFile, deleteFile, clearFiles } =
		useFile(mutate);

	useEffect(() => {
		if (isEditMode) {
			if (product.user.id !== user.id && !user.role.is_admin) {
				navigate("/");
			}
		}
	}, []);

	const {
		control,
		register,
		handleSubmit,
		setValue,
		setError,
		getValues,
		watch,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onBlur",
		resolver: vestResolver(validationProduct),
		defaultValues: {
			title: product?.title,
			description: product?.description,
			city_id: product?.city.id,
			district_id: product?.district.id,
			price: product?.price || 1000,
			files: []
		}
	});

	const onSubmitForm = async (data) => {
		const url = isEditMode
			? `/products/edit/${product.id}`
			: "/products";

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("price", parseInt(data.price));
		formData.append("city_id", data.city_id);
		formData.append("district_id", data.district_id);

		if (data.files.length) {
			data.files.forEach((file, index) => {
				formData.append(`images[${index}]`, file);
			});
		}
		try {
			const response = await axios.post(
				url,
				formData,
				BEARER_HEADERS
			);
			toast.success(response.data.message);
			clearFiles();
			navigate(`/market-place/product/${response.data.data.slug}`);
		} catch (error) {
			toast.error(error?.response?.data?.message);
			getViolationField(error, setError);
		}
	};

	useEffect(() => {
		setValue("files", files);
	}, [files]);

	return (
		<Container>
			<Stack spacing={5} my={5} width="100%">
				<TitleSectionText
					variant="h5"
					alignSelf="center"
					startText={isEditMode ? "Modifier" : "Mettre en vente"}
					endText="un produit"
				/>

				<StepperForm
					steps={productSteps}
					errors={errors}
					setActiveStep={(index) => setActiveStep(index)}
					activeStep={activeStep}
				/>

				<Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
					{activeStep === 0 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="title" sx={{ mb: 3 }}>
								Quel article s'agit-il ?
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
						<>
							<FormControl
								fullWidth
								error={errors.files ? true : false}
							>
								<Controller
									control={control}
									name="files"
									render={() => (
										<Card>
											<CardContent>
												<UpladButton
													onChange={(e) => addFile(e.target.files)}
												>
													<Box
														sx={{
															border: "3px black dotted",
															textAlign: "center",
															py: 5
														}}
													>
														<UPLOAD_ICON sx={{ fontSize: 72 }} />
														<Typography>
															Ajouter des images
														</Typography>
													</Box>
												</UpladButton>
											</CardContent>
											<CardActions>
												{isEditMode && product?.images.length ? (
													<Stack gap={1}>
														<Typography
															component="div"
															fontWeight="bold"
														>
															Images du produit
														</Typography>
														<Stack
															spacing={2}
															direction="row"
															flexWrap="wrap"
														>
															{product.images.map((image, index) => {
																return (
																	<PreviewImageCard
																		key={index}
																		displayTrash={Boolean(
																			product?.images.length > 1
																		)}
																		imageUrl={IMAGE_PATH + image.name}
																		onRemove={() =>
																			deleteFile(image.id)
																		}
																	/>
																);
															})}
														</Stack>
													</Stack>
												) : (
													<></>
												)}
												{files.length ? (
													<Stack gap={1}>
														<Typography
															component="div"
															fontWeight="bold"
														>
															Preview images
														</Typography>
														<Stack
															spacing={2}
															direction="row"
															flexWrap="wrap"
														>
															{files.map((file, index) => {
																return (
																	<PreviewImageCard
																		key={index}
																		imageUrl={createBlobImage(file)}
																		onRemove={() => removeFile(index)}
																	/>
																);
															})}
														</Stack>
													</Stack>
												) : (
													<></>
												)}
											</CardActions>
										</Card>
									)}
								/>
								{errors.files ? (
									<FormHelperText>
										{errors.files.message}
									</FormHelperText>
								) : (
									<></>
								)}
							</FormControl>
						</>
					)}
					{activeStep === 2 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="price" sx={{ mb: 3 }}>
								Quel est le prix de votre article ? (en won)
							</FormLabel>
							<TextField
								required
								{...register("price")}
								{...errorField(errors?.price)}
								onInput={(event) => {
									const value = event.target.value;
									if (value < 0) setValue("price", 0);
								}}
								fullWidth
								placeholder="Prix"
								id="price"
								InputProps={{
									type: "number",
									startAdornment: (
										<InputAdornment position="start">
											₩
										</InputAdornment>
									)
								}}
							/>
						</FormControl>
					)}
					{activeStep === 3 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="city_id" sx={{ mb: 3 }}>
								Dans quel ville et quartier se trouve la vente ?
							</FormLabel>
							<Controller
								control={control}
								name="city_id"
								render={() => (
									<CityDistrictSelectInput
										labelCity="Dans quelle ville ?"
										labelDistrict="Dans quel district ?"
										cityValue={product?.city?.id || ""}
										districtValue={product?.district?.id || ""}
										updateCity={(e) => setValue("city_id", e)}
										updateDistrict={(e) => setValue("district_id", e)}
										showMap={true}
									/>
								)}
							/>
							{(Boolean(errors?.city_id) ||
								Boolean(errors?.district_id)) && (
								<FormHelperText>
									{errors?.city_id?.message ||
										errors?.district_id?.message}
								</FormHelperText>
							)}
						</FormControl>
					)}
					{activeStep === 4 && (
						<>
							<FormControl fullWidth>
								<FormLabel htmlFor="city_id" sx={{ mb: 3 }}>
									Décrivez votre produit
								</FormLabel>
								<TextField
									{...register("description")}
									{...errorField(errors?.description)}
									label="Decrivez le produit"
									placeholder="Description"
									autoFocus
									required
									multiline
									rows={10}
									InputProps={{
										endAdornment: (
											<InputAdornment
												className="string_count"
												position="end"
											>
												{watch("description")?.length || 0}/{500}
											</InputAdornment>
										),
										inputProps: {
											maxLength: 500
										}
									}}
								/>
							</FormControl>
							<Stack alignItems="flex-end" mt={3}>
								<LoadingButton
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

export default ProductForm;

import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BEARER_HEADERS, IMAGE_PATH } from "../../utils/variables";
import {
	errorField,
	validationCreatePlace,
	validationUpdatePlace
} from "../../utils/formValidation";
import UpladButton from "../buttons/UplaodButton";
import useFile from "../../hooks/useFile";
import { UPLOAD_ICON } from "../../utils/icon";
import React, { useEffect, useState } from "react";
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput";
import axios from "axios";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import {
	Box,
	Card,
	CardActions,
	CardContent,
	CircularProgress,
	Container,
	FormControl,
	FormHelperText,
	FormLabel,
	InputAdornment,
	MenuItem,
	Stack,
	TextField,
	Typography,
	debounce
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import TitleSectionText from "../texts/TitleSectionText";
import {
	createBlobImage,
	getViolationField,
	isKoreanAddress,
	placeStep
} from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";
import StepperForm from "./_StepperForm";
import PreviewImageCard from "../card/PreviewImageCard";
import InputTextArray from "../inputs/InputTextArray";

const PlaceForm = ({
	isEditMode = false,
	place = null,
	mutate = Function
}) => {
	const navigate = useNavigate();

	const [activeStep, setActiveStep] = React.useState(0);

	const [adressData, setAdressData] = useState([]);

	const {
		files,
		addFile,
		removeFile,
		deleteFile,
		clearFiles,
		isBusyFile
	} = useFile(mutate);

	const { placeCategories } = useSelector((state) => state.app);

	const {
		control,
		register,
		getValues,
		setValue,
		handleSubmit,
		watch,
		setError,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(
			isEditMode ? validationUpdatePlace : validationCreatePlace
		),
		defaultValues: {
			title: place?.title,
			city_id: place?.city.id || "",
			district_id: place?.district.id || "",
			category_id: place?.category.id || "",
			reasons_to_visit: place?.reasons_to_visit || [""],
			longitude: place?.longitude,
			latitude: place?.latitude,
			address: place?.address,
			images: []
		}
	});

	const onSubmitForm = async (data) => {
		const url = isEditMode ? `/places/edit/${place.id}` : "/places";

		const formData = new FormData();

		formData.append("title", data.title);
		formData.append(
			"reasons_to_visit",
			JSON.stringify(data.reasons_to_visit)
		);
		formData.append("longitude", data.longitude);
		formData.append("latitude", data.latitude);
		formData.append("city_id", data.city_id);
		formData.append("category_id", data.category_id);
		formData.append("district_id", data.district_id);
		formData.append("address", data.address);

		if (data.images.length) {
			data.images.forEach((file, index) => {
				formData.append(`images[${index}]`, file);
			});
		}

		try {
			const response = await axios.post(
				url,
				formData,
				BEARER_HEADERS
			);
			clearFiles();
			navigate(`/explorer/lieu/${response.data.data.slug}`);
		} catch (error) {
			getViolationField(error, setError);
		}
	};

	const handleSearchAdresse = debounce(async (event) => {
		const value = event?.target?.value || event;

		try {
			if (value.trim().length) {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?q=${value}&format=json&limit=1`
				);
				const data = await response.json();
				setAdressData(data);
				if (data.length && isKoreanAddress(data[0].display_name)) {
					setValue("address", data[0].display_name);
					setValue("longitude", data[0].lon);
					setValue("latitude", data[0].lat);
				} else {
					setError("address", {
						message: "Aucun lieu trouvé"
					});
					setValue("longitude", null);
					setValue("latitude", null);
				}
			} else {
				setValue("address", "");
				setValue("longitude", null);
				setValue("latitude", null);
			}
		} catch (error) {}
	}, 1000);

	useEffect(() => {
		setValue("images", files, { shouldValidate: true });
	}, [files]);

	return (
		<Container>
			<Stack spacing={5} my={5} width="100%">
				<TitleSectionText
					variant="h5"
					alignSelf="center"
					startText={isEditMode ? "Modifier" : "Partager"}
					endText={"un lieu"}
				/>

				<StepperForm
					steps={placeStep}
					errors={errors}
					setActiveStep={(index) => setActiveStep(index)}
					activeStep={activeStep}
				/>

				<Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
					{activeStep === 0 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="title" sx={{ mb: 3 }}>
								Donner un titre à votre lieu
							</FormLabel>
							<TextField
								id="title"
								{...register("title")}
								{...errorField(errors?.title)}
								required
								fullWidth
								placeholder="Titre de mon lieu"
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
								Dans quelle catégorie fait partie ce lieu ?
							</FormLabel>
							<Controller
								control={control}
								name="category_id"
								render={({ field: { value, onChange } }) => (
									<TextField
										value={value}
										onChange={onChange}
										{...errorField(errors?.category_id)}
										select
									>
										{placeCategories.map((category) => (
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
							<FormControl
								fullWidth
								error={errors.images ? true : false}
							>
								<Controller
									control={control}
									name="images"
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
												{isEditMode && place?.images.length ? (
													<Stack gap={1}>
														<Typography
															component="div"
															fontWeight="bold"
														>
															Images du lieu
														</Typography>
														<Stack
															spacing={2}
															direction="row"
															flexWrap="wrap"
														>
															{place.images.map((image, index) => {
																return (
																	<PreviewImageCard
																		key={index}
																		displayTrash={Boolean(
																			place?.images.length > 1
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
															{isBusyFile && <CircularProgress />}
														</Stack>
													</Stack>
												) : (
													<></>
												)}
											</CardActions>
										</Card>
									)}
								/>
								{Boolean(errors?.images) && (
									<FormHelperText>
										{errors?.images?.message}
									</FormHelperText>
								)}
							</FormControl>
						</>
					)}

					{activeStep === 3 && (
						<FormControl fullWidth>
							<FormLabel htmlFor="city_id" sx={{ mb: 3 }}>
								Dans quel ville et quartier se trouve ce lieu ?
							</FormLabel>
							<Controller
								control={control}
								name="city_id"
								render={() => (
									<CityDistrictSelectInput
										cityValue={place?.city?.id || watch("city_id")}
										districtValue={
											place?.district?.id || watch("district_id")
										}
										updateCity={(e) => setValue("city_id", e)}
										updateDistrict={(e) => setValue("district_id", e)}
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
						<FormControl fullWidth>
							<FormLabel htmlFor="address" sx={{ mb: 3 }}>
								Adresse, corrdonnée GSP ... du lieu
							</FormLabel>
							<TextField
								fullWidth
								required
								{...register("address")}
								{...errorField(errors?.address)}
								onChange={handleSearchAdresse}
								type="text"
								label="Addresse du lieu"
							/>
							{watch("latitude") && watch("address") ? (
								<Box
									sx={{
										height: {
											xs: 300,
											md: 400,
											position: "relative",
											width: "100%"
										}
									}}
								>
									<MapSimpleMarker
										updateMarker={(event) =>
											handleSearchAdresse(`${event.lat},${event.lng}`)
										}
										displayMapMode={true}
										displayMapType={true}
										lat={getValues().latitude || place?.latitude}
										lng={getValues().longitude || place?.longitude}
									/>
								</Box>
							) : (
								<></>
							)}
						</FormControl>
					)}

					{activeStep === 5 && (
						<>
							<FormControl fullWidth>
								<FormLabel htmlFor="reasons_to_visit" sx={{ mb: 3 }}>
									Pourquoi ce lieu est-il à visiter ?
								</FormLabel>
								<Controller
									control={control}
									name="reasons_to_visit"
									render={() => (
										<InputTextArray
											value={
												place?.reasons_to_visit ||
												getValues().reasons_to_visit
											}
											onchange={(event) =>
												setValue("reasons_to_visit", event)
											}
										/>
									)}
								/>
								{Boolean(errors?.reasons_to_visit) && (
									<FormHelperText>
										{errors?.reasons_to_visit?.message}
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

export default PlaceForm;

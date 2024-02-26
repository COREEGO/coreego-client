import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import TitleText from "../texts/TitleText";
import {
	BASE_URL,
	BEARER_HEADERS,
	IMAGE_PATH
} from "../../utils/variables";
import {
	errorField,
	maxLengthValidator,
	noEmptyLocalisationValidator,
	noEmptyValidator,
	noEmtyFileValidator,
	requiredValidator,
	validationPlace
} from "../../utils/formValidation";
import UpladButton from "../buttons/UplaodButton";
import useFile from "../../hooks/useFile";
import { CAMERA_ICON, TRASH_ICON } from "../../utils/icon";
import FormImage from "../images/FormImage";
import { apiFetch } from "../../http-common/apiFetch";
import { useEffect, useState } from "react";
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput";
import LoadingPage from "../LoadingPage";
import axios from "axios";
import MapSimpleMarker from "../maps/MapSimpleMarker";
import {
	Autocomplete,
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
	Typography,
	debounce
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";
import useMalware from "../../hooks/useMalware";
import TitleSectionText from "../texts/TitleSectionText";
import {
	createBlobImage,
	getViolationField,
	isKoreanAddress
} from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";

const PlaceForm = ({
	isEditMode = false,
	place = null,
	mutate = Function
}) => {
	const navigate = useNavigate();

	const { owner } = useMalware();

	useEffect(() => {
		if (isEditMode) owner(place.user.id);
	}, []);

	const [adressData, setAdressData] = useState([]);

	const { files, addFile, removeFile, deleteFile, clearFiles } =
		useFile(mutate);

	const { placeCategories } = useSelector((state) => state.app);

	const {
		control,
		register,
		getValues,
		setValue,
		handleSubmit,
		clearErrors,
		watch,
		setError,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onBlur",
		resolver: vestResolver(validationPlace),
		defaultValues: {
			title: place?.title,
			city_id: place?.city.id || "",
			district_id: place?.district.id || "",
			category_id: place?.category.id,
			description: place?.description,
			longitude: place?.longitude,
			latitude: place?.latitude,
			address: place?.address,
			files: []
		}
	});

	const onSubmitForm = async (data) => {
		const url = isEditMode ? `/places/edit/${place.id}` : "/places";

		const formData = new FormData();

		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("longitude", data.longitude);
		formData.append("latitude", data.latitude);
		formData.append("city_id", data.city_id);
		formData.append("category_id", data.category_id);
		formData.append("district_id", data.district_id);
		formData.append("address", data.address);

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
			navigate(`/voyage/place/${response.data.data.slug}`);
		} catch (error) {
			toast.error(error?.response?.data?.message);
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
		} catch (error) {
			console.log(error);
		}
	}, 1000);

	useEffect(() => {
		setValue("files", files);
	}, [files]);

	return (
		<Container>
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						variant="h5"
						alignSelf="center"
						startText={isEditMode ? "Modifier" : "Partager"}
						endText={"un lieu"}
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
							placeholder="titre"
							label="Donnez un titre à votre lieu ?"
							id="title"
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
									maxLength: 250
								}
							}}
						/>

						<FormControl error={Boolean(errors?.category_id)}>
							<InputLabel>Type de lieu</InputLabel>
							<Select
								{...register("category_id")}
								label="Type de lieu"
								defaultValue={place?.category?.id || ""}
							>
								<MenuItem value="">-------</MenuItem>
								{placeCategories.map((category) => (
									<MenuItem key={category.id} value={category.id}>
										{category.label}
									</MenuItem>
								))}
							</Select>
							{Boolean(errors?.category_id) && (
								<FormHelperText>
									{errors?.category_id?.message}
								</FormHelperText>
							)}
						</FormControl>

						<Controller
							control={control}
							name="city_id"
							rules={{
								validate: () =>
									noEmptyLocalisationValidator(
										getValues().city_id,
										getValues().district_id
									)
							}}
							render={() => (
								<CityDistrictSelectInput
									emptyOptionCity="-----"
									emptyOptionDistict="-----"
									cityValue={place?.city?.id || "0"}
									districtValue={place?.district?.id || "0"}
									updateCity={(e) => setValue("city_id", e)}
									updateDistrict={(e) => setValue("district_id", e)}
								/>
							)}
						/>
						{Boolean(errors?.city_id) && (
							<FormHelperText>
								{errors?.city_id?.message}
							</FormHelperText>
						)}

						<TextField
							required
							{...register("address")}
							{...errorField(errors?.address)}
							onChange={handleSearchAdresse}
							type="text"
							label="Addresse du lieu"
						/>
						{watch("latitude") ? (
							<Box
								sx={{
									mt: 2,
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

						<TextField
							{...register("description")}
							{...errorField(errors?.description)}
							label="Dites en plus sur ce lieu"
							placeholder="en quoi ce lieu est-il important à découvrir ?"
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

						{isEditMode && place?.images.length ? (
							<Stack spacing={1}>
								<Typography fontWeight={"bold"}>Images</Typography>
								<Stack direction="row" flexWrap={"wrap"} mt={2}>
									{place.images.map((image, index) => {
										return (
											<Box key={index} mr={1} mb={1}>
												<FormImage
													key={index}
													imageUrl={IMAGE_PATH + image.name}
													onRemove={() => deleteFile(image.id)}
												/>
											</Box>
										);
									})}
								</Stack>
								<Divider />
							</Stack>
						) : (
							<></>
						)}

						{files.length ? (
							<Stack direction="row" flexWrap={"wrap"} mb={2}>
								{files.map((image, index) => {
									return (
										<Box key={index} mr={1} mb={1}>
											<FormImage
												key={index}
												imageUrl={createBlobImage(image)}
												onRemove={() => removeFile(index)}
											/>
										</Box>
									);
								})}
							</Stack>
						) : (
							<></>
						)}
						<FormControl error={errors.files ? true : false}>
							<Controller
								control={control}
								name="files"
								rules={{
									validate: () =>
										noEmtyFileValidator(
											files.concat(place?.images || [])
										)
								}}
								render={() => (
									<UpladButton
										onChange={(e) => addFile(e.target.files)}
									>
										<Button
											variant="outlined"
											startIcon={<CAMERA_ICON />}
										>
											Ajouter des photos
										</Button>
									</UpladButton>
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
						<Box>
							<LoadingButton
								type="submit"
								loading={isSubmitting}
								variant="contained"
							>
								{isEditMode
									? "Modifier le lieu"
									: " Partager ce lieu"}
							</LoadingButton>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
};

export default PlaceForm;

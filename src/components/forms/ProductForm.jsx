import { useNavigate, useParams } from "react-router";
import useFile from "../../hooks/useFile";
import { Controller, useForm } from "react-hook-form";
import {
	errorField,
	noEmptyLocalisationValidator,
	maxLengthValidator,
	noEmtyFileValidator,
	requiredValidator
} from "../../utils/formValidation";
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput";
import { useEffect } from "react";
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
import { CAMERA_ICON } from "../../utils/icon";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useMalware from "../../hooks/useMalware";
import TitleSectionText from "../texts/TitleSectionText";
import { createBlobImage, getBlobImage } from "../../utils";
import axios from "axios";

const ProductForm = ({
	isEditMode = false,
	mutate = Function,
	product = null
}) => {
	const navigate = useNavigate();

	const { owner } = useMalware();

	useEffect(() => {
		if (isEditMode) owner(product.user.id);
	}, []);

	const { files, addFile, removeFile, deleteFile, clearFiles } =
		useFile(mutate);

	const {
		control,
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onTouched",
		defaultValues: {
			title: product?.title,
			description: product?.description,
			city: product?.city.id,
			district: product?.district.id,
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
		formData.append("city_id", data.city);
		formData.append("district_id", data.district);

		data.files.forEach((file, index) => {
			formData.append(`images[${index}]`, file);
		});

		try {
			const response = await axios.post(
				url,
				formData,
				BEARER_HEADERS
			);
			console.log(response);
			toast.success(response.data.message);
			clearFiles();
			navigate(`/market-place/product/${response.data.data.slug}`);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		setValue("files", files);
	}, [files]);

	return (
		<Box my={3}>
			<Container maxWidth="lg">
				<Stack
					component="form"
					spacing={5}
					onSubmit={handleSubmit(onSubmitForm)}
				>
					<TitleSectionText
						variant="h4"
						startText={isEditMode ? "Modifier" : "Mettre en vente"}
						endText={"un produit"}
					/>
					<Stack spacing={3}>
						<TextField
							{...register("title", {
								...requiredValidator,
								...maxLengthValidator(100)
							})}
							{...errorField(errors?.title)}
							required
							fullWidth
							placeholder="titre"
							label="Donnez un titre à votre produit ?"
						/>
						<TextField
							{...register(
								"description",
								requiredValidator,
								maxLengthValidator(250)
							)}
							{...errorField(errors?.description)}
							label="Decrivez le produit"
							placeholder="Description"
							autoFocus
							required
							multiline
							rows={10}
						/>
						<TextField
							type="number"
							required
							{...register("price", requiredValidator)}
							{...errorField(errors?.price)}
							onInput={(event) => {
								const value = event.target.value;
								if (value < 0) setValue("price", 0);
							}}
							fullWidth
							placeholder="Prix"
							label="Quelle est son prix ?"
							id="price"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">₩</InputAdornment>
								)
							}}
						/>
						<Controller
							control={control}
							name="district"
							rules={{
								validate: () =>
									noEmptyLocalisationValidator(
										getValues().city,
										getValues().district
									)
							}}
							render={() => (
								<CityDistrictSelectInput
									cityValue={product?.city.id || ""}
									districtValue={product?.district.id || ""}
									updateCity={(e) => setValue("city", e)}
									updateDistrict={(e) => setValue("district", e)}
									showMap={true}
								/>
							)}
						/>
						{errors.district ? (
							<FormHelperText>
								{" "}
								{errors.district.message}{" "}
							</FormHelperText>
						) : (
							<></>
						)}
						{isEditMode && product?.images.length ? (
							<FormControl>
								<Typography fontWeight={"bold"}>Images</Typography>
								<Stack direction="row" flexWrap={"wrap"} mt={2}>
									{product.images.map((image, index) => {
										return (
											<Box key={index} mr={1} mb={1}>
												<FormImage
													displayTrash={Boolean(
														product?.images.length > 1
													)}
													key={index}
													imageUrl={IMAGE_PATH + image.name}
													onRemove={() => deleteFile(image.id)}
												/>
											</Box>
										);
									})}
								</Stack>
								<Divider />
							</FormControl>
						) : (
							<></>
						)}

						{files.length ? (
							<Stack direction="row" flexWrap={"wrap"} mb={2}>
								{files.map((file, index) => {
									return (
										<Box key={index} mr={1} mb={1}>
											<FormImage
												key={index}
												imageUrl={createBlobImage(file)}
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
											files.concat(product?.images || [])
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
									? "Modifier le produit"
									: "Mettre en vente"}
							</LoadingButton>
						</Box>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default ProductForm;

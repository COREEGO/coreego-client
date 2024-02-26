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
import {
	createBlobImage,
	getBlobImage,
	getViolationField
} from "../../utils";
import axios from "axios";
import { vestResolver } from "@hookform/resolvers/vest";

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
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						variant="h5"
						alignSelf="center"
						startText={isEditMode ? "Modifier" : "Mettre en vente"}
						endText={"un produit"}
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
							label="Donnez un titre à votre produit ?"
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
						<TextField
							type="number"
							required
							{...register("price")}
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
							name="city_id"
							render={() => (
								<CityDistrictSelectInput
									emptyOptionCity="-----"
									emptyOptionDistict="-----"
									labelCity="Dans quelle ville ?"
									labelDistrict="Dans quel district ?"
									cityValue={product?.city?.id || "0"}
									districtValue={product?.district?.id || "0"}
									updateCity={(e) => setValue("city_id", e)}
									updateDistrict={(e) => setValue("district_id", e)}
									showMap={true}
								/>
							)}
						/>
						{(Boolean(errors?.city_id) || Boolean(errors?.district_id) )  && (
							<FormHelperText>
								{errors?.city_id?.message || errors?.district_id?.message}
							</FormHelperText>
						)}

						{isEditMode && product?.images.length ? (
							<Stack spacing={1}>
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
							</Stack>
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
			</Stack>
		</Container>
	);
};

export default ProductForm;

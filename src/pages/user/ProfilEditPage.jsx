import axios from "axios";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Container,
	Box,
	Avatar,
	TextField,
	Stack,
	InputAdornment,
	Autocomplete,
	Checkbox,
	FormHelperText,
	InputLabel,
	Button,
	CircularProgress
} from "@mui/material";
import { AVATAR_PATH, BEARER_HEADERS } from "../../utils/variables";
import {
	CAMERA_ICON,
	CHECKED_ICON,
	FACEBOOK_ICON,
	INSTAGRAM_ICON,
	KAKAO_ICON,
	LANGUAGE_ICON,
	LIKE_ICON,
	NO_CHECKED_ICON,
	OCCUPATION_ICON,
	TIKTOK_ICON,
	WEBSITE_ICON,
	YOUTUBE_ICON
} from "../../utils/icon";
import { LoadingButton } from "@mui/lab";
import useFile from "../../hooks/useFile";
import React from "react";
import UpladButton from "../../components/buttons/UplaodButton";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { useNavigate } from "react-router";
import {
	errorField,
	validationProfil
} from "../../utils/formValidation";
import { getViolationField } from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";
import LoadingPage from "../../components/LoadingPage";

const ProfilEditPage = () => {
	const { auth, authentification } = useAuthContext();

	const { files, addFile, clearFiles } = useFile();
	const [isUploadBusy, setIsUploadBusy] = React.useState(false);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [profil, setProfil] = React.useState();
	const [languagesSelected, setLanguagesSelected] = React.useState(
		[]
	);

	React.useEffect(() => {
		loadUser();
	}, []);

	const loadUser = async () => {
		try {
			const response = await axios.get("/users/" + auth.slug);
			setProfil(response.data);
			setLanguagesSelected(
				response?.data?.languages
					? JSON.parse(response?.data?.languages)
					: []
			);
		} catch (error) {
		} finally {
			setIsLoaded(true);
		}
	};

	const { languages } = useSelector((state) => state.app);

	const navigate = useNavigate();

	const languageParse = React.useMemo(() => {
		return languages.map((language) => {
			return language.label;
		});
	}, [languages]);

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
		resolver: vestResolver(validationProfil),
		defaultValues: {
			city_id: profil?.city?.id || "",
			district_id: profil?.district?.id || ""
		}
	});

	const handleUpdateAvatar = async (remove = false) => {
		try {
			setIsUploadBusy(true);
			if (!remove) {
				const formData = new FormData();

				if (files.length) {
					formData.append("avatar", files[0]);
				}
				await axios.post(
					`/users/edit/${auth.id}`,
					formData,
					BEARER_HEADERS
				);
			} else {
				await axios.post(
					`/users/edit/${auth.id}`,
					{ avatar: null },
					BEARER_HEADERS
				);
			}

			clearFiles();
			await loadUser();
			await authentification();
		} catch (error) {
			console.log(error);
		} finally {
			setIsUploadBusy(false);
		}
	};

	const onSubmit = async (data) => {
		try {
			data.languages = languagesSelected;

			if (data.city_id == 0) data.city_id = null;
			if (data.district_id == 0) data.district_id = null;

			const response = await axios.post(
				`/users/edit/${auth.id}`,
				data,
				BEARER_HEADERS
			);
			await authentification();
			navigate(`/user/profil/${auth.slug}`);
		} catch (error) {
			getViolationField(error, setError);
		}
	};

	React.useEffect(() => {
		if (files.length > 0) handleUpdateAvatar();
	}, [files]);

	const stringLength = (target) => {
		return watch(target)?.length || profil[target]?.length || 0;
	};

	return !isLoaded ? (
		<LoadingPage type="page" />
	) : (
		<Container>
			<Stack my={5} alignItems="center">
				<Stack spacing={5} width={700} maxWidth="100%">
					<Stack justifyContent="center" alignItems="center">
						<Avatar
							sx={{
								width: 150,
								height: 150,
								mb: -2
							}}
							src={AVATAR_PATH + profil.avatar}
						/>
						<Box>
							<UpladButton
								multiple={false}
								onChange={async (event) =>
									await addFile(event.target.files, false)
								}
							>
								<Stack
									sx={{
										border: "1px solid  var(--coreego-blue)",
										cursor: "pointer"
									}}
									direction="row"
									alignItems="center"
									gap={1}
									bgcolor="white"
									py={0.5}
									px={1}
									borderRadius={2}
								>
									{isUploadBusy ? (
										<CircularProgress size={20} />
									) : (
										<CAMERA_ICON />
									)}
									Modifier
								</Stack>
							</UpladButton>
						</Box>
						{auth?.avatar && (
							<Button isLoaded={isUploadBusy} color="error" onClick={() => handleUpdateAvatar(true)}>
								Supprimer avatar
							</Button>
						)}
					</Stack>

					<Box
						onSubmit={handleSubmit(onSubmit)}
						component="form"
						alignItems="flex-start"
					>
						<Stack gap={3}>
							<TitleSectionText
								startText="à propos"
								endText="de moi"
							/>
							<TextField
								{...register("introduction")}
								{...errorField(errors?.introduction)}
								fullWidth
								label="Décrivez vous en quelque ligne"
								defaultValue={profil.introduction}
								multiline
								rows={3}
								InputProps={{
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{stringLength("introduction")}/{250}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 250
									}
								}}
							/>
							<TextField
								{...register("hobby")}
								{...errorField(errors?.hobby)}
								fullWidth
								label="Ce que j'aime"
								placeholder="ce que j'aime"
								defaultValue={profil.hobby}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LIKE_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{stringLength("hobby")}/{50}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 50
									}
								}}
							/>
							<TextField
								{...register("occupation")}
								{...errorField(errors?.occupation)}
								fullWidth
								label="Ma profession"
								placeholder="ma profession"
								defaultValue={profil.occupation}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<OCCUPATION_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{stringLength("occupation")}/{50}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 50
									}
								}}
							/>
							<Box>
								<Controller
									control={control}
									name="district_id"
									render={() => (
										<>
											<InputLabel sx={{ mb: 1 }}>
												Ma localisation actuelle
											</InputLabel>
											<CityDistrictSelectInput
												cityValue={
													watch("city_id") || profil?.city?.id
												}
												districtValue={
													watch("district_id") || profil?.district?.id
												}
												updateCity={(e) => {
													setValue("city_id", e);
												}}
												updateDistrict={(e) =>
													setValue("district_id", e)
												}
												fullWidth
											/>

											{errors.district_id && (
												<FormHelperText>
													{errors?.district_id?.message}
												</FormHelperText>
											)}
										</>
									)}
								/>
							</Box>
							<Stack direction="row" alignItems="center">
								<LANGUAGE_ICON sx={{ color: "grey", mr: 1 }} />
								<Autocomplete
									value={languagesSelected}
									onChange={(event, newValue) =>
										setLanguagesSelected(newValue)
									}
									multiple
									fullWidth
									disableCloseOnSelect
									options={languageParse}
									getOptionLabel={(option) => option}
									renderOption={(props, option, { selected }) => (
										<li {...props}>
											<Checkbox
												icon={<NO_CHECKED_ICON />}
												checkedIcon={<CHECKED_ICON />}
												style={{ marginRight: 8 }}
												checked={selected}
											/>
											{option}
										</li>
									)}
									renderInput={(params) => (
										<TextField
											fullWidth
											{...params}
											label="Langues parlées"
											placeholder="Choisir une langue"
										/>
									)}
								/>
							</Stack>
						</Stack>

						<Stack my={5} gap={3}>
							<TitleSectionText
								startText="Mes réseaux"
								endText="sociaux"
							/>
							<TextField
								{...register("website")}
								{...errorField(errors?.website)}
								fullWidth
								label="Site internet"
								placeholder="mon site internet"
								defaultValue={profil.website}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<WEBSITE_ICON />
										</InputAdornment>
									)
								}}
							/>
							<TextField
								{...register("facebook")}
								{...errorField(errors?.facebook)}
								fullWidth
								label="Pseudo facebook"
								placeholder="mon pseudo facebook"
								defaultValue={profil.facebook}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<FACEBOOK_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{stringLength("facebook")}/{20}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 20
									}
								}}
							/>
							<TextField
								{...register("youtube")}
								{...errorField(errors?.youtube)}
								fullWidth
								label="Pseudo youtube"
								placeholder="mon pseudo youtube"
								defaultValue={profil.youtube}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<YOUTUBE_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{stringLength("youtube")}/{20}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 20
									}
								}}
							/>
							<TextField
								{...register("instagram")}
								{...errorField(errors?.instagram)}
								fullWidth
								label="Pseudo instagram"
								placeholder="mon pseudo instagram"
								defaultValue={profil.instagram}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<INSTAGRAM_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{watch("instagram")?.length || 0}/{20}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 20
									}
								}}
							/>
							<TextField
								{...register("tiktok")}
								{...errorField(errors?.tiktok)}
								fullWidth
								label="Pseudo tiktok"
								placeholder="mon pseudo tiktok"
								defaultValue={profil.tiktok}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<TIKTOK_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{watch("tiktok")?.length || 0}/{20}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 20
									}
								}}
							/>
							<TextField
								{...register("kakao")}
								{...errorField(errors?.kakao)}
								fullWidth
								label="Pseudo kakaotalk"
								placeholder="mon pseudo kakaoTalk"
								defaultValue={profil.kakao}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<KAKAO_ICON />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment
											className="string_count"
											position="end"
										>
											{watch("kakao")?.length || 0}/{20}
										</InputAdornment>
									),
									inputProps: {
										maxLength: 20
									}
								}}
							/>
						</Stack>
						<LoadingButton
							type="submit"
							loading={isSubmitting}
							variant="contained"
						>
							Enregistrer
						</LoadingButton>
					</Box>
				</Stack>
			</Stack>
		</Container>
	);
};

export default ProfilEditPage;

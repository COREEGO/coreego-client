import axios from "axios";
import ProfilForm from "../../components/forms/ProfilForm";
import { useAuthContext } from "../../contexts/AuthProvider";
import {
	Container,
	Box,
	Avatar,
	TextField,
	Stack,
	InputAdornment,
	Button,
	Autocomplete,
	Checkbox
} from "@mui/material";
import {
	AVATAR_PATH,
	BEARER_HEADERS,
	TOKEN
} from "../../utils/variables";
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
	YOUTUBE_ICON
} from "../../utils/icon";
import { LoadingButton } from "@mui/lab";
import useFile from "../../hooks/useFile";
import React, { useEffect, useState } from "react";
import UpladButton from "../../components/buttons/UplaodButton";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { requiredValidator } from "../../utils/formValidation";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { useNavigate } from "react-router";

const ProfilEditPage = () => {
	const { user: auth, authentification } = useAuthContext();

	const { files, addFile, clearFiles } = useFile();
	const [isUploadBusy, setIsUploadBusy] = React.useState(false);
	const [isBusy, setIsBusy] = React.useState(false);

	const [languagesSelected, setLanguagesSelected] = useState(JSON.parse(auth.languages))
	const { languages } = useSelector((state) => state.app);

	const navigate = useNavigate()

	const languageParse = React.useMemo(()=>{
		return languages.map(language=>{
			return language.label
		})
	}, [languages])

	const {
		control,
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onTouched",
	});

	const handleUpdateAvatar = async () => {
		try {
			setIsUploadBusy(true);
			const formData = new FormData();

			if (files.length) {
				formData.append("avatarPath", files[0].file);
			}
			const response = await axios.post(
				`/user/edit`,
				formData,
				BEARER_HEADERS
			);

			clearFiles();

			await authentification();
			toast.success(response.data.message);
		} catch (error) {
			console.log(error);
			toast.error(error.response.message);
		} finally {
			setIsUploadBusy(false);
		}
	};

	const onSubmit = async (data) => {
		try {


			data.languages = languagesSelected
			if(data.city_id == 0) data.city_id = null
			if(data.district_id == 0) data.district_id = null


			const response = await axios.post(
				`/user/edit`,
				data,
				BEARER_HEADERS
			);
			await authentification();
			toast.success(response.data.message);
			navigate(`/user/profil/${auth.slug}`)
		} catch (error) {
			toast.error(error.message);
			console.log(error);
		}
	};

	React.useEffect(() => {
		if (files.length > 0) handleUpdateAvatar();
	}, [files]);

	return (
		<>
			<Box className="hero_banner">
				<Box py={5}>
					<Container>
						<Stack spacing={5}>
							<Stack justifyContent="center" alignItems="center">
								<Avatar
									sx={{boxShadow: '-5px 5px 4px var(--coreego-red)' ,  width: 150, height: 150, mb: -2 }}
									src={AVATAR_PATH + auth.avatarPath}
								/>
								<UpladButton
									multiple={false}
									onChange={async (event) =>
										await addFile(event.target.files, false)
									}
								>
									<LoadingButton
										loading={isUploadBusy}
										variant={"outlined"}
										sx={{ backgroundColor: "white" }}
										startIcon={<CAMERA_ICON />}
									>
										Modifier
									</LoadingButton>
								</UpladButton>
							</Stack>

							<Box
								onSubmit={handleSubmit(onSubmit)}
								component="form"
								alignItems="flex-start"
							>
								<Stack gap={2}>
									<TitleSectionText
										startText="à propos"
										endText="de moi"
									/>
									<TextField
										fullWidth
										label="Décrivez vous en quelque ligne"
										defaultValue={auth.introduction}
										{...register("introduction")}
										multiline
										rows={3}
									/>
									<TextField
										fullWidth
										label="Ce que j'aime"
										placeholder="ce que j'aime"
										defaultValue={auth.hobby}
										{...register("hobby")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<LIKE_ICON />
												</InputAdornment>
											)
										}}
									/>
									<TextField
										fullWidth
										label="Ma profession"
										placeholder="ma profession"
										defaultValue={auth.occupation}
										{...register("occupation")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<OCCUPATION_ICON />
												</InputAdornment>
											)
										}}
									/>
									<Controller
										control={control}
										name="district_id"
										render={() => (

											<CityDistrictSelectInput
												labelCity="Ville de résidance"
												labelDistrict="District de résidance"
												emptyOption="-------"
												cityValue={auth?.city?.id || ""}
												districtValue={auth?.district?.id || ""}
												updateCity={(e) => setValue("city_id", e)}
												updateDistrict={(e) =>
													setValue("district_id", e)
												}
												showMap={true}
												/>
										)}
									/>
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

								<Stack my={5} gap={2}>
									<TitleSectionText
										startText="Mes réseaux"
										endText="sociaux"
									/>
									<TextField
										fullWidth
										label="Pseudo facebook"
										placeholder="mon pseudo facebook"
										defaultValue={auth.facebook}
										{...register("facebook")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<FACEBOOK_ICON />
												</InputAdornment>
											)
										}}
									/>
									<TextField
										fullWidth
										label="Pseudo youtube"
										placeholder="mon pseudo youtube"
										defaultValue={auth.youtube}
										{...register("youtube")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<YOUTUBE_ICON />
												</InputAdornment>
											)
										}}
									/>
									<TextField
										fullWidth
										label="Pseudo instagram"
										placeholder="mon pseudo instagram"
										defaultValue={auth.instagram}
										{...register("instagram")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<INSTAGRAM_ICON />
												</InputAdornment>
											)
										}}
									/>
									<TextField
										fullWidth
										label="Pseudo tiktok"
										placeholder="mon pseudo tiktok"
										defaultValue={auth.instagram}
										{...register("tiktok")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<TIKTOK_ICON />
												</InputAdornment>
											)
										}}
									/>
									<TextField
										fullWidth
										label="Pseudo kakaotalk"
										placeholder="mon pseudo kakaoTalk"
										defaultValue={auth.kakao}
										{...register("kakao")}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													<KAKAO_ICON />
												</InputAdornment>
											)
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
					</Container>
				</Box>
			</Box>
		</>
	);
};

export default ProfilEditPage;

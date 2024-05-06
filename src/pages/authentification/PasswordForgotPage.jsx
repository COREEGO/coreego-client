import { useNavigate } from "react-router";
import { getViolationField } from "../../utils";
import { Controller, useForm } from "react-hook-form";
import { Container, Stack, TextField } from "@mui/material";
import {
	errorField,
	validationChangePassword,
	validationForgotPassword
} from "../../utils/formValidation";
import { LoadingButton } from "@mui/lab";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { vestResolver } from "@hookform/resolvers/vest";
import { Helmet } from "react-helmet";
import PasswordInput from "../../components/inputs/PasswordInput";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [searchParam, setSearchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		resolver: vestResolver(validationChangePassword)
	});

	const onSubmit = async (data) => {
		try {
			await axios.post("/reset-password", {
				password: data.password,
				email: data.email,
				token: searchParam.get("token"),
				password_confirmation: data.password_confirmation
			});
			reset();
			navigate("/login");
		} catch (error) {}
	};

	return (
		<Container>
			<Helmet>
				<title>Mot de passe oublié | Coreego</title>
			</Helmet>
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						component="h1"
						alignSelf="center"
						startText="nouveau"
						endText="Mot de passe"
					/>
					<Stack
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						spacing={3}
					>
						<TextField
							{...register("email")}
							{...errorField(errors?.email)}
							label="Adresse email"
							required
							placeholder="email@email.fr"
							type="email"
						/>

						<Controller
							control={control}
							name="password"
							render={({ field: { value, onChange } }) => {
								return (
									<PasswordInput
										value={value}
										onChange={onChange}
										margin="normal"
										{...errorField(errors?.password)}
										fullWidth
										label="Mot de passe"
										required
										placeholder="6+ caractères requis"
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="password_confirmation"
							render={({ field: { value, onChange } }) => {
								return (
									<PasswordInput
										{...register("password_confirmation")}
										{...errorField(errors?.password_confirmation)}
										fullWidth
										value={value}
										onChange={onChange}
										margin="normal"
										label="Confirmez votre mot de passe"
										required
										placeholder="6+ caractères requis"
										type="password"
									/>
								);
							}}
						/>

						<LoadingButton
							variant="contained"
							loading={isSubmitting}
							type="submit"
						>
							Réinitialiser
						</LoadingButton>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
};

const SendMail = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		resolver: vestResolver(validationForgotPassword)
	});

	const onSubmit = async (data) => {
		try {
			await axios.post("/forgot-password", {
				email: data.email
			});
			reset();
		} catch (error) {
			getViolationField(error, setError);
		}
	};

	return (
		<Container>
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						component="h1"
						alignSelf="center"
						startText="Mot de passe"
						endText="oublié"
					/>
					<Stack
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						spacing={3}
					>
						<TextField
							{...register("email")}
							{...errorField(errors?.email)}
							label="Adresse email"
							required
							placeholder="email@email.fr"
							type="email"
						/>
						<LoadingButton
							variant="contained"
							loading={isSubmitting}
							type="submit"
						>
							Valider
						</LoadingButton>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
};

const PasswordForgotPage = () => {
	const [searchParam, setSearchParams] = useSearchParams();

	const showPasswordChangeForm = !!searchParam.get("token");

	return showPasswordChangeForm ? <ChangePassword /> : <SendMail />;
};

export default PasswordForgotPage;

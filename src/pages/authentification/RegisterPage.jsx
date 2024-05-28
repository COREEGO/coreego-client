import { Controller, useForm } from "react-hook-form";
import {
	errorField,
	validationRegister
} from "../../utils/formValidation";
import { vestResolver } from "@hookform/resolvers/vest";

import { NavLink, useNavigate } from "react-router-dom";
import {
	Container,
	Stack,
	TextField,
	Typography,
	InputAdornment,
	FormGroup,
	Checkbox,
	FormControlLabel
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { getViolationField } from "../../utils";
import TitleSectionText from "../../components/texts/TitleSectionText";
import axios from "axios";
import { Helmet } from "react-helmet";
import PasswordInput from "../../components/inputs/PasswordInput";
import { useAuthContext } from "../../contexts/AuthProvider";

const RegisterPage = () => {
	const navigate = useNavigate();

	const {
		register,
		watch,
		handleSubmit,
		setError,
		control,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		resolver: vestResolver(validationRegister)
	});

	const onSubmit = async (data) => {
		try {
			await axios.post("/register", {
				pseudo: data.pseudo.trim(),
				email: data.email,
				password: data.password,
				password_confirmation: data.password_confirmation
			});
			reset();
			navigate("/login");
		} catch (error) {
			getViolationField(error, setError);
		}
	};

	return (
		<Container>
			<Helmet>
				<title>Créer un compte | Coreego</title>
			</Helmet>
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						component="h1"
						alignSelf="center"
						startText="Je crée"
						endText="mon compte"
					/>
					<Stack component="form" onSubmit={handleSubmit(onSubmit)}>
						<TextField
							{...register("pseudo")}
							{...errorField(errors?.pseudo)}
							label="Pseudo"
							required
							margin="normal"
							fullWidth
							placeholder="Votre pseudo"
							InputProps={{
								endAdornment: (
									<InputAdornment
										className="string_count"
										position="end"
									>
										{watch("pseudo")?.length || 0}/{20}
									</InputAdornment>
								),
								inputProps: {
									maxLength: 20
								}
							}}
						/>
						<TextField
							{...register("email")}
							{...errorField(errors?.email)}
							fullWidth
							margin="normal"
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

						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										{...register("accept_conditions")}
										{...errorField(errors?.accept_conditions)}
										required
									/>
								}
								label={
									<span>
										J'accepte les conditions d'utilisation{" "}
										<NavLink
											style={{ color: "var(--coreego-blue)" }}
											to="/conditions-generales"
										>
											ICI
										</NavLink>
									</span>
								}
							/>
						</FormGroup>
						<LoadingButton
							variant="contained"
							loading={isSubmitting}
							type="submit"
						>
							Je m'inscris
						</LoadingButton>
						<Stack
							justifyContent="center"
							spacing={1}
							direction="row"
						>
							<Typography>J'ai déjà un compte ?</Typography>
							<NavLink to="/login">
								<Typography component="span" color="primary">
									Je me connecte
								</Typography>
							</NavLink>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
};

export default RegisterPage;

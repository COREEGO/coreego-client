import { apiFetch } from "../../http-common/apiFetch";
import { SubmitHandler, useForm } from "react-hook-form";
import {
	emailValidator,
	maxLengthValidator,
	minLengthValidatior,
	noEmptyValidator,
	passwordMatchValidator,
	requiredValidator
} from "../../utils/formValidation";
import { NavLink, useNavigate } from "react-router-dom";
import {
	Card,
	CardHeader,
	Container,
	FormControl,
	Stack,
	TextField,
	Typography,
	CardContent,
	FormHelperText,
	CardActions
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

const RegisterPage = () => {
	const navigate = useNavigate();

	const {
		control,
		register,
		handleSubmit,
		setError,
		formState: {
			errors,
			isSubmitting,
			isSubmitted,
			isSubmitSuccessful
		},
		getValues,
		reset
	} = useForm({
		mode: "onTouched"
	});

	const onSubmit = async (data) => {
		try {
			const response = await apiFetch("/register", "post", {
				pseudo: data.pseudo,
				email: data.email,
				password: data.password,
				password_confirmation: data.confirmPassword
			});
			reset();
			toast.success(response.message);
			navigate("/login");
		} catch (error) {
			console.log(error.message);
			if ("errors" in JSON.parse(error.message)) {
				const errors = JSON.parse(error.message).errors;
				for (const field in errors) {
					if (errors.hasOwnProperty(field)) {
						const messages = errors[field];
						for (const message of messages) {
							setError(field, {
								type: "manual",
								message: message
							});
						}
					}
				}
			}
		}
	};

	return (
		<Container>
			<Card sx={{ my: 5, mx: "auto", width: 600, maxWidth: "100%" }}>
				<CardHeader
					sx={{ textAlign: "center" }}
					title="Je crée mon compte"
					subheader="Remplissez le formulaire pour créer votre compte"
				/>
				<CardContent>
					<Stack
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						spacing={3}
					>
						<TextField
							label="Pseudo"
							fullWidth
							placeholder="Votre pseudo"
							error={errors.pseudo ? true : false}
							helperText={errors?.pseudo?.message}
							required
							{...register("pseudo", {
								...requiredValidator,
								...minLengthValidatior(3),
								...maxLengthValidator(20)
							})}
						/>
						<TextField
							fullWidth
							label="Adresse email"
							error={errors.email ? true : false}
							helperText={errors?.email?.message}
							autoFocus
							required
							{...register("email", {
								...noEmptyValidator,
								...emailValidator
							})}
							placeholder="email@email.fr"
							type="email"
						/>
						<TextField
							fullWidth
							label="Mot de passe"
							error={errors.password ? true : false}
							helperText={errors?.password?.message}
							required
							{...register("password", {
								...noEmptyValidator,
								...minLengthValidatior(6)
							})}
							placeholder="6+ caractères requis"
							type="password"
						/>
						<TextField
							fullWidth
							label="Confirmez votre mot de passe"
							error={errors.confirmPassword ? true : false}
							helperText={errors?.confirmPassword?.message}
							required
							{...register("confirmPassword", {
								...noEmptyValidator,
								validate: () =>
									passwordMatchValidator(
										getValues().password,
										getValues().confirmPassword
									)
							})}
							placeholder="6+ caractères requis"
							type="password"
						/>
						<LoadingButton
							variant="contained"
							loading={isSubmitting}
							type="submit"
						>
							Je m'inscris
						</LoadingButton>
					</Stack>
				</CardContent>
				<CardActions sx={{ justifyContent: "center" }}>
					<NavLink
						style={{ color: "var(--coreego-blue)" }}
						to="/login"
					>
						Connectez-vous ici
					</NavLink>
				</CardActions>
			</Card>
		</Container>
	);
};

export default RegisterPage;

import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
	Container,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import {
	errorField,
	validationLogin
} from "../../utils/formValidation";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { getViolationField } from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";
import { BASE_URL, setToken } from "../../utils/variables";
import { Helmet } from "react-helmet";
import PasswordInput from "../../components/inputs/PasswordInput";

export default function LoginPage() {
	const {
		register,
		handleSubmit,
		setError,
		control,
		formState: { errors, isSubmitting }
	} = useForm({
		resolver: vestResolver(validationLogin)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("/login", {
				email: data.email.trim(),
				password: data.password.trim()
			});
			if (response && response.data) {
				setToken(response.data.token);
				window.location.replace("/");
			}
		} catch (error) {
			getViolationField(error, setError);
		}
	};

	return (
		<Container>
			<Helmet>
				<title>Se connecter | Coreego</title>
			</Helmet>
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} my={5} width={700} maxWidth="100%">
					<TitleSectionText
						component="h1"
						alignSelf="center"
						startText="Je me"
						endText="connecte"
					/>
					<Stack
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						spacing={3}
					>
						<TextField
							{...register("email")}
							{...errorField(errors?.email)}
							fullWidth
							label="Adresse email"
							required
							placeholder="email@email.fr"
							type="email"
						/>
						<Controller
							control={control}
							name="password"
							render={({field: {value, onChange} }) => {
								return (
									<PasswordInput
									value={value}
									onChange={onChange}
									{...errorField(errors?.password)}
									fullWidth
									label="Mot de passe"
									required
									placeholder="Votre mot de passe"
									/>
								)
							}}
						/>
						<Stack alignItems="flex-end">
							<NavLink to="/password/forgot">
								<Typography component="span" color="primary">
									Mot de passe oublié
								</Typography>
							</NavLink>
						</Stack>
						<LoadingButton
							variant="contained"
							loading={isSubmitting}
							type="submit"
						>
							Connexion
						</LoadingButton>
						<Stack
							justifyContent="center"
							spacing={1}
							direction="row"
							flexWrap="wrap"
						>
							<Typography>Je n'est pas de compte ?</Typography>
							<NavLink to="/register">
								<Typography component="span" color="primary">
									Créer un compte
								</Typography>
							</NavLink>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}

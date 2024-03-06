import * as React from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Stack,
	TextField,
	Grid,
	Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import axios from "axios";
import {
	errorField,
	validationLogin
} from "../../utils/formValidation";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { getViolationField } from "../../utils";
import { vestResolver } from "@hookform/resolvers/vest";

export default function LoginPage() {
	const { setUser, authentification } = useAuthContext();

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm({
		mode: "onBlur",
		resolver: vestResolver(validationLogin)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("/login", {
				email: data.email.trim(),
				password: data.password.trim()
			});
			if ("data" in response && response.data) {
				localStorage.setItem("token", response.data.token);
				await authentification();
				navigate("/");
			}
		} catch (error) {
			console.log(error)
			toast.error(error?.response?.data?.message);
			if(error){
				getViolationField(error, setError);
			}
		}
	};

	return (
		<Container>
			<Stack justifyContent="center" alignItems="center">
				<Stack spacing={5} mt={5} width={700} maxWidth="100%">
					<TitleSectionText
						variant="h5"
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
						<TextField
							{...register("password")}
							{...errorField(errors?.password)}
							fullWidth
							label="Mot de passe"
							required
							placeholder="Votre mot de passe"
							type="password"
						/>
						<Stack alignItems="flex-end">
							<NavLink to="/password/forgot">
								Mot de passe oublié
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
							<NavLink to="/register">Créer un compte</NavLink>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}

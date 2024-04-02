import { useForm } from "react-hook-form";
import {
	errorField,
	validationRegister
} from "../../utils/formValidation";
import { vestResolver } from '@hookform/resolvers/vest';

import { NavLink, useNavigate } from "react-router-dom";
import {
	Container,
	Stack,
	TextField,
	Typography,
	InputAdornment
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { getViolationField } from "../../utils";
import TitleSectionText from "../../components/texts/TitleSectionText";
import axios from "axios";


const RegisterPage = () => {
	const navigate = useNavigate();

	const {
		register,
		watch,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		mode: "onBlur",
		resolver: vestResolver(validationRegister)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("/register", {
				pseudo: data.pseudo.trim(),
				email: data.email,
				password: data.password,
				password_confirmation: data.password_confirmation
			});
			reset();
			toast.success(response.data.message);
			navigate("/login");
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
						startText="Je crée"
						endText="mon compte"
					/>
					<Stack
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						spacing={3}
					>
						<TextField
							{...register("pseudo")}
							{...errorField(errors?.pseudo)}
							label="Pseudo"
							fullWidth
							placeholder="Votre pseudo"
							required5
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
							placeholder="6+ caractères requis"
							type="password"
						/>
						<TextField
							{...register("password_confirmation")}
							{...errorField(errors?.password_confirmation)}
							fullWidth
							label="Confirmez votre mot de passe"
							required
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
						<Stack
							justifyContent="center"
							spacing={1}
							direction="row"
						>
							<Typography>J'ai déjà un compte ?</Typography>
							<NavLink to="/login">
								<Typography component="span" color="primary">Je me connecte</Typography>
							</NavLink>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
};

export default RegisterPage;

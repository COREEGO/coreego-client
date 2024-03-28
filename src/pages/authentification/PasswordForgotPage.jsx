import {
	useNavigate,
} from "react-router";
import { getViolationField } from "../../utils";
import { useForm } from "react-hook-form";
import {
	Container,
	Stack,
	TextField,
} from "@mui/material";
import {
	errorField,
	validationChangePassword,
	validationForgotPassword
} from "../../utils/formValidation";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { vestResolver } from "@hookform/resolvers/vest";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const {
		register,
		handleSubmit,
		formState: {
			errors,
			isSubmitting
		},
		reset
	} = useForm({
		resolver: vestResolver(validationChangePassword)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("/reset-password", {
				password: data.password,
				email: data.email,
				token: searchParams.get("token"),
				password_confirmation: data.confirmPassword
			});
			reset();
			toast.success(response.data.message);
			navigate("/login");
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<Container>
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
							{...register("confirmPassword")}
							{...errorField(errors?.confirmPassword)}
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
		formState: {
			errors,
			isSubmitting,
		},
		reset
	} = useForm({
		mode: "onBlur",
		resolver: vestResolver(validationForgotPassword)
	});

	const onSubmit = async (data) => {
		try {
			const response = await axios.post("/forgot-password", {
				email: data.email
			});
			toast.success(response.data.message);
			reset();
		} catch (error) {
			toast.error(error?.response?.data?.message);
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
	const [searchParams, setSearchParams] = useSearchParams();

	const showPasswordChangeForm = !!searchParams.get("token");

	return showPasswordChangeForm ? <ChangePassword /> : <SendMail />;
};

export default PasswordForgotPage;

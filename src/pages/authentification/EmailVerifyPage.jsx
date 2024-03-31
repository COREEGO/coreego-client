import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { VALIDATION_EMAIL_MESSAGE } from "../../utils/variables";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerifyPage = () => {
	const location = useLocation();

	useEffect(() => {
		onVerifyAccount();
	}, []);

	const onVerifyAccount = async () => {
		try {
			const response = await axios.post(
				`/email-verify${location.search}`
			);
			toast.success(response?.data?.message);
		} catch (error) {
			toast.error(error?.data?.message);
		}
	};
	return <Navigate to="/login" />;
};

export default EmailVerifyPage;

import { Stack, Box, Container } from "@mui/material";
import { CONDITIONS_GENERALES } from "../../utils/mentions-legale";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { Helmet } from "react-helmet";

const ConditionsPage = () => {
	return (
		<>
			<Helmet>
				<title>Conditions générales d'utilisation | Coreego</title>
			</Helmet>
			<Container>
				<Stack my={5}>
					<Stack spacing={3}>
						<TitleSectionText endText="Conditions générales d'utilisation" />
						<Box
							dangerouslySetInnerHTML={{
								__html: CONDITIONS_GENERALES
							}}
						/>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};

export default ConditionsPage;

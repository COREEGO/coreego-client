import { Stack, Box, Container } from "@mui/material";
import { FONCTIONNEMENT_SITE } from "../../utils/mentions-legale";
import TitleSectionText from "../../components/texts/TitleSectionText";
import { Helmet } from "react-helmet";

const FonctionalsPage = () => {
	return (
		<>
			<Helmet>
				<title>Fonctionnement | Coreego</title>
			</Helmet>
			<Container>
				<Stack my={5}>
					<Stack spacing={3}>
						<TitleSectionText
							startText="Fonctionnement"
							endText="du site"
						/>
						<Box
							dangerouslySetInnerHTML={{
								__html: FONCTIONNEMENT_SITE
							}}
						/>
					</Stack>
				</Stack>
			</Container>
		</>
	);
};

export default FonctionalsPage;

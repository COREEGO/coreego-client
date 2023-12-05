import { ReactNode } from "react"
import AsideFeedSection from "../../../components/dom-section/AsideFeedSection"
import ImageHeader from "../../../components/headers/ImageHeader"
import FeedList from "../FeedList"
import { Box, Fab, Button, Container, Stack } from "@mui/material"
import { NavLink } from "react-router-dom"
import { FILTER_ICON, NEW_TOPIC_ICON } from "../../../utils/icon"
import ModalWrapper from "../../../components/Modals/ModalWraper"
import TitleText from "../../../components/texts/TitleText"
import SearchFilter from "../filters/SearchFilter"

interface PropsInterface {
    title: string,
    addTopicLink: string,
    renderFilterBody?: Function,
    imgUrl: string,
    fetchData: any,
    noLengthLabel: string,
    isLoading: boolean,
    cardName: "discussion" | "product" | "place",
    breackpoints : Record<any, any>,
}

const FeedPageTemplate: React.FC<PropsInterface> = ({
    title, renderFilterBody, imgUrl, fetchData, noLengthLabel, cardName, addTopicLink, breackpoints, isLoading
}) => {

    return (
        <>
            <NavLink to={addTopicLink}>
                <Fab sx={{ position: 'fixed', bottom: 10, right: 10 }} color="success" aria-label="add">
                    <NEW_TOPIC_ICON />
                </Fab>
            </NavLink>
            <Box
                sx={{
                    backgroundImage: `url(${imgUrl})`,
                    height: { xs: 150, md: 300 }, backgroundPosition: 'bottom', position: 'relative', backgroundSize: 'cover'
                }}>
            </Box>
            <Box bgcolor="white" py={3} boxShadow="0 0 3px grey">
                <Container maxWidth="lg">
                    <Stack spacing={5} direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
                        <TitleText text={title} />
                        <Stack spacing={2} flex={1} direction={"row"} >
                            <Box flex={1}>
                                <SearchFilter />
                            </Box>
                            <ModalWrapper
                                id="filtres"
                                title={<><FILTER_ICON /> Filtres</>}
                                renderButton={(onOpen) => (
                                    <>
                                        <Button sx={{ display: { md: 'flex', xs: 'none' } }} onClick={onOpen} startIcon={<FILTER_ICON />} variant="outlined">Filtres</Button>
                                        <Button variant="outlined" size="small" sx={{ display: { md: 'none', xs: 'flex' } }} onClick={onOpen} aria-label="delete">
                                            <FILTER_ICON />
                                        </Button>
                                    </>
                                )}
                                renderFilterBody={renderFilterBody}
                            />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Container maxWidth="lg">
                <FeedList
                    fetchData={fetchData}
                    isLoading={isLoading}
                    url="/discussions"
                    noLengthLabel={noLengthLabel}
                    buttonLabel="Voir plus"
                    cardName={cardName}
                    breackpoints={breackpoints}
                />
            </Container>
        </>
    )

}

export default FeedPageTemplate
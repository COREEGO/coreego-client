import SearchFilter from "../../pages/components/filters/SearchFilter"
import TitleText from "../texts/TitleText"
import { FILTER_ICON } from "../../utils/icon"
import ModalWrapper from "../Modals/ModalWraper"
import { Box, Button, Container, Stack } from "@mui/material"

interface AsideFeedSectionInterface {
    title: string,
    renderBody: Function
}

const AsideFeedSection: React.FC<AsideFeedSectionInterface> = ({ renderBody, title }) => {

    return (
        <>
            <Box bgcolor="white" py={3} boxShadow="0 0 3px grey">
                <Container maxWidth="lg">
                    <Stack spacing={5} direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }}>
                        <Box sx={{mb: 2}}>
                        <TitleText text={title} />
                        </Box>
                        <Stack spacing={2} flex={1} direction={"row"} >
                            <Box flex={1}>
                                <SearchFilter />
                            </Box>
                            <ModalWrapper
                                id="filtres"
                                title={<><FILTER_ICON /> Filtres</>}
                                renderButton={(onOpen) => (
                                    <>
                                        <Button size="small" sx={{ display: { md: 'flex', xs: 'none' } }} onClick={onOpen} startIcon={<FILTER_ICON />} variant="outlined">Filtres</Button>
                                        <Button variant="outlined" size="small" sx={{ display: { md: 'none', xs: 'flex' } }} onClick={onOpen} aria-label="delete">
                                            <FILTER_ICON />
                                        </Button>
                                    </>
                                )}
                                renderBody={renderBody}
                            />
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default AsideFeedSection
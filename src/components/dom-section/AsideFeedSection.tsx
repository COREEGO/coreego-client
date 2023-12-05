import { NavLink } from "react-router-dom"
import SearchFilter from "../../pages/components/filters/SearchFilter"
import { CONTAINER_SIZE } from "../../utils/variables"
import TitleText from "../texts/TitleText"
import { useSelector } from "react-redux"
import { useFilterContext } from "../../contexts/FilterProvider"
import { FILTER_ICON } from "../../utils/icon"
import ModalWrapper from "../Modals/ModalWraper"
import RadioGroupInput from "../inputs/RadioGroupInput"
import { Box, Button, Container, Stack } from "@mui/material"

interface AsideFeedSectionInterface {
    title: string,
    renderFilterBody: () => React.ReactNode
}

const AsideFeedSection: React.FC<AsideFeedSectionInterface> = ({ renderFilterBody, title }) => {

    return (
        <>
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
                            >
                                {renderFilterBody()}
                            </ModalWrapper>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}

export default AsideFeedSection
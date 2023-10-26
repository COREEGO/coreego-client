import React from "react";
import logo from '../images/svgs/coreego-logo.svg'
import { Box, CircularProgress, Stack } from "@chakra-ui/react";

interface Props {
    type: 'app' | 'page' | 'data'
}

const LoadingPage: React.FC<Props> = ({ type }) => {


    function Page() {
        return (
            <Stack
                alignItems="center"
                position="fixed"
                justifyContent="center"
                zIndex={2000}
                bg="white"
                top={0}
                bottom={0}
                h="100vh"
                w="100vw"
            >
                <CircularProgress isIndeterminate color='green.300' />
            </Stack>
        )
    }

    function Data() {
        return (
            <Stack width="100%" justifyContent="center">
                <Box mx="auto">
                    <CircularProgress isIndeterminate color='green.300' />
                </Box>
            </Stack>
        )
    }

    function App() {
        return (
            <Stack alignItems="center"
                position="fixed"
                justifyContent="center"
                zIndex={2000}
                top={0}
                bottom={0}
                bg="white"
                h="100vh"
                w="100vw">
                <img src={logo} width={300} height="auto" />
            </Stack>
        )
    }

    return (
        <>
            {type === 'data' && <Data />}
            {type === 'page' && <Page />}
            {type === 'app' && <App />}
        </>
    )

}

export default LoadingPage
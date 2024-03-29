import React from "react";
import logo from '../images/svgs/coreego-logo.svg'
import { Box, CircularProgress, Stack } from "@mui/material";

interface Props {
    type: 'app' | 'page' | 'data'
}

const LoadingPage: React.FC<Props> = ({ type }) => {


    function Page() {
        return (
            <Stack
                component="span"
                direction="row"
                sx={{
                    alignItems: 'center',
                    position: "fixed",
                    justifyContent: "center",
                    zIndex: 100,
                    bgcolor: "white",
                    top: 0,
                    bottom: 0,
                    height: "100vh",
                    width: "100vw"
                }}
            >
                <CircularProgress />
            </Stack>
        )
    }

    function Data() {
        return (
            <Stack width="100%" justifyContent="center" direction="row">
                    <CircularProgress />
            </Stack>
        )
    }

    function App() {
        return (
            <Stack
                sx={{
                    alignItems: 'center',
                    position: "fixed",
                    justifyContent: "center",
                    zIndex: 2000,
                    bgColor: "white",
                    top: 0,
                    bottom: 0,
                    height: "100vh",
                    width: "100vw"
                }}
            >
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
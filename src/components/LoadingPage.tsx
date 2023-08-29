import React from "react";
import logo from '../images/svgs/coreego-logo.svg'
import { CircularProgress, Stack } from "@chakra-ui/react";

interface Props{
    type: 'app' | 'page'
}

const LoadingPage : React.FC<Props> = ({type}) => (
    <Stack alignItems="center" style={{
        position: 'fixed',
        justifyContent: "center",
        zIndex: 2000,
        width: '100vw',
        height: '100vh'
    }}>
        <Stack direction="column" sx={{ textAlign: 'center' }}>
            {type === 'app' ?
                <img src={logo} width={300} height="auto" />
                :
                <CircularProgress isIndeterminate color='green.300' />}
        </Stack>
    </Stack>
)

export default LoadingPage
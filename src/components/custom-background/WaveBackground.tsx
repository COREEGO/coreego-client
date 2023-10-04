import { Box, Divider } from "@chakra-ui/react"
import wave from '../../images/svgs/wave.svg'


const WaveBackground = () => {
    return (
        <Box backgroundImage={wave}
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        width="100%"
        position="absolute"
        left={0}
        top={0}
        zIndex={-1}
        height="50vh"
        >
        </Box>
    )
}

export default WaveBackground
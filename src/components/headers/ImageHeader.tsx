import { Box } from "@mui/material"


interface ImageHeaderInterface {
    imgUrl: string
}

const ImageHeader: React.FC<ImageHeaderInterface> = ({ imgUrl }) => {

    return (
        <Box
            sx={{
                backgroundImage: imgUrl,
                height: { xs: 150, md: 300 }, backgroundPosition: 'bottom', position: 'relative', backgroundSize: 'cover'
            }}>
        </Box>
    )

}

export default ImageHeader
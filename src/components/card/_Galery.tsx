import { Box, Center, Grid, GridItem, Image, Stack } from "@chakra-ui/react"



interface GaleryInterface {
    images: Array<any>
}

const Galery: React.FC<GaleryInterface> = ({ images }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const repeatNb = images.length > 1 ? 2 : 1

    const imgToLoad = images.filter((image: any, index: number) => (images.length > 4 ? index < 4 : index >= 0))

    const imageHeight = imgToLoad.length > 2 ? '50%' : '100%'
    const imageWidth = imgToLoad.length > 1 ? '50%' : '100%'

    return (
        <Stack spacing={0} flexWrap="wrap" direction="row" h="100%" w="100%">
            {
                imgToLoad.map((image: any) => {
                    return <Image p={0.5} borderRadius="md" key={image.id} w={imageWidth} h={imageHeight} objectPosition="center" objectFit="cover" src={BASE_URL + image.filePath} />
                })
            }
        </Stack>

    )

}

export default Galery
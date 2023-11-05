import { Box, Center, Grid, GridItem, HStack, Image, Stack, Wrap } from "@chakra-ui/react"



interface PropsInterface {
    images: Array<any>
}

const GaleryImages: React.FC<PropsInterface> = ({ images }) => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const imgToLoad = images.filter((image: any, index: number) => (images.length > 4 ? index < 4 : index >= 0))

    const imageHeight = imgToLoad.length > 2 ? '50%' : '100%'
    const imageWidth = imgToLoad.length > 1 ? '50%' : '100%'

    return (
        <HStack flexWrap={"wrap"} h="100%" w="100%" spacing={0}>
            {
                imgToLoad.map((image: any) => {
                    return <Image p={0.5} borderRadius="md" key={image.id} w={imageWidth} h={imageHeight} objectPosition="center" objectFit="cover" src={BASE_URL + image.filePath} />
                })
            }
        </HStack>

    )

}

export default GaleryImages
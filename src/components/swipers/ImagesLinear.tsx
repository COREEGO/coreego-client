import { Stack, Image } from "@chakra-ui/react"
import { BASE_URL } from "../../utils/variables"

interface ImagesLinearInterface {
    images: Array<any>
}

const ImagesLinear: React.FC<ImagesLinearInterface> = ({images}) => {

    return (
        <>
            {
                images.length &&
                <Stack direction="row" flexWrap="wrap">
                    {
                        images.map((image: any) => {
                            return (
                                <Image key={image.id} maxH={300} w={300} maxW="100%" src={BASE_URL + image.filePath} />
                            )
                        })
                    }
                </Stack>
            }
        </>
    )
}

export default ImagesLinear
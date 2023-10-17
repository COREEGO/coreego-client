import { Box, Button, Center, Flex, IconButton, Image, Input, Stack, Text } from "@chakra-ui/react"
import { MdImage } from "react-icons/md"
import useFile from "../../../hooks/useFile"
import { useEffect } from "react"
import { FaTrashCan } from "react-icons/fa6";


interface UploadImageModuleInterface {
    onChangeFile: Function
}

const UploadImageModule: React.FC<UploadImageModuleInterface> = ({ onChangeFile }) => {

    const { files, addFile, removeFile } = useFile()

    useEffect(() => {
        onChangeFile(files)
    }, [files])


    return (
        <Flex gap='2' flexWrap="wrap">
            {
                files.map((file: any, index: number) => {
                    return <Stack alignItems="flex-start">
                        <Image borderRadius="md" w={100} h={100} objectFit="cover" src={file.url} key={index} />
                        <IconButton mt={-7} colorScheme="red" onClick={() => removeFile(index)} icon={<FaTrashCan />} aria-label={"button suppression d'une image"} />
                    </Stack>
                })
            }
            <Box borderRadius="md" border="3px dashed grey" w={100} h={100} position="relative">
                <Input accept="image/*" multiple onChange={(file: any) => addFile(file.target.files)} opacity={0} border="none" type="file" position="absolute" left={0} top={0} h="100%" w="100%" />
                <Center justifyContent="center" h="100%">
                    <MdImage size={50} color="grey" />
                </Center>
            </Box>
        </Flex>
    )
}


export default UploadImageModule
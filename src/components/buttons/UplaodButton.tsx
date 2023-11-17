import { Box } from "@chakra-ui/react"

interface PropsInterface{
    children: React.ReactNode,
    sx?: any
    onChange: (e:any) => {}
}

const UpladButton: React.FC<PropsInterface> = ({children, onChange, sx}) => {

    return (
        <Box {...sx} cursor={"pointer"} w="auto" as="span" position={"relative"}>
            <Box opacity={0} w="100%" zIndex={10} right={0} position={"absolute"} left={0} as="input" type="file" multiple={false} onChange={onChange}></Box>
            {children}
        </Box>
    )

}

export default UpladButton
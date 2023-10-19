import { Container } from "@chakra-ui/react"
import { CONTAINER_SIZE } from "../../utils/variables"



const ContainerSection : React.FC<{children: React.ReactNode, withPadding?: boolean}> = ({children, withPadding = false}) => {

    return (
        <Container maxW={CONTAINER_SIZE} px={withPadding ? undefined : {base: 0, md: 4} }>
            {children}
        </Container>
    )
}

export default ContainerSection
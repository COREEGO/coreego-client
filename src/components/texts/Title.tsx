import { Heading } from "@chakra-ui/react"

const Title : React.FC<{text:string}> = ({text }) => {
    return (
        <Heading as="h1" fontSize={{ md: 'xl' }}> {text} </Heading>
    )
}

export default Title
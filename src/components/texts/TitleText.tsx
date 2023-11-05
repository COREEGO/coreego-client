import { Heading } from "@chakra-ui/react"

const TitleText : React.FC<{text:string}> = ({text }) => {
    return (
        <Heading as="h1" fontSize={{base: 'xl', md: '2xl'}}> {text} </Heading>
    )
}

export default TitleText
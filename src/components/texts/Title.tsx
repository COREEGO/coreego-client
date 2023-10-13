import {Text} from '@chakra-ui/react'

const Title : React.FC<{children: React.ReactNode}> = ({children }) => {
    return (
        <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" > {children} </Text>
    )
}

export default Title
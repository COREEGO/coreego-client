import {Text} from '@chakra-ui/react'

const Title : React.FC<{children: React.ReactNode, color?: string }> = ({children, color = 'black' }) => {
    return (
        <Text as="h1" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="500" color={color} > {children} </Text>
    )
}


export default Title
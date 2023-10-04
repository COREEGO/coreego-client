import {Text} from '@chakra-ui/react'

const TitlePageUx : React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <Text as="b" fontSize="large" color="white" > {children} </Text>
    )
}


export default TitlePageUx
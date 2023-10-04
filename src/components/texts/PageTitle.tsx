import {Text} from '@chakra-ui/react'

const PageTitle : React.FC<{children: React.ReactNode, color?: string }> = ({children, color = "var(--coreego-blue)"}) => {
    return (
        <Text as="h1" fontWeight="bold" fontSize="3xl" color={color} > {children} </Text>
    )
}


export default PageTitle
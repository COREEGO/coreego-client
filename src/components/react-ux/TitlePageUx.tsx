import {Text} from '@chakra-ui/react'

interface TitlePageUxProps{
    title: string
}

const TitlePageUx : React.FC<TitlePageUxProps> = ({title}) => {
    return (
        <Text as="b" fontSize="large" color="white" > {title} </Text>
    )
}


export default TitlePageUx
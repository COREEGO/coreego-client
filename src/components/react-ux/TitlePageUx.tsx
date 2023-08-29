import {Text} from '@chakra-ui/react'

interface TitlePageUxProps{
    title: string
}

const TitlePageUx : React.FC<TitlePageUxProps> = ({title}) => {
    return (
        <Text as="b" fontSize="2xl" color="var(--coreego-blue)" > {title} </Text>
    )
}


export default TitlePageUx
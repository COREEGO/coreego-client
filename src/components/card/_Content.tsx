import { Text } from "@chakra-ui/react"

interface ContentInterface {
    text: string,
    type: 'title' | 'content',
    mode: 'feed' | 'detail',
}

const Content: React.FC<ContentInterface> = ({ text, mode, type }) => {

    return (
        <>
            {
                type === 'title' ?
                    <Text as={mode === 'detail' ?  'h1' : 'h2' } fontWeight={500} noOfLines={mode === 'feed' ? 1 : undefined}> {text} </Text>
                    :
                    <Text whiteSpace={mode === 'feed' ? 'initial' : 'pre-line'} noOfLines={mode === 'feed' ? 2 : undefined}> {text} </Text>
            }
        </>
    )
}

export default Content
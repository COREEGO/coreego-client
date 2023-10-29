import { Box, Divider, Stack, Text } from "@chakra-ui/react"

interface SectionModalInterface{
    children: React.ReactNode,
    title: string
}

const SectionModal : React.FC<SectionModalInterface> = ({children, title}) => {

    return (
        <Stack>
            <Text as="b"> {title} </Text>
            {children}
        </Stack>
    )
}

export default SectionModal
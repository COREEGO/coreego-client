import { Avatar, Stack, Text } from "@chakra-ui/react"

interface AvatarUxProps {
    size?: 'sm' | 'md' | 'xs',
    user?: any
}

const AvatarUx: React.FC<AvatarUxProps> = ({ size = 'sm', user }) => {



    return (
        <Stack direction="row" alignItems="center">
            <Avatar size={size} />
            <Text as="b" fontSize="xs">pseudo</Text>
        </Stack>
    )

}

export default AvatarUx
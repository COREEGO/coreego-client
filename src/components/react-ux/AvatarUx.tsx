import { Avatar, Stack, Text } from "@chakra-ui/react"

interface AvatarUxProps {
    size?: 'sm' | 'md' | 'xs',
    user?: any
}

const AvatarUx: React.FC<AvatarUxProps> = ({ size = 'sm', user }) => {

    return (
        <Avatar size={size} />
    )

}

export default AvatarUx
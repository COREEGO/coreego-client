import { Avatar } from "@chakra-ui/react"

interface AvatarUxProps{
    size?: 'sm' | 'md' | 'xs'
}

const AvatarUx : React.FC<AvatarUxProps> = ({size = 'sm' }) => {

    return (
        <Avatar size={size} />
    )

}

export default AvatarUx
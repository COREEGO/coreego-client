import { Avatar, Stack, Text } from "@chakra-ui/react"
import { BASE_URL } from "../../utils/variables"

interface AvatarUxProps {
    size?: any,
    user?: any
}

const AvatarUx: React.FC<AvatarUxProps> = ({ size = 'sm', user }) => {

    return (
        <Avatar size={size} src={BASE_URL + user?.avatar} />
    )

}

export default AvatarUx
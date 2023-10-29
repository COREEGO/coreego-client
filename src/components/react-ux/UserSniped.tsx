import { Avatar, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import { BASE_URL } from "../../utils/variables"
import { dateParse } from "../../utils"

interface UserSnipedInterface {
    avatar: string,
    pseudo?: string,
    publishDate?: Date
}

const UserSniped: React.FC<UserSnipedInterface> = ({ avatar, pseudo, publishDate }) => {

    return (
        <HStack>
            <Avatar size="sm" src={BASE_URL + avatar} />
            {
                (pseudo || publishDate) && <Stack spacing={0}>
                    {pseudo && <Text as="span" noOfLines={1}>{pseudo}</Text>}
                    {publishDate && <Text as="small" color="gray">{dateParse(publishDate)}</Text>}
                </Stack>
            }
        </HStack>
    )

}

export default UserSniped
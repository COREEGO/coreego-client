import { Avatar, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { dateParse } from "../../utils";

interface UsserInfoInterface {
    user: any,
    size?: any,
    date?: Date,
}

const UserInfo: React.FC<UsserInfoInterface> = ({ user, size, date }) => {

    return (
        <Stack direction="row" alignItems="center" as="span">
            <Avatar size={size} />
            <Text noOfLines={1} as="b" fontSize={size} m={0} p={0}> {user.pseudo} </Text>
        </Stack>
    )
}

export default UserInfo

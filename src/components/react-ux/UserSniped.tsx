import { BASE_URL } from "../../utils/variables"
import { dateParse } from "../../utils"
import { Avatar, Stack, Typography } from "@mui/material"

interface UserSnipedInterface {
    avatar: string,
    pseudo?: string,
    publishDate?: Date,
    size?: string,
    styles?: any
}

const UserSniped: React.FC<UserSnipedInterface> = ({ avatar, pseudo, publishDate, size = "sm", styles }) => {

    return (
        <Stack spacing={1} direction={"row"} alignItems={"center"}>
            <Avatar {...styles} size={size} src={BASE_URL + avatar} />
            {
                (pseudo || publishDate) && <Stack spacing={0}>
                    {pseudo && <Typography component="span" noWrap={true}>{pseudo}</Typography>}
                    {publishDate && <Typography component="span" color="gray">{dateParse(publishDate)}</Typography>}
                </Stack>
            }
        </Stack>
    )

}

export default UserSniped
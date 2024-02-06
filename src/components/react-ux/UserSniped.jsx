import { AVATAR_PATH, BASE_URL } from "../../utils/variables"
import { dateParse } from "../../utils"
import { Avatar, Stack, Typography } from "@mui/material"



const UserSniped = ({avatarSize = 40, avatar, pseudo = '', publishDate = null, styles = {}, ...props}) => {

    return (
        <Stack spacing={1} direction={"row"} alignItems={"center"} {...props}>
            <Avatar sx={{height: avatarSize, width: avatarSize}}  src={AVATAR_PATH +  avatar} />
            {
                (pseudo || publishDate) && <Stack spacing={0}>
                    {pseudo && <Typography fontWeight="bold" component="span" noWrap={true}>{pseudo}</Typography>}
                    {publishDate && <Typography component="span" color="gray">{dateParse(publishDate)}</Typography>}
                </Stack>
            }
        </Stack>
    )

}

export default UserSniped
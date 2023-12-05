
import { IconButton, VStack, Text } from "@chakra-ui/react";
import { Button } from "@mui/material";
import { BsShare } from "react-icons/bs";
import { SHARE_ICON } from "../../utils/icon";



const ShareButton = () => {

    return (
        <Button color="primary" sx={{widht:"fit-content"}} variant="outlined">
            <SHARE_ICON />
        </Button>
    )
}

export default ShareButton
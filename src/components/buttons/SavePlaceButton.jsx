
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import { useAuthContext } from "../../contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { apiFetch } from "../../http-common/apiFetch";
import { IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { SAVED_PLACE_ICON, UNSAVED_PLACE_ICON } from "../../utils/icon";


const SavePlaceButton = ({ showLabel = false, placeId, users, mutate }) => {

    const [activeStep, setActiveStep] = React.useState(0);

    const [isBusy, setIsBusy] = useState(false)
    const { user : auth } = useAuthContext();

    const existPlace = React.useMemo(() => {
        return users.find((user) => user?.id === auth.id) ? true : false
    }, [users, placeId])

    const handleClick = async () => {
        try {
            setIsBusy(true)
            const response = await apiFetch('/save-place', 'POST', {
                place_id: placeId,
            }, true)

            if (response) {
                toast.success(response.message)
                mutate()
            }

        } catch (error) {
            toast.error(error.message.message)
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <LoadingButton
            loading={isBusy}
            variant="outlined"
            color="success"
            sx={{ widht: "fit-content" }}
            onClick={handleClick}
        >
            {existPlace ? <SAVED_PLACE_ICON /> : <UNSAVED_PLACE_ICON />}
        </LoadingButton>
    )
}

export default SavePlaceButton
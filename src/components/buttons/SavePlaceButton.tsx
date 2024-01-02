
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import { useAuthContext } from "../../contexts/AuthProvider";
import React, { useEffect, useState } from "react";
import { findMatchingUser } from "../../utils";
import { apiFetch } from "../../http-common/apiFetch";
import { IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { SAVED_PLACE_ICON, UNSAVED_PLACE_ICON } from "../../utils/icon";

interface SavePlaceButtonInterfcae {
    placeId: any,
    savedPlaces: Array<any>,
    mutate: Function,
    showLabel?: boolean
}

const SavePlaceButton: React.FC<SavePlaceButtonInterfcae> = ({ showLabel = false, placeId, savedPlaces, mutate }) => {

    const [isBusy, setIsBusy] = useState<boolean>(false)
    const { user }: any = useAuthContext();

    const existPlace = React.useMemo(() => {
        return savedPlaces.find((place: any) => place?.user?.id === user.id) ? true : false
    }, [savedPlaces, placeId])


    const handleClick = async () => {
        try {
            setIsBusy(true)
            const response: any = await apiFetch('/saved-place', 'POST', {
                place_id: placeId,
            }, true)

            if (response) {
                toast.success(response.message)
                mutate()
            }

        } catch (error: any) {
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
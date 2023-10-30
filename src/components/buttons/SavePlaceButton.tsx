
import { IconButton, VStack, Text, useToast } from "@chakra-ui/react";
import { BsBookmark, BsBookmarkStarFill } from "react-icons/bs";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { userAlreadyTaken } from "../../utils";
import { apiFetch } from "../../http-common/apiFetch";

interface SavePlaceButtonInterfcae {
    placeId: any,
    savedPlaces: Array<any>,
    mutate: Function,
    showLabel?: boolean
}

const SavePlaceButton: React.FC<SavePlaceButtonInterfcae> = ({ showLabel = false, placeId, savedPlaces, mutate }) => {

    const { user }: any = useAuthContext();

    const [userSavedPlace, setUserSavedPlace] = useState<any>(null);

    const [isBusy, setIsBusy] = useState<boolean>(false)

    const toast = useToast()

    useEffect(() => {
        const alreadyTaken = userAlreadyTaken(savedPlaces, user)
        setUserSavedPlace(alreadyTaken || null);
    }, [savedPlaces, user.id]);

    const handleClick = async () => {
        try {
            setIsBusy(true)
            if(userSavedPlace){
                await apiFetch('/saved_places/' + userSavedPlace.id, 'DELETE')
                setUserSavedPlace(null)
                toast({
                    description: "Place non enregistré",
                    status: 'success'
                })
            }else{
                await apiFetch('/saved_places', 'POST', {
                    place: '/api/places/' + placeId
                })
                setUserSavedPlace(user)
                toast({
                    description: "Place enregistré",
                    status: 'success'
                })
            }
            mutate()
        } catch (error:any) {
            toast({
                description: JSON.parse(error.message),
                status: 'error'
            })
        } finally {
            setIsBusy(false)
        }
    }

    return (
        <VStack>
            <IconButton color="var(--coreego-blue)"
                isDisabled={isBusy}
                onClick={handleClick}
                borderColor="var(--coreego-blue)"
                colorScheme="twitter"
                isRound
                variant="outline"
                icon={userSavedPlace ?<BsBookmarkStarFill /> : <BsBookmark />}
                aria-label={"save place button"}
            />
            {showLabel && <Text as="small"> Enregistrer </Text>}
        </VStack>
    )
}

export default SavePlaceButton
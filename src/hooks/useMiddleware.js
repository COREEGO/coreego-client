import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider"




export default function useMiddleware()
{
    const {auth} = useAuthContext()
    const navigate = useNavigate();

    function owner(userId)
    {
        if(userId !== auth.id) navigate('/')
    }

    const canEdit = (userId) => {
        if(userId !== auth.id && !auth.role.is_admin) navigate('/')
    }

    return {
        owner,
        canEdit
    }
}
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingPage from "../../components/LoadingPage"
import { Image, Input, useToast } from "@chakra-ui/react";
import UserSniped from "../../components/react-ux/UserSniped";
import useFile from "../../hooks/useFile";
import { useAuthContext } from "../../contexts/AuthProvider";


interface PropsInterface {
    profil: any
}

const ProfilEditPage: React.FC<PropsInterface> = ({ profil }) => {


    const { user, setUser }: any = useAuthContext()
    const params = useParams()

    const { files, addFile } = useFile()

    useEffect(() => {
        if (files.length > 0) {
            handleFileUpload();
            console.log(files[0])
        }
    }, [files])


    const toast = useToast()

    const onChangeFile = async (e: any) => {
        try {
            await addFile(e.target.files, false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", files[0].file, files[0].file.name);
            await apiFetch(`/profil/${profil.id}/avatar`, 'post', formData)
            const responseProfil = await apiFetch(`/profil/${profil.id}`, 'get');
            if(responseProfil) profil = responseProfil
            const currentUser = await apiFetch("/me", "get");
            setUser(currentUser);
            toast({
                description: "Image ajoutée avec succès",
                status: "success",
            });
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <>
            <UserSniped avatar={profil.user.avatarUrl} size="2xl" />
            <Input accept="image/*" multiple={false} type="file" onChange={onChangeFile} />
        </>
    )

}


export default ProfilEditPage
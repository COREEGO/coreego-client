import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { apiFetch } from "../../http-common/apiFetch"
import UserSniped from "../../components/react-ux/UserSniped";
import useFile from "../../hooks/useFile";
import { useAuthContext } from "../../contexts/AuthProvider";
import UpladButton from "../../components/buttons/UplaodButton";
import { VERTICAL_SPACING } from "../../utils/variables";
import ContainerSection from "../components/ContainerSection";
import { CAMERA_ICON, DISLIKE_ICON, EDIT_ICON, FACEBOOK_ICON, INSTAGRAM_ICON, KAKAO_ICON, LANGUAGE_ICON, LIKE_ICON, LOCALISATION_ICON, OCCUPATION_ICON, TIKTOK_ICON, YOUTUBE_ICON } from "../../utils/icon";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ModalWrapper from "../../components/Modals/ModalWraper";
import { useSelector } from "react-redux";
import { getValueFiltered } from "../../utils";
import { NavLink } from "react-router-dom";
import { Avatar, Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingPage from "../../components/LoadingPage";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";


interface PropsInterface {
    profil: any,
    mutate: Function
}

type Inputs = {
    introduction: string
    hobby: string,
    youtube: string,
    facebook: string,
    instagram: string,
    city_id: number,
    district_id: number,
    languages: Array<any>,
    kakao: string,
    occupation: string,
    tiktok: string
}

const Informations: React.FC<PropsInterface> = ({ profil, mutate }) => {

    const params = useParams()
    const { languages } = useSelector((state: any) => state.app)
    const [languageTextInput, setLanguageTextInput] = useState<string>('')
    const [languagesFiltered, setLanguagesFiltered] = useState(languages)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            introduction: profil.profil.introduction,
            hobby: profil.profil.hobby,
            youtube: profil.profil.youtube,
            facebook: profil.profil.facebook,
            instagram: profil.profil.instagram,
            city_id: profil.profil.city_id,
            district_id: profil.profil.district_id,
            languages: profil.profil.languages,
            kakao: profil.profil.kakao,
            tiktok: profil.profil.tiktok,
            occupation: profil.profil.occupation,
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {

        try {
            await apiFetch(`/profil/edit`, 'patch', {
                introduction: data.introduction,
                city_id: data.city_id,
                district_id: data.district_id,
                hobby: data.hobby,
                youtube: data.youtubelink,
                facebook: data.facebooklink,
                instagram: data.instagramlink,
                kakaolink: data.kakaolink,
                tiktoklink: data.tiktoklink,
                languages: data.languages,
                occupation: data.occupation
            }, true)

            toast.success('Profil mis à jour')
            mutate()

        } catch (error: any) {
            toast.error(error.message)
        }
    }


    return (
        <Stack>
            <Typography variant="h5" fontWeight="bold">Modification du profil</Typography>
            <Stack spacing={2}>
                <Stack spacing={1} alignItems="start">
                    <Typography variant="h6" fontWeight={500} fontSize={"xl"}>Introduction</Typography>
                    {<Typography> {profil.profil.introduction ? profil.profil.introduction : <em>"Présentez vous en quelques lignes"</em>} </Typography>}
                    <ModalWrapper
                        id="introduction"
                        title={<>Introduction</>}
                        renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                        renderBody={() => (
                            <Stack spacing={2} width={500} maxWidth="100%" component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={10}
                                    {...register('introduction')} />
                                <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                            </Stack>
                        )}
                    />
                </Stack>
                <List>
                    <ListItem disableGutters
                        secondaryAction={
                            <ModalWrapper
                                id="occupation"
                                title={<>Profession</>}
                                renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                renderBody={() => (
                                    <Stack spacing={2} width={500} maxWidth="100%" component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                        <TextField
                                            fullWidth
                                            {...register('occupation')} />
                                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                    </Stack>
                                )}
                            />
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                                <OCCUPATION_ICON />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Profession"
                            secondary={profil.profil.occupation}
                        />
                    </ListItem>

                    <ListItem disableGutters
                        secondaryAction={
                            <ModalWrapper
                                id="hobby"
                                title={<>Ce que j'aime</>}
                                renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                renderBody={() => (
                                    <Stack spacing={2} width={500} maxWidth="100%" component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                        <TextField
                                            fullWidth
                                            {...register('hobby')} />
                                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                    </Stack>
                                )}
                            />
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                                <LIKE_ICON />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Ce que j'aime"
                            secondary={profil.profil.hobby}
                        />
                    </ListItem>

                    <ListItem disableGutters
                        secondaryAction={
                            <ModalWrapper
                                id="localisation"
                                title={<>Localisation</>}
                                renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                renderBody={() => (
                                    <Stack spacing={2} width={500} maxWidth="100%" component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                        <Controller
                                            control={control}
                                            name="district_id"
                                            render={() => (
                                                <Stack spacing={2} pt={1} width="100%" alignItems="end">
                                                    <CityDistrictSelectInput
                                                        cityValue={profil.profil?.city?.id || ''}
                                                        districtValue={profil.profil?.district?.id || ''}
                                                        updateCity={(e: any) => setValue('city_id', e)}
                                                        updateDistrict={(e: any) => setValue('district_id', e)}
                                                        showMap={true}
                                                    />
                                                    <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                </Stack>
                                            )}
                                        />
                                    </Stack>
                                )}
                            />
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                                <LOCALISATION_ICON />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Localisation"
                            secondary={`
                                ${profil.profil?.city?.label || ''}
                                ${profil.profil?.city?.label && profil.profil?.district?.label ? ',' : ''}
                                ${profil.profil?.district?.label || ''}
                            `}
                        />
                    </ListItem>

                    <ListItem disableGutters
                        secondaryAction={
                            <ModalWrapper
                                id="Langues parlées"
                                title={<>Langues que je parle</>}
                                renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                renderBody={() => (
                                    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2} width={500} maxWidth="100%">
                                        <Controller
                                            control={control}
                                            name="languages"
                                            render={({ field: { onChange, value } }) => (
                                                <FormGroup>
                                                    {languages.map((language: any) => (
                                                        <FormControlLabel
                                                            key={language.id}
                                                            sx={{ justifyContent: 'space-between' }}
                                                            control={
                                                                <Checkbox
                                                                    checked={value.includes(language.label)}
                                                                    onChange={(e: any) => {
                                                                        const selectedLanguages = value.includes(language.label)
                                                                            ? value.filter((lang) => lang !== language.label)
                                                                            : [...value, language.label];
                                                                        onChange(selectedLanguages);
                                                                    }}
                                                                    value={language.label}
                                                                    name={language.label}
                                                                />
                                                            }
                                                            label={language.label}
                                                        />
                                                    ))}
                                                </FormGroup>
                                            )}
                                        />
                                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                    </Stack>
                                )}
                            />
                        }
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                                <LANGUAGE_ICON />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Langues parlées"
                            secondary={profil.profil.languages.length ? profil.profil.languages.join(' , ') : ''}
                        />
                    </ListItem>
                </List>
            </Stack>
            <Divider />
            <List>
                <ListItem disableGutters
                    secondaryAction={
                        <ModalWrapper
                            id="youtube"
                            title={<>Youtube</>}
                            renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                            renderBody={() => (
                                <Stack spacing={2} width={500} maxWidth="100%" component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                    <TextField
                                        fullWidth
                                        {...register('youtube')} />
                                    <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                </Stack>
                            )}
                        />
                    }
                >
                    <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "#FF0000" }}>
                            <YOUTUBE_ICON />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Youtube"
                        secondary={profil.profil.youtube}
                    />
                </ListItem>
            </List>
        </Stack>

    )
}



const ProfilEditPage = () => {
    const { authentification, user }: any = useAuthContext()
    const [isUploadBusy, setIsUploadBusy] = useState<boolean>(false)
    const params = useParams()
    const { files, addFile, clearFiles } = useFile()

    const [isBusy, setIsBusy] = useState<boolean>(true)
    const [profil, setProfil] = useState<any>(null)

    useEffect(() => {
        loadProfil()
    }, [])

    const loadProfil = async () => {
        try {
            const userProfil: any = await apiFetch(`/user/profil/${user.id}`, 'GET', null, true)
            if (userProfil) {
                setProfil(userProfil)
            }
        } catch (error) {

        } finally {
            setIsBusy(false)
        }
    }


    useEffect(() => {
        if (files.length > 0) {
            handleFileUpload();
        }
    }, [files])

    const onChangeFile = async (e: any) => {
        try {
            await addFile(e.target.files, false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleFileUpload = async () => {
        try {
            setIsUploadBusy(true)
            const formData = new FormData();
            formData.append("avatarPath", files[0].file);
            await apiFetch(`/user/edit-avatar`, 'post', formData, true)
            clearFiles()

            await loadProfil()
            await authentification()

        } catch (error: any) {
            console.log(error);
        } finally {
            setIsUploadBusy(false)
        }
    };

    return isBusy ? <LoadingPage type="page" /> : <Box my={3}>
        <Container maxWidth="lg">
            <Box sx={{ width: { xs: 600, md: '100%' }, margin: 'auto' }} maxWidth="100%" >
                <Grid
                    spacing={5}
                    container
                >
                    <Grid item xs={12}
                        md={4}
                    >
                        <Stack justifyContent="center" alignItems="center">
                            <UserSniped styles={{ width: 150, height: 150 }} avatar={profil.avatarPath} />
                            <Box sx={{ mt: -3 }}>
                                <UpladButton multiple={false} onChange={(e: any) => onChangeFile(e)}>
                                    <LoadingButton loading={isUploadBusy} variant={"outlined"} sx={{ backgroundColor: 'white' }} startIcon={<CAMERA_ICON />}>Modifier</LoadingButton>
                                </UpladButton>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={2}>
                            <Informations profil={profil} mutate={loadProfil} />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Container>


        <Box sx={{ position: 'sticky', backgroundColor: 'white', py: 3, bottom: 0 }} >
            <Container maxWidth="lg">
                <Stack alignItems="end">
                    <NavLink to={`/user/profil/${user.id}`}>
                        <Button variant="contained" sx={{ backgroundColor: 'black' }} >Ok</Button>
                    </NavLink>
                </Stack>
            </Container>
        </Box>
    </Box >


}


export default ProfilEditPage
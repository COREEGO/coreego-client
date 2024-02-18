import React, { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";
import { apiFetch } from "../../http-common/apiFetch";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import LoadingPage from "../LoadingPage";
import { NavLink, useSearchParams } from "react-router-dom";
import { Avatar, Box, Button, Divider, Checkbox, Container, FormControlLabel, FormGroup, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography, ListItemButton } from "@mui/material";
import UserSniped from "../react-ux/UserSniped";
import useFile from "../../hooks/useFile";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import UpladButton from "../buttons/UplaodButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { CAMERA_ICON, EDIT_ICON, FACEBOOK_ICON, FORUM_ICON, INSTAGRAM_ICON, KAKAO_ICON, LANGUAGE_ICON, LIKE_ICON, LINK_ICON, LOCALISATION_ICON, LOGOUT_ICON, MARKET_PLACE_ICON, OCCUPATION_ICON, TIKTOK_ICON, TRAVEL_ICON, UNSAVED_PLACE_ICON, YOUTUBE_ICON } from "../../utils/icon";
import ModalWrapper from "../Modals/ModalWraper";
import CityDistrictSelectInput from "../inputs/CityDistrictSelectInput";
import { useSelector } from "react-redux";
import { facebookLink, instagramLink, tiktokLink, youtubeLink } from "../../utils";
import { Icon } from "leaflet";
import useMalware from "../../hooks/useMalware";

interface PropsInterface {
    isEditMode?: boolean
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

const Section: React.FC<{ children: React.ReactNode, showChildren: boolean }> = ({ children, showChildren }) => {
    return <React.Fragment>
        {showChildren ? children : null}
    </React.Fragment>
}

const ProfilForm: React.FC<PropsInterface> = ({ isEditMode = false }) => {

    const [isBusy, setIsBusy] = React.useState<boolean>(true)
    const [isUploadBusy, setIsUploadBusy] = React.useState<boolean>(false)

    const { languages } = useSelector((state: any) => state.app)

    const params = useParams();
    const { user: auth, authentification, logout }: any = useAuthContext();
    const { files, addFile, clearFiles } = useFile()

    const currentUserProfil = auth ? auth.id == params?.id : false;

    const [profil, setProfil] = React.useState<any>()

    const { owner }: any = useMalware()

    useEffect(() => {
        if (isEditMode && profil) owner(profil.id)
    }, [profil])


    React.useEffect(() => {
        loadProfil()
    }, [])


    const loadProfil = async () => {
        try {
            const response: any = await apiFetch(`/user/profil/${isEditMode ? auth.id : params.id}`, 'GET', null, isEditMode)
            if (response) {
                setProfil(response)
                console.log(response)
            }
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsBusy(false)
        }
    }

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            languages: profil?.profil.languages || []
        }
    })

    useEffect(() => {
        console.log(getValues().occupation)
    }, [profil])

    useEffect(() => {
        setValue('languages', profil?.profil.languages);
    }, [profil]);

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {

        try {
            await apiFetch(`/profil/edit`, 'patch', {
                introduction: data.introduction,
                city_id: data.city_id,
                district_id: data.district_id,
                hobby: data.hobby,
                youtube: data.youtube,
                facebook: data.facebook,
                instagram: data.instagram,
                kakao: data.kakao,
                tiktok: data.tiktok,
                languages: data.languages,
                occupation: data.occupation
            }, true)

            toast.success('Profil mis à jour')
            loadProfil()

        } catch (error: any) {
            toast.error(error.message.message)
        }
    }


    React.useEffect(() => {
        if (isEditMode && files.length > 0) handleFileUpload();
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


    return isBusy ? <LoadingPage type="page" /> :
        <Box my={3}>
            <Container maxWidth="lg">
                <Box sx={{ width: { xs: 600, md: '100%' }, m: 'auto' }} maxWidth="100%" >
                    <Grid
                        spacing={5}
                        container
                    > <Grid item xs={12}
                        md={4}
                    >
                            <Stack direction="column" alignItems="center" spacing={1}>
                                <UserSniped styles={{ width: 150, height: 150 }} avatar={profil.avatarPath} />
                                {!isEditMode ?
                                    <>
                                        <Typography variant="h6" fontWeight="bold" component="h1"> {profil.pseudo} </Typography>
                                        {currentUserProfil ?
                                            <NavLink to={"/user/profil/edit"} >
                                                <Button variant="outlined">
                                                    Modifier mon profil
                                                </Button>
                                            </NavLink>
                                            : <></>
                                        }
                                    </>
                                    :
                                    <UpladButton multiple={false} onChange={(e: any) => onChangeFile(e)}>
                                        <LoadingButton loading={isUploadBusy} variant={"outlined"} sx={{ backgroundColor: 'white' }} startIcon={<CAMERA_ICON />}>Modifier</LoadingButton>
                                    </UpladButton>
                                }
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Stack spacing={1} alignItems="start">
                                <Typography variant="h5" fontWeight="bold">{isEditMode ? 'Modification du profil' : `A propos de ${profil.pseudo}`}</Typography>
                                <Typography variant="h6" fontWeight={500}>Introduction</Typography>
                                <Typography sx={{ whiteSpace: 'pre-line' }}>{profil.profil.introduction}</Typography>
                                {isEditMode ?
                                    <ModalWrapper
                                        id="introduction"
                                        title={<>Introduction</>}
                                        renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                        renderBody={() => (
                                            <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                <TextField
                                                    defaultValue={profil.profil.introduction}
                                                    placeholder="Présentez vous en quelques lignes"
                                                    fullWidth
                                                    multiline
                                                    rows={10}
                                                    {...register('introduction')} />
                                                <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                            </Stack>
                                        )}
                                    />
                                    :
                                    <></>
                                }
                            </Stack>
                            <Stack mt={2}>
                                <Section showChildren={profil.profil.occupation !== null || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ? <ModalWrapper
                                                id="occupation"
                                                title={<>Profession</>}
                                                renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                renderBody={() => (
                                                    <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                        <TextField
                                                            defaultValue={profil.profil.occupation}
                                                            placeholder="Que faites vous dans la vie ?"
                                                            fullWidth
                                                            {...register('occupation')} />
                                                        <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                    </Stack>
                                                )}
                                            /> : <></>
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
                                </Section>

                                <Section showChildren={profil.profil.hobby !== null || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="hobby"
                                                    title={<>Ce que j'aime</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} maxWidth="100%" component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                            <TextField
                                                                defaultValue={profil.profil.hobby}
                                                                placeholder="Quelles sont vos passion ?"
                                                                fullWidth
                                                                {...register('hobby')} />
                                                            <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                        </Stack>
                                                    )}
                                                /> : <></>
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
                                </Section>
                                <Section showChildren={(profil.profil?.city !== null && profil.profil?.district !== null) || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="localisation"
                                                    title={<>Localisation</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
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
                                                /> : <></>
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
                                </Section>

                                <Section showChildren={profil.profil.languages.length > 0 || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
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
                                                /> : <></>
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
                                </Section>

                                <Divider sx={{ my: 2 }} />

                                <Section showChildren={profil.profil.youtube || isEditMode}>
                                    <ListItem
                                        disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="youtube"
                                                    title={<>Youtube</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                            <TextField
                                                                defaultValue={profil.profil.youtube}
                                                                placeholder="Nom d'utilisateur Youtube"
                                                                fullWidth
                                                                {...register('youtube')} />
                                                            <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                        </Stack>
                                                    )}
                                                /> : <IconButton component="a" target="__blank" href={youtubeLink(profil.profil.youtube)}>
                                                    <LINK_ICON />
                                                </IconButton>
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
                                </Section>

                                <Section showChildren={profil.profil.facebook || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="facebook"
                                                    title={<>Facebook</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                            <TextField
                                                                defaultValue={profil.profil.facebook}
                                                                placeholder="Nom d'utilisateur facebook"
                                                                fullWidth
                                                                {...register('facebook')} />
                                                            <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                        </Stack>
                                                    )}
                                                /> : <IconButton component="a" target="__blank" href={facebookLink(profil.profil.facebook)}>
                                                    <LINK_ICON />
                                                </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: "#0866FF" }}>
                                                <FACEBOOK_ICON />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Facebook"
                                            secondary={profil.profil.facebook}
                                        />
                                    </ListItem>
                                </Section>

                                <Section showChildren={profil.profil.instagram || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="instagram"
                                                    title={<>Instagram</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                            <TextField
                                                                defaultValue={profil.profil.instagram}
                                                                placeholder="Nom d'utilisateur instagram"
                                                                fullWidth
                                                                {...register('instagram')} />
                                                            <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                        </Stack>
                                                    )}
                                                /> : <IconButton component="a" target="__blank" href={instagramLink(profil.profil.instagram)}>
                                                    <LINK_ICON />
                                                </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: "#F46F30" }}>
                                                <INSTAGRAM_ICON />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Instagram"
                                            secondary={profil.profil.instagram}
                                        />
                                    </ListItem>
                                </Section>

                                <Section showChildren={profil.profil.tiktok || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="tiktok"
                                                    title={<>Tiktok</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                            <TextField
                                                                defaultValue={profil.profil.instagram}
                                                                placeholder="Nom d'utilisateur tiktok"
                                                                fullWidth
                                                                {...register('tiktok')} />
                                                            <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                        </Stack>
                                                    )}
                                                /> : <IconButton component="a" target="__blank" href={tiktokLink(profil.profil.tiktok)}>
                                                    <LINK_ICON />
                                                </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: "black" }}>
                                                <TIKTOK_ICON />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Tiktok"
                                            secondary={profil.profil.tiktok}
                                        />
                                    </ListItem>
                                </Section>

                                <Section showChildren={profil.profil.kakao || isEditMode}>
                                    <ListItem disableGutters
                                        secondaryAction={
                                            isEditMode ?
                                                <ModalWrapper
                                                    id="kakao"
                                                    title={<>Kakao</>}
                                                    renderButton={(onOpen) => <IconButton color="primary" onClick={onOpen}><EDIT_ICON /></IconButton>}
                                                    renderBody={() => (
                                                        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                                            <TextField
                                                                defaultValue={profil.profil.instagram}
                                                                placeholder="Nom d'utilisateur KakaoTalk"
                                                                fullWidth
                                                                {...register('kakao')} />
                                                            <LoadingButton variant="contained" loading={isSubmitting} type="submit">Valider</LoadingButton>
                                                        </Stack>
                                                    )}
                                                /> : <></>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: "#FFE90A" }}>
                                                <KAKAO_ICON />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="KakaoTalk"
                                            secondary={profil.profil.kakao}
                                        />
                                    </ListItem>
                                </Section>
                            </Stack>
                            {
                                !isEditMode &&
                                <Stack mt={2}>
                                    <Typography mb={2} variant="h6" fontWeight={500}>Publications</Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <NavLink to={`/voyage?user=${params.id}`}>
                                                <Button sx={{ width: '100%', py: 3 }} variant="outlined" startIcon={<TRAVEL_ICON />}>Lieux</Button>
                                            </NavLink>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <NavLink to={`/forum?user=${params.id}`}>
                                                <Button sx={{ width: '100%', py: 3 }} variant="outlined" startIcon={<FORUM_ICON />}>Discussions</Button>
                                            </NavLink>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <NavLink to={`/market-place?user=${params.id}`}>
                                                <Button sx={{ width: '100%', py: 3 }} variant="outlined" startIcon={<MARKET_PLACE_ICON />}>Produits en vente</Button>
                                            </NavLink>
                                        </Grid>
                                    </Grid>
                                </Stack>
                            }
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {
                isEditMode ? <Box sx={{ position: 'sticky', backgroundColor: 'white', py: 2, bottom: 0 }} >
                    <Container maxWidth="lg">
                        <Stack alignItems="end">
                            <NavLink to={`/user/profil/${auth.id}`}>
                                <Button variant="contained" sx={{ backgroundColor: 'black' }} >Ok</Button>
                            </NavLink>
                        </Stack>
                    </Container>
                </Box> : <></>
            }

        </Box>
}

export default ProfilForm
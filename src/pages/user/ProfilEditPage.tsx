import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { apiFetch } from "../../http-common/apiFetch"
import LoadingPage from "../../components/LoadingPage"
import { Box, Button, Grid, GridItem, HStack, Image, Input, Stack, VStack, useToast, Text, Card, CardBody, CardHeader, Textarea, Wrap, Divider, List, ListIcon, ListItem, Checkbox, CheckboxGroup, Flex, Spacer } from "@chakra-ui/react";
import UserSniped from "../../components/react-ux/UserSniped";
import useFile from "../../hooks/useFile";
import { useAuthContext } from "../../contexts/AuthProvider";
import UpladButton from "../../components/buttons/UplaodButton";
import { VERTICAL_SPACING } from "../../utils/variables";
import ContainerSection from "../components/ContainerSection";
import { CAMERA_ICON, DISLIKE_ICON, FACEBOOK_ICON, INSTAGRAM_ICON, KAKAO_ICON, LANGUAGE_ICON, LOCALISATION_ICON, OCCUPATION_ICON, TIKTOK_ICON, YOUTUBE_ICON } from "../../utils/icon";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ModalWrapper from "../../components/Modals/ModalWraper";
import CityDistrictSelectInput from "../../components/inputs/CityDistrictSelectInput";
import { useSelector } from "react-redux";
import { getValueFiltered } from "../../utils";
import { NavLink } from "react-router-dom";

const CustomButton: React.FC<{ onClick: () => any, icon: any, title: string, data: string }> = ({ onClick, icon, data, title }) => {
    return <Button
        whiteSpace={"break-spaces"}
        py="30px"
        h="auto"
        justifyContent={"flex-start"}
        flexWrap={"wrap"}
        textAlign="left"
        w="100%"
        variant={"ghost"}
        onClick={onClick}
        alignItems={"center"}
        leftIcon={<Box fontSize={25}>{icon}</Box>}>
        {title + ' : '}
        <Text as="span" fontWeight={"normal"}> {data}</Text>
    </Button>
}

interface PropsInterface {
    profil: any,
    mutate: Function
}

type Inputs = {
    introduction: string
    hobby: string,
    youtubelink: string,
    facebooklink: string,
    instagramlink: string,
    localisation: number,
    languages: Array<any>,
    kakaolink: string,
    occupation: string,
    tiktoklink: string
}

const Informations: React.FC<PropsInterface> = ({ profil, mutate }) => {

    const toast = useToast()
    const params = useParams()
    const { languages } = useSelector((state: any) => state.app)
    const [languageTextInput, setLanguageTextInput] = useState<string>('')
    const [languagesFiltered, setLanguagesFiltered] = useState(languages)

    const {
        control,
        register,
        handleSubmit,
        setError,
        clearErrors,
        getValues,
        setValue,
        formState: { errors, isSubmitting, isSubmitted },
    } = useForm<Inputs>({
        mode: 'onTouched',
        defaultValues: {
            introduction: profil.introduction,
            hobby: profil.hobby,
            youtubelink: profil.youtubelink,
            facebooklink: profil.facebooklink,
            instagramlink: profil.instagramlink,
            localisation: profil.localisation?.id,
            languages: profil.languages,
            kakaolink: profil.kakaolink,
            tiktoklink: profil.tiktoklink,
            occupation: profil.occupation,
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {

        try {
            await apiFetch(`/profil/${profil.id}`, 'patch', {
                introduction: data.introduction,
                localisation: data.localisation ? `/api/districts/${data.localisation}` : null,
                hobby: data.hobby,
                youtubelink: data.youtubelink,
                facebooklink: data.facebooklink,
                instagramlink: data.instagramlink,
                kakaolink: data.kakaolink,
                tiktoklink: data.tiktoklink,
                languages: data.languages,
                occupation: data.occupation
            })
            toast({
                description: 'Profil mis à jour',
                status: 'success'
            })
            mutate()
        } catch (error) {
            toast({
                description: 'Une erreur est survenue',
                status: 'error'
            })
        }
    }


    return (
        <Stack>
            <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>Modification du profil</Text>
            <Stack spacing={VERTICAL_SPACING}>
                <Stack>
                    <Text fontWeight={500} fontSize={"xl"}>Introduction</Text>
                    {<Text> {profil.introduction ? profil.introduction : <em>"Présentez vous en quelques lignes"</em>} </Text>}
                    <ModalWrapper
                        id="introduction"
                        title={<>Introduction</>}
                        params={{ isCentered: true, portalProps: 'containerRef' }}
                        renderButton={(onOpen) => <Text cursor={"pointer"} textDecoration={"underline"} as="b" onClick={onOpen}>Modifier</Text>}
                    >
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                            <Textarea {...register('introduction')} defaultValue={profil.introduction} />
                            <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                        </Stack>
                    </ModalWrapper>
                </Stack>

                <Stack>
                    <ModalWrapper
                        id="occupation"
                        title={<><OCCUPATION_ICON /> Profession</>}
                        params={{ isCentered: true }}
                        renderButton={(onOpen) =>
                            <CustomButton onClick={onOpen} icon={<OCCUPATION_ICON />} title="Profession" data={profil.occupation} />
                        }
                    >
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                            <Input {...register('occupation')} defaultValue={profil.occupation} />
                            <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                        </Stack>
                    </ModalWrapper>

                    <ModalWrapper
                        id="hobby"
                        title={<><DISLIKE_ICON /> Ce que j'aime</>}
                        params={{ isCentered: true }}
                        renderButton={(onOpen) =>
                            <CustomButton title="Ce que j'aime" onClick={onOpen} icon={<DISLIKE_ICON />} data={profil.hobby} />
                        }
                    >
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                            <Input {...register('hobby')} defaultValue={profil.hobby} />
                            <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                        </Stack>
                    </ModalWrapper>

                    <ModalWrapper
                        id="hobby"
                        title={<><LOCALISATION_ICON /> Où j'habite</>}
                        params={{ isCentered: true }}
                        renderButton={(onOpen) =>
                            <CustomButton title="Où j'habite" onClick={onOpen} icon={<LOCALISATION_ICON />} data={profil.localisation && profil.localisation?.city?.label + ' , ' + profil.localisation.label} />
                        }
                    >
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                            <Text color="gray">La selection d'un district est requis afin de valider la localisation sinon il sera compté comme vide</Text>
                            <CityDistrictSelectInput
                                showMap={true}
                                cityValue={profil.localisation?.city?.id}
                                updateDistrict={(e: any) => setValue('localisation', e)}
                                districtValue={profil.localisation?.id} />
                            <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                        </Stack>
                    </ModalWrapper>

                    <ModalWrapper
                        id="hobby"
                        title={<><LANGUAGE_ICON /> Langues parlées</>}
                        params={{ isCentered: true }}
                        renderButton={(onOpen) =>
                            <CustomButton title=" Langues parlées" onClick={onOpen} icon={<LANGUAGE_ICON />} data={profil.languages.join(' , ')} />
                        }
                    >
                        <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                            <Input bg="gray.200" borderRadius="full" placeholder="Recherchez une langue" type="search" value={languageTextInput} onChange={(e: any) => (
                                setLanguageTextInput(e.target.value),
                                setLanguagesFiltered(getValueFiltered(languages, e.target.value))
                            )} />
                            <Controller
                                control={control}
                                name="languages"
                                render={({ field: { onChange, value } }) => (
                                    <CheckboxGroup onChange={onChange} value={value} defaultValue={profil.languages}>
                                        {languagesFiltered.map((language: any) => {
                                            return (
                                                <Box key={language.id} w="100%">
                                                    <Checkbox isChecked={profil.languages.includes(language.label)} value={language.label} size="lg" w="100%" justifyContent={"space-between"} flexDirection={"row-reverse"}>
                                                        {language.label}
                                                    </Checkbox>
                                                    <Divider my={2} />
                                                </Box>
                                            )
                                        })}
                                    </CheckboxGroup>
                                )}
                            />
                            <Button position="sticky" bottom={0} right={0} colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                        </Stack>
                    </ModalWrapper>
                </Stack>

                <Stack>
                    <Text fontWeight={500} fontSize={"xl"}>Réseau sociaux <Text as="small">(Nom d'utilisateur)</Text></Text>
                    <Stack>
                        <ModalWrapper
                            id="instagram"
                            title={<><INSTAGRAM_ICON /> Instagram</>}
                            params={{ isCentered: true }}
                            renderButton={(onOpen) =>
                                <CustomButton title="Instagram" onClick={onOpen} icon={<INSTAGRAM_ICON />} data={profil.instagramlink} />
                            }
                        >
                            <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                <Input {...register('instagramlink')} defaultValue={profil.instagramlink} />
                                <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                            </Stack>
                        </ModalWrapper>

                        <ModalWrapper
                            id="hobby"
                            title={<><YOUTUBE_ICON /> Youtube</>}
                            params={{ isCentered: true }}
                            renderButton={(onOpen) =>
                                <CustomButton title="Youtube" onClick={onOpen} icon={<YOUTUBE_ICON />} data={profil.youtubelink} />
                            }
                        >
                            <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                <Input {...register('youtubelink')} defaultValue={profil.youtubelink} />
                                <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                            </Stack>
                        </ModalWrapper>
                        <ModalWrapper
                            id="hobby"
                            title={<><TIKTOK_ICON /> TikTok</>}
                            params={{ isCentered: true }}
                            renderButton={(onOpen) =>
                                <CustomButton title="TikTok" onClick={onOpen} icon={<TIKTOK_ICON />} data={profil.tiktoklink} />
                            }
                        >
                            <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                <Input {...register('tiktoklink')} defaultValue={profil.tiktoklink} />
                                <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                            </Stack>
                        </ModalWrapper>
                        <ModalWrapper
                            id="hobby"
                            title={<><FACEBOOK_ICON /> Facebook</>}
                            params={{ isCentered: true }}
                            renderButton={(onOpen) =>
                                <CustomButton title="Facebook" onClick={onOpen} icon={<FACEBOOK_ICON />} data={profil.facebooklink} />
                            }
                        >
                            <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                <Input {...register('facebooklink')} defaultValue={profil.facebooklink} />
                                <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                            </Stack>
                        </ModalWrapper>
                        <ModalWrapper
                            id="hobby"
                            title={<><KAKAO_ICON /> Kakao</>}
                            params={{ isCentered: true }}
                            renderButton={(onOpen) =>
                                <CustomButton title="Kakao" onClick={onOpen} icon={<KAKAO_ICON />} data={profil.kakaolink} />
                            }
                        >
                            <Stack as="form" onSubmit={handleSubmit(onSubmit)} alignItems={"flex-end"}>
                                <Input {...register('kakaolink')} defaultValue={profil.kakaolink} />
                                <Button colorScheme="blackAlpha" bg="black" isLoading={isSubmitting} type="submit">Valider</Button>
                            </Stack>
                        </ModalWrapper>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>

    )
}



const ProfilEditPage: React.FC<PropsInterface> = ({ profil, mutate }) => {


    const { authentification }: any = useAuthContext()
    const [isUploadBusy, setIsUploadBusy] = useState<boolean>(false)
    const params = useParams()
    const { files, addFile, clearFiles } = useFile()

    useEffect(() => {
        if (files.length > 0) {
            handleFileUpload();
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
            setIsUploadBusy(true)
            const formData = new FormData();
            formData.append("file", files[0].file, files[0].file.name);
            await apiFetch(`/profil/${profil.id}/avatar`, 'post', formData)
            mutate()
            await authentification()
            clearFiles()
            toast({
                description: "Photo de profil modifié",
                status: "success",
            });
        } catch (error: any) {
            console.log(error);
        } finally {
            setIsUploadBusy(false)
        }
    };

    return (
        <>
            <Box my={VERTICAL_SPACING}>
                <Box w={{ base: 500, lg: '100%' }} m="auto" maxW={"100%"}>
                    <ContainerSection withPadding={true}>
                        <Grid
                            alignItems={"flex-start"}
                            gap={10}
                            templateColumns={{
                                base: "repeat(1, 1fr)",
                                lg: "repeat(10, 1fr)",
                            }}
                        >
                            <GridItem
                                // position={"sticky"} top="100px"
                                colSpan={{
                                    base: 1,
                                    lg: 3,
                                }}>

                                <VStack>
                                    <UserSniped styles={{ boxSize: '15em' }} avatar={profil.avatarPath} />
                                    <UpladButton sx={{ mt: -3 }} onChange={(e: any) => onChangeFile(e)}>
                                        <Button isLoading={isUploadBusy} variant={"outline"} bg="white" leftIcon={<CAMERA_ICON />} size="sm">Modifier</Button>
                                    </UpladButton>
                                </VStack>

                            </GridItem>
                            <GridItem colSpan={{
                                base: 1,
                                lg: 7,
                            }}>
                                <Informations profil={profil} mutate={mutate} />
                            </GridItem>
                        </Grid>
                    </ContainerSection>
                </Box>
                <Box bg="white" py={3} position={"sticky"} bottom={0} >
                    <ContainerSection withPadding={true}>
                        <Flex>
                            <Spacer />
                            <NavLink to={`/user/profil/${params.id}`}>
                                <Button colorScheme="blackAlpha" bg="black">Ok</Button>
                            </NavLink>
                        </Flex>
                    </ContainerSection>
                </Box>
            </Box >

        </>
    )
}


export default ProfilEditPage
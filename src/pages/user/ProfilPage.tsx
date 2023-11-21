import React, { Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useSearchParams, NavLink } from "react-router-dom";
import useSWR from "swr";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  Tooltip,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import {
  FORUM_ICON,
  DISLIKE_ICON,
  TRAVEL_ICON,
  MARKET_PLACE_ICON,
  OCCUPATION_ICON,
  LOCALISATION_ICON,
  LANGUAGE_ICON,
  INSTAGRAM_ICON,
  KAKAO_ICON,
  FACEBOOK_ICON,
  TIKTOK_ICON,
  YOUTUBE_ICON,
} from "../../utils/icon";
import LoadingPage from "../../components/LoadingPage";
import ContainerSection from "../components/ContainerSection";
import UserSniped from "../../components/react-ux/UserSniped";
import { useAuthContext } from "../../contexts/AuthProvider";
import ModalWrapper from "../../components/Modals/ModalWraper";
import DiscussionCard from "../../components/card/DiscussionCard";
import PlaceCard from "../../components/card/PlaceCard";
import ProductCard from "../../components/card/ProductCard";
import ProfilEditPage from "./ProfilEditPage";
import { templateColumns } from "../../utils";
import { VERTICAL_SPACING } from "../../utils/variables";

const ButtonOpenModal: React.FC<{ onClick: () => void; label: string; icon: any }> = ({ onClick, label, icon }) => {
  return (
    <Button w="100%" onClick={onClick} py="30px" variant={"outline"} leftIcon={icon}>{label}</Button>
  )
}

const PublicationLiked = () => {
  const params = useParams();
  const { data: likes, error } = useSWR(`/likes`, { suspense: true });

  if (error) console.error(error);

  const places = likes.map((like: any) => ('place' in like ? like.place : null)).filter(Boolean);
  const discussions = likes.map((like: any) => ('discussion' in like ? like.discussion : null)).filter(Boolean);

  return (
    <ModalWrapper
      id="like"
      title={<>{<DISLIKE_ICON />} J'aimes</>}
      renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"J'aimes"} icon={<DISLIKE_ICON />} />}
      params={{ size: 'full' }}
    >
      <Stack spacing={VERTICAL_SPACING}>
        {places.length && (
          <Stack>
            <Text fontWeight={500} fontSize={"xl"}>
              Lieux
            </Text>
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 2, lg: 3 })}>
              {places.map((place: any) => (
                <GridItem key={'p-' + place.id}>
                  <NavLink to={'/voyage/place/detail/' + place.id}>
                    <PlaceCard size="sm" place={place} />
                  </NavLink>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        )}
        {discussions.length && (
          <Stack>
            <Text fontWeight={500} fontSize={"xl"}>
              Discussions
            </Text>
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 2, lg: 3 })}>
              {discussions.map((discussion: any) => (
                <GridItem key={'d-' + discussion.id}>
                  <NavLink to={'/forum/discussion/detail/' + discussion.id}>
                    <DiscussionCard size="sm" discussion={discussion} />
                  </NavLink>
                </GridItem>
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </ModalWrapper>
  );
};

const PlacePublication = () => {
  const params = useParams();
  const { data: places, error } = useSWR(`/places/user?user=${params.id}`, { suspense: true });
  if (error) console.error(error);

  return (
    <ModalWrapper
      id="places"
      title={<>{<TRAVEL_ICON />} Lieux</>}
      renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"Lieux"} icon={<TRAVEL_ICON />} />}
      params={{ size: 'full' }}
    >
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 2, lg: 3 })}>
        {places.map((place: any) => (
          <GridItem key={place.id}>
            <NavLink to={'/voyage/place/detail/' + place.id}>
              <PlaceCard size="sm" place={place} />
            </NavLink>
          </GridItem>
        ))}
      </Grid>
    </ModalWrapper>
  );
};

const DiscusionPublication = () => {
  const params = useParams();
  const { data: discussions, error } = useSWR(`/discussions/user?user=${params.id}`, { suspense: true });

  if (error) console.error(error);

  return (
    <ModalWrapper
      id="discussions"
      title={<><FORUM_ICON />Discussions</>}
      renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"Discussions"} icon={<FORUM_ICON />} />}
      params={{ size: 'full' }}
    >
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 2, lg: 3 })}>
        {discussions.map((discussion: any) => (
          <GridItem key={discussion.id}>
            <NavLink to={'/forum/discussion/detail/' + discussion.id}>
              <DiscussionCard size="sm" discussion={discussion} />
            </NavLink>
          </GridItem>
        ))}
      </Grid>
    </ModalWrapper>
  );
};

const ProductPublication = () => {
  const params = useParams();
  const { data: products, error: errorProduct } = useSWR(`/products/user?user=${params.id}`, { suspense: true });

  return (
    <ModalWrapper
      id="produits"
      title={<><MARKET_PLACE_ICON />Produits mis en vente</>}
      renderButton={(onOpen) => <ButtonOpenModal onClick={onOpen} label={"Produits mis en vente"} icon={<MARKET_PLACE_ICON />} />}
      params={{ size: 'full' }}
    >
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 2, lg: 3 })}>
        {products.map((product: any) => (
          <GridItem key={product.id}>
            <NavLink to={'/market-place/product/detail/' + product.id}>
              <ProductCard size="sm" product={product} />
            </NavLink>
          </GridItem>
        ))}
      </Grid>
    </ModalWrapper>
  );
};

const Publications = () => {
  const params = useParams();
  const { user: currentUser }: any = useAuthContext();

  return (
    <Stack>
      <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>
        Publications
      </Text>
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 2 })}>
        <GridItem>
          <PlacePublication />
        </GridItem>
        <GridItem>
          <DiscusionPublication />
        </GridItem>
        <GridItem>
          <ProductPublication />
        </GridItem>
        {currentUser && currentUser.id == params.id ? <GridItem> <PublicationLiked /> </GridItem> : <></>}
      </Grid>
    </Stack>
  );
};

const Resume: React.FC<{ profil: any }> = ({ profil }) => {
  return (
    <Stack spacing={VERTICAL_SPACING}>
      <Stack>
        {
          profil.introduction && <>
            <Text fontWeight={500} fontSize={"xl"}>Introduction</Text>
            <Text>{profil.introduction} </Text>
          </>
        }
      </Stack>
      <List spacing={5}>
        {
          profil.occupation && <>
            <Divider />
            <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
              <ListIcon as={OCCUPATION_ICON} fontSize={25} />
              <Text><Text as="span" fontWeight={500}>Profession :</Text> {profil.occupation}</Text>
            </ListItem>
          </>
        }
        {
          profil.hobby && <>
            <Divider />
            <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
              <ListIcon as={DISLIKE_ICON} fontSize={25} />
              <Text><Text as="span" fontWeight={500}>Ce que j'aime :</Text> {profil.hobby}</Text>
            </ListItem>
          </>
        }
        {
          profil.localisation && <>
            <Divider />
            <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
              <ListIcon as={LOCALISATION_ICON} fontSize={25} />
              <Text><Text as="span" fontWeight={500}>Où j'habite :</Text> {profil.localisation?.city?.label + ' , ' + profil.localisation.label} </Text>
            </ListItem>
          </>
        }
        {
          profil.languages.length && <>
            <Divider />
            <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
              <ListIcon as={LANGUAGE_ICON} fontSize={25} />
              <Text><Text as="span" fontWeight={500}>Langues parlées :</Text> {profil.languages.join(' , ')} </Text>
            </ListItem>
          </>
        }
      </List>
      <Wrap>
        {
          profil.youtubelink && <><NavLink to={`https://www.youtube.com/@${profil.youtubelink.replace(' ', '')}`} target="_blank">
            <IconButton variant={"outline"} isRound size="lg" icon={<YOUTUBE_ICON fontSize={25} />} aria-label={profil.youtubelink} />
          </NavLink>
          </>
        }
        {
          profil.instagramlink && <><NavLink to={`https://www.instagram.com/${profil.instagramlink.replace(' ', '_')}`} target="_blank">
            <IconButton
              variant={"outline"}
              isRound
              size="lg"
              icon={<INSTAGRAM_ICON fontSize={25} />}
              aria-label={profil.instagramlink} />
          </NavLink>
          </>
        }
        {
          profil.kakaolink && <>
            <Tooltip hasArrow label={profil.kakaolink} >
              <IconButton
                variant={"outline"}
                isRound
                size="lg"
                icon={<KAKAO_ICON fontSize={25} />}
                aria-label={profil.kakaolink} />
            </Tooltip>
          </>
        }
        {
          profil.tiktoklink && <><NavLink to={`https://www.tiktok.com/@${profil.tiktoklink.replace(' ', '')}`} target="_blank">
            <IconButton
              variant={"outline"}
              isRound
              size="lg"
              icon={<TIKTOK_ICON fontSize={25} />}
              aria-label={profil.instagramlink} />
          </NavLink>
          </>
        }
        {
          profil.facebooklink && <><NavLink to={`https://www.tiktok.com/@${profil.facebooklink.replace(' ', '')}`} target="_blank">
            <IconButton
              variant={"outline"}
              isRound
              size="lg"
              icon={<FACEBOOK_ICON fontSize={25} />}
              aria-label={profil.facebooklink} />
          </NavLink>
          </>
        }
      </Wrap>
    </Stack>
  )
}
const UserDetail = () => {
  const params = useParams();
  const { user: currentUser }: any = useAuthContext();
  const { data: profil, error, mutate } = useSWR(`/user/${params.id}`, { suspense: true });
  const [openEditMode, setOpenEditMode] = useState<boolean>(false);
  const currentUserProfil = currentUser ? currentUser.id === profil.user.id : false;

  if (error) {
    console.error({ error });
  }

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setOpenEditMode(searchParams.get('editMode') ? currentUser.id === profil.user.id : false);
  }, [searchParams, currentUser.id, profil.user.id]);

  return (
    <>
      {openEditMode ? (
        <ProfilEditPage profil={profil} mutate={mutate} />
      ) : (
        <Box my={VERTICAL_SPACING}>
          <ContainerSection withPadding={true}>
            <Box w={{ base: 500, lg: '100%' }} m="auto" maxW={"100%"}>
              <Grid
                gap={10}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(10, 1fr)",
                }}
              >
                <GridItem colSpan={{
                  base: 1,
                  lg: 3,
                }}>
                  <Card>
                    <CardBody>
                      <Stack direction={"row"} justifyContent={"center"}>
                        <VStack>
                          <UserSniped size="2xl" avatar={profil.avatarPath} />
                          <Text as="h1" fontSize={"lg"} fontWeight={"bold"}>
                            {profil.user.pseudo}
                          </Text>
                          {currentUserProfil && (
                            <Button onClick={() => setSearchParams('editMode=true')} variant="outline">
                              Modifier mon profil
                            </Button>
                          )}
                        </VStack>
                      </Stack>
                    </CardBody>
                  </Card>
                </GridItem>
                <GridItem colSpan={{
                  base: 1,
                  lg: 7,
                }}>
                  <Stack spacing={VERTICAL_SPACING}>
                    <Stack spacing={VERTICAL_SPACING} w="100%">
                      <Stack alignItems={"flex-start"}>
                        <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>
                          A propos de {profil.user.pseudo}
                        </Text>
                        <Resume profil={profil} />
                      </Stack>
                      <Publications />
                    </Stack>
                  </Stack>
                </GridItem>
              </Grid>
            </Box>
          </ContainerSection>
        </Box>
      )}
    </>
  );
};

const ProfilPage = () => {

  return <Suspense fallback={<LoadingPage type="page" />}>
    <UserDetail />
  </Suspense>
}

export default ProfilPage
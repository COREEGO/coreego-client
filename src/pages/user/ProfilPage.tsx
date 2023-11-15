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
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
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

const ButtonOpenModal: React.FC<{ onClick: () => void; label: string; icon: any }> = ({ onClick, label, icon }) => (
  <Card w="100%" as="button" onClick={onClick}>
    <CardBody display={"flex"} justifyContent={"center"} w="100%">
      <Text fontSize="lg" as="span">
        <HStack>
          {icon}
          <Text>{label}</Text>
        </HStack>
      </Text>
    </CardBody>
  </Card>
);

const PublicationLiked = () => {
  const params = useParams();
  const { data: likes, error } = useSWR(`/likes?user=${params.id}`, { suspense: true });

  if (error) console.error(error);

  const places = likes.map((like:any) => ('place' in like ? like.place : null)).filter(Boolean);
  const discussions = likes.map((like:any) => ('discussion' in like ? like.discussion : null)).filter(Boolean);

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
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
              {places.map((place:any) => (
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
            <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
              {discussions.map((discussion:any) => (
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
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
        {places.map((place:any) => (
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
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
        {discussions.map((discussion:any) => (
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
      <Grid gap={5} templateColumns={templateColumns({ base: 1, sm: 1, md: 3, lg: 4 })}>
        {products.map((product:any) => (
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

const Resume: React.FC<{ data: any }> = ({ data }) => {
    return (
        <Stack spacing={VERTICAL_SPACING}>
            <Stack>
                <Text fontWeight={500} fontSize={"xl"}>Introduction</Text>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis quam exercitationem facilis perferendis, laboriosam aut magnam itaque dolores eum ducimus natus perspiciatis. Inventore distinctio itaque, placeat asperiores iste ex ut!</Text>
            </Stack>
            <List spacing={5}>
                <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
                    <ListIcon as={OCCUPATION_ICON} fontSize={25} />
                    <Text><Text as="span" fontWeight={500}>Profession :</Text> Titre de la profession</Text>
                </ListItem>
                <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
                    <ListIcon as={DISLIKE_ICON} fontSize={25} />
                    <Text><Text as="span" fontWeight={500}>Ce que j'aime :</Text> La culture asiatique, le baseball et apprendre des langues</Text>
                </ListItem>
                <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
                    <ListIcon as={LOCALISATION_ICON} fontSize={25} />
                    <Text><Text as="span" fontWeight={500}>Où j'habite :</Text> Séoul, Mapo-gu</Text>
                </ListItem>
                <ListItem display="flex" w="100%" flexDirection={"row"} alignItems={"center"}>
                    <ListIcon as={LANGUAGE_ICON} fontSize={25} />
                    <Text><Text as="span" fontWeight={500}>Langues parlées :</Text> Français, Coréen</Text>
                </ListItem>
            </List>

            <Flex gap={3}>
                <Box as="a" href="/"><YOUTUBE_ICON fontSize={25} /></Box>
                <Box as="a" href="/"><INSTAGRAM_ICON fontSize={25} /></Box>
                <Box as="a" href="/"><KAKAO_ICON fontSize={25} /></Box>
                <Box as="a" href="/"><FACEBOOK_ICON fontSize={25} /></Box>
                <Box as="a" href="/"><TIKTOK_ICON fontSize={25} /></Box>
            </Flex>

        </Stack>
    )
}
const UserDetail = () => {
    const params = useParams();
    const { user: currentUser }: any = useAuthContext();
    const { data: profil, error } = useSWR(`/profil/user?user=${params.id}`, { suspense: true });
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
          <ProfilEditPage profil={profil} />
        ) : (
          <Box my={VERTICAL_SPACING}>
            <ContainerSection withPadding={true}>
              <Grid
                gap={10}
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(10, 1fr)",
                }}
              >
                <GridItem colSpan={{
                  base: 1,
                  md: 3,
                }}>
                  <Card>
                    <CardBody>
                      <Stack direction={"row"} justifyContent={"center"}>
                        <VStack>
                          <UserSniped size="xl" avatar={profil.user.avatar} />
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
                  md: 7,
                }}>
                  <Stack spacing={VERTICAL_SPACING}>
                    <Stack spacing={VERTICAL_SPACING} w="100%">
                      <Stack alignItems={"flex-start"}>
                        <Text as="h2" fontWeight={"bold"} fontSize={"2xl"}>
                          A propos de {profil.user.pseudo}
                        </Text>
                        <Resume data={profil} />
                      </Stack>
                      <Divider opacity={1} />
                      <Publications />
                    </Stack>
                  </Stack>
                </GridItem>
              </Grid>
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
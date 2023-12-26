import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useSearchParams, NavLink } from "react-router-dom";
import useSWR from "swr";
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
  LIKE_ICON,
} from "../../utils/icon";
import LoadingPage from "../../components/LoadingPage";
import UserSniped from "../../components/react-ux/UserSniped";
import { useAuthContext } from "../../contexts/AuthProvider";
import ModalWrapper from "../../components/Modals/ModalWraper";
import DiscussionCard from "../../components/card/DiscussionCard";
import PlaceCard from "../../components/card/PlaceCard";
import ProfilEditPage from "./ProfilEditPage";
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { SOCIAL_ICON_SIZE } from "../../utils/variables";
import { toast } from "react-toastify";
import { apiFetch } from "../../http-common/apiFetch";
import ProfilForm from "../../components/forms/ProfilForm";


const Publications = () => {

  const params = useParams();

  return (
    <Stack>
      <Typography mb={2} variant="h5" fontWeight="bold">Publications</Typography>
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
  );
};

const Resume: React.FC<{ user: any }> = ({ user }) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight="bold">A propos de {user.pseudo}</Typography>
        {user.profil.introduction ? <Typography>{user.profil.introduction}</Typography> : <></>}
      </Stack>
      <List>
        {
          user.profil.occupation ?
            <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                  <OCCUPATION_ICON />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Profession"
                secondary={user.profil.occupation}
              />
            </ListItem> : <></>
        }
        {
          user.profil.hobby ?
            <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                  <LIKE_ICON />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Ce que j'aime"
                secondary={user.profil.hobby}
              />
            </ListItem> : <></>
        }
        {
          (user.profil.city && user.profil.district) ?
            <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                  <LOCALISATION_ICON />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Localisation"
                secondary={`${user.profil.city.label}, ${user.profil.district.label}`}
              />
            </ListItem> : <></>
        }
        {
          user.profil.languages.length ?
            <ListItem disableGutters>
              <ListItemAvatar>
                <Avatar sx={{ backgroundColor: 'var(--coreego-blue)' }}>
                  <LANGUAGE_ICON />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Langues parlées"
                secondary={user.profil.languages.join(' , ')}
              />
            </ListItem> : <></>
        }
      </List>
      <Stack spacing={1} sx={{ flexWrap: 'wrap' }} direction="row" alignItems="center">
        {user.profil.youtube ?
          <Tooltip title={'Youtube : ' + user.profil.youtube}>
            <IconButton aria-label={user.profil.youtube} component="a" target="__blank" href={`https://www.youtube.com/@${user.profil.youtube.replace(' ', '')}`}>
              <YOUTUBE_ICON sx={{ fontSize: SOCIAL_ICON_SIZE, color: '#FF0000' }} />
            </IconButton>
          </Tooltip>
          : <></>
        }
        {user.profil.instagram ?
          <Tooltip title={'Instagram : ' + user.profil.instagram}>
            <IconButton aria-label={user.profil.instagram} component="a" target="__blank" href={`https://www.instagram.com/${user.profil.instagram.replace(' ', '_')}`}>
              <INSTAGRAM_ICON sx={{ fontSize: SOCIAL_ICON_SIZE, color: '#F46F30' }} />
            </IconButton>
          </Tooltip>
          : <></>
        }
        {user.profil.facebook ?
          <Tooltip title={"Facebook : " + user.profil.facebook}>
            <IconButton aria-label={user.profil.facebook} component="a" target="__blank" href={`https://www.tiktok.com/@${user.profil.facebook.replace(' ', '')}`}>
              <FACEBOOK_ICON sx={{ fontSize: SOCIAL_ICON_SIZE, color: '#0866FF' }} />
            </IconButton>
          </Tooltip>

          : <></>
        }
        {user.profil.kakao ?
          <Tooltip title={'Kakao id : ' + user.profil.kakao}>
            <IconButton aria-label={user.profil.kakao}>
              <KAKAO_ICON style={{ fontSize: SOCIAL_ICON_SIZE, backgroundColor: '#FFE90A', padding: 2, borderRadius: 90, color: 'black' }} />
            </IconButton>
          </Tooltip>
          :
          <></>
        }
        {user.profil.tiktok ?
          <Tooltip title={'TikTok : ' + user.profil.tiktok}>
            <IconButton aria-label={user.profil.tiktok} component="a" target="__blank" href={`https://www.tiktok.com/@${user.profil.tiktok.replace(' ', '')}`}>
              <TIKTOK_ICON style={{ fontSize: SOCIAL_ICON_SIZE, color: 'black', }} />
            </IconButton>
          </Tooltip>
          :
          <></>
        }
      </Stack>
    </Stack>
  )
}

const UserDetail: React.FC<{ user: any }> = ({ user }) => {
  const params = useParams();

  const { user: currentUser }: any = useAuthContext();


  const currentUserProfil = currentUser ? currentUser.id == params.id : false;

  const [searchParams, setSearchParams] = useSearchParams();

  return (

    <Box my={3}>
      <Container maxWidth="lg">
        <Box sx={{ width: { xs: 600, md: '100%' }, m: 'auto' }} maxWidth="100%" >
          <Grid
            spacing={5}
            container
          >
            <Grid item xs={12}
              md={4}
            >
              <Card>
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <UserSniped styles={{ width: 150, height: 150 }} avatar={user.avatarPath} />
                    <Typography variant="h6" fontWeight="bold" component="h1"> {user.pseudo} </Typography>
                    {currentUserProfil && (
                      <NavLink to={"/user/profil/edit"}>
                        <Button variant="outlined">
                          Modifier mon profil
                        </Button>
                      </NavLink>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <Resume user={user} />
                <Divider />
                <Publications />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

const ProfilPage = () => {
  const params = useParams();

  const [isBusy, setIsBusy] = useState<boolean>(true)
  const { user: currentUser }: any = useAuthContext();

  const [user, setUser] = useState<Record<string, any> | null>(null)


  useEffect(() => {
    const load = async () => {
      try {
        const userProfil: any = await apiFetch(`/user/profil/${params.id}`, 'GET')
        if (userProfil) {
          setUser(userProfil)
        }
      } catch (error: any) {
        console.log(error)
        toast.error(error.message)
      } finally {
        setIsBusy(false)
      }
    }
    load()
  }, [])

  return isBusy ? <LoadingPage type="page" /> : <ProfilForm />

}

export default ProfilPage
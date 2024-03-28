import { Box, Button, Container, Grid, Hidden, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { Navigate, redirect } from "react-router"
import HeroBannerFeed from "./components/templates/HeroBannerFeed"
import { FORUM_DESCRIPTION } from "../utils"
import HEADER_IMG from "../images/headers/espace-discussion.jpg";
import LOGO from "../images/svgs/coreego-logo.svg";
import { CIRCLE_ICON } from "../utils/icon"
import HERO_BANNER_IMG from '../images/18948481884.jpg'

const HomePage = () => {


    return (
        <React.Fragment>
            <Box py={5} bgcolor="#F5F7FA">
                <Container>
                    <Grid container spacing={5} alignItems='center'>
                        <Grid item xs={12} md={6}>
                            <Typography
                                gutterBottom
                                variant='h3'
                                color='var(--coreego-blue)'
                                fontWeight='bold'
                                component='h1'
                            >
                                Site communautaire <br />
                                <span style={{ color: 'black' }}> 100%</span>
                                <span style={{ color: 'var(--coreego-red)' }}> Corée Du Sud</span>
                            </Typography>
                            <Typography>Venez interagir avec la communauté francophone en Corée Du Sud</Typography>
                            <Stack mt={3} direction="row" gap={1}>
                                <Button variant="contained">Se connecter</Button>
                                <Button variant="outlined" color="error">Créer un compte</Button>
                            </Stack>
                            <Grid item xs={12} md={6}>
                                <Hidden mdDown>
                                    <Box height={350} width="100%">
                                        <img
                                            style={{
                                                boxShadow: "15px 15px 4px var(--coreego-red)",
                                                objectFit: 'cover', objectPosition: 'bottom'
                                            }}
                                            height="100%" width="100%" src={HERO_BANNER_IMG} alt="" />
                                    </Box>
                                </Hidden>
                            </Grid>
                        </Grid>
                </Container>
            </Box>

            <Box bgcolor="grey.50" py={5}>
                <Container>
                    <Typography>fopzejkfiàfhj</Typography>
                </Container>
            </Box>

        </React.Fragment>
    )

}

export default HomePage
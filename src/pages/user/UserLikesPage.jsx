import {
	Box,
	Container,
	Grid,
	Stack,
	Tab,
	Typography
} from '@mui/material'
import { DISLIKE_ICON } from '../../utils/icon'
import TitleSectionText from '../../components/texts/TitleSectionText'
import React, { useState } from 'react'
import axios from 'axios'
import { BEARER_HEADERS } from '../../utils/variables'
import LoadingPage from '../../components/LoadingPage'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { NavLink } from 'react-router-dom'
import DiscussionCard from '../../components/card/DiscussionCard'
import PlaceCard from '../../components/card/PlaceCard'

const UserLikes = () => {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [likes, setLikes] = React.useState([])

  const [value, setValue] = React.useState('1')

  React.useEffect(() => {
    loadLikes()
  }, [])

  const loadLikes = async () => {
    try {
      const response = await axios.get('/likes', BEARER_HEADERS)
      setLikes(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoaded(true)
    }
  }

  const discussions = React.useMemo(() => {
    return likes
			.filter((item) => item.hasOwnProperty('discussion'))
			.map((item) => item.discussion[0])
  }, [likes])

  const places = React.useMemo(() => {
    return likes
			.filter((item) => item.hasOwnProperty('place'))
			.map((item) => item.place[0])
  }, [likes])

  return (
    <Container>
      <Stack gap={2} my={5}>
        <Stack direction='row' alignItems='center' gap={1}>
          <Stack gap={1} direction='row' alignItems='center'>
            <DISLIKE_ICON />
            <TitleSectionText
              component='h1'
              startText='Mes'
              endText="j'aime"
						/>
          </Stack>
        </Stack>
        {isLoaded ? (
          <Box mt={2} width='100%'>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={(event, newValue) => setValue(newValue)}
                  aria-label='lab API tabs example'
								>
                  <Tab label='Discussions' value='1' />
                  <Tab label='Lieux' value='2' />
                </TabList>
              </Box>
              <TabPanel value='1'>
                {discussions.length ? (
                  <Grid container spacing={2}>
                  {discussions.map((discussion) => {
                    return (
                    <Grid key={discussion.id} item xs={12} md={6}>
                    <NavLink
                    to={`/forum/discussion/${discussion.slug}`}
													>
                    <DiscussionCard discussion={discussion} />
                  </NavLink>
                  </Grid>
                  )
                  })}
                </Grid>
								) : (
  <Typography>Aucune discussion aimées</Typography>
								)}
              </TabPanel>
              <TabPanel value='2'>
                {places.length ? (
                  <Grid container spacing={2}>
                  {places.map((place) => {
                    return (
                    <Grid
                    key={place.id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
												>
                    <NavLink to={`/voyage/place/${place.slug}`}>
                    <PlaceCard place={place} />
                  </NavLink>
                  </Grid>
                  )
                  })}
                </Grid>
								) : (
  <Typography textAlign='center'>
										Aucun lieu aimé
									</Typography>
								)}
              </TabPanel>
            </TabContext>
          </Box>
				) : (
  <LoadingPage type='data' />
				)}
      </Stack>
    </Container>
  )
}

export default UserLikes

import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material'
import TitleSectionText from '../../components/texts/TitleSectionText'
import React from 'react'
import axios from 'axios'
import LoadingPage from '../../components/LoadingPage'
import { BEARER_HEADERS } from '../../utils/variables'
import { useLocation } from 'react-router'
import { useFilterContext } from '../../contexts/FilterProvider'
import DiscussionAnalitic from './analitics/DiscussionAnalitic'
import UserAnalitic from './analitics/UserAnalitic'

const AnaliticPage = () => {
  const [isBusy, setIsBusy] = React.useState(true)
  const [datas, setDatas] = React.useState([])

  const location = useLocation()
  const { updateFilter, searchParams } = useFilterContext()

  React.useEffect(() => {
    loadAnatilics()
  }, [location.search])

  const loadAnatilics = async () => {
    try {
      setIsBusy(true)
      const response = await axios.get(
				'/dashboard/analitics' + location.search,
				BEARER_HEADERS
			)
      setDatas(response.data)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <Box>
      <TitleSectionText endText='Analyse des données' />
      <Box mt={3}>
        <FormControl>
          <InputLabel id='demo-simple-select-label'>
						Type de données
					</InputLabel>
          <Select
            value={searchParams.get('data') || 'discussions'}
            label='Type de données'
            onChange={(event) =>
							updateFilter('data', event.target.value)
						}
					>
            <MenuItem value='discussions'>Discussions</MenuItem>
            <MenuItem value='utilisateurs'>Utilisateurs</MenuItem>
            <MenuItem value='produits'>Produits</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {!isBusy ? (
        <Box mt={3}>
          {(searchParams.get('data') == 'discussions' ||
						!location.search) && <DiscussionAnalitic datas={datas} />}
          {searchParams.get('data') == 'utilisateurs' && <UserAnalitic datas={datas} /> }
        </Box>
			) : (
  <LoadingPage type='data' />
			)}
    </Box>
  )
}

export default AnaliticPage

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
import ProductAnalitic from './analitics/ProductAnalitic'
import PlaceAnalitic from './analitics/PlaceAnalitic'

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
            value={searchParams.get('analitic_target') || 'discussions'}
            label='Type de données'
            onChange={(event) =>
							updateFilter('analitic_target', event.target.value)
						}
					>
            <MenuItem value='discussions'>Discussions</MenuItem>
            <MenuItem value='users'>Utilisateurs</MenuItem>
            <MenuItem value='products'>Produits</MenuItem>
            <MenuItem value='places'>Lieux</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {!isBusy ? (
        <Box mt={3}>
          {(searchParams.get('analitic_target') == 'discussions' ||
						!location.search) && <DiscussionAnalitic datas={datas} />}
          {searchParams.get('analitic_target') == 'users' && <UserAnalitic datas={datas} /> }
          {searchParams.get('analitic_target') == 'products' && <ProductAnalitic datas={datas} /> }
          {searchParams.get('analitic_target') == 'places' && <PlaceAnalitic datas={datas} /> }
        </Box>
			) : (
  <LoadingPage type='data' />
			)}
    </Box>
  )
}

export default AnaliticPage

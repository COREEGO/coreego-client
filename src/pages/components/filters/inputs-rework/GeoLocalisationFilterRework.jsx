import { useFilterContext } from '../../../../contexts/FilterProvider'
import { GEOLOCALISATION_ICON } from '../../../../utils/icon'
import { Button, Tooltip } from '@mui/material'
import { getMyGeoLocalisation } from '../../../../utils'

const GeoLocalisationFilterRework = () => {
  const { updateFilter, searchParams } = useFilterContext()

  const geolocalisationActive =
		searchParams.get('latitude') && searchParams.get('longitude')

  const handleGeoLocalistation = async () => {
    try {
      if (!geolocalisationActive) {
        const { latitude, longitude } = await getMyGeoLocalisation()
        updateFilter('latitude', latitude.toString())
        updateFilter('longitude', longitude.toString())
      } else {
        updateFilter('latitude', null)
        updateFilter('longitude', null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <Button
        variant={geolocalisationActive ? 'contained' : 'outlined' }
        startIcon={<GEOLOCALISATION_ICON />}
        onClick={handleGeoLocalistation}
			>
                Me géolocaliser
      </Button>
  )
}

export default GeoLocalisationFilterRework

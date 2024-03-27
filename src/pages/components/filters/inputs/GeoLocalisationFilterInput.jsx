import { Button, IconButton, Tooltip } from '@mui/material'
import { GEOLOCALISATION_ICON } from '../../../../utils/icon'
import { useFilterContext } from '../../../../contexts/FilterProvider';
import { getMyGeoLocalisation } from '../../../../utils';

const GeoLocalisationFilterInput = () => {

    const { updateFilter, searchParams, clearFilters } =
		useFilterContext();

        const geolocalisationActive = searchParams.get('latitude') && searchParams.get('longitude')

    const handleGeoLocalistation = async () => {
		try {
            if(!geolocalisationActive){
                const { latitude, longitude } = await getMyGeoLocalisation();
                updateFilter('latitude', latitude.toString())
                updateFilter('longitude', longitude.toString())
            }else{
                updateFilter('latitude', null)
                updateFilter('longitude', null)
            }
		  } catch (error) {
			console.log(error)
		  }
	};

  return (
    <Tooltip title="géolocalisation">
    <Button size="large" variant='outlined' startIcon={<GEOLOCALISATION_ICON />} onClick={handleGeoLocalistation}>
       {geolocalisationActive ? 'active' : 'inactive' }
    </Button>
    </Tooltip>
  )
}

export default GeoLocalisationFilterInput

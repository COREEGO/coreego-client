import { MenuItem, TextField } from '@mui/material'
import { useFilterContext } from '../../../../contexts/FilterProvider'
import CityDistrictSelectInput from '../../../../components/inputs/CityDistrictSelectInput'
import React from 'react'

const LocalisationFilterInput = () => {
  const { updateFilter, searchParams } = useFilterContext()

  // const [city, setCity] = React.useState(
	// 	searchParams.get('city')
	// )
  // const [district, setDistrict] = React.useState(
	// 	searchParams.get('district')
	// )

  // React.useEffect(() => {
  //   setCity(searchParams.get('city'))
  //   setDistrict(searchParams.get('district'))
  // }, [searchParams])

  return (
    <CityDistrictSelectInput
      labelCity='Toutes les villes'
      labelDistrict='Tous les districts'
      cityValue={searchParams.get('city') || ''}
      districtValue={searchParams.get('district') || ''}
      updateCity={(e) => {
        updateFilter('city', e.toString())
      }}
      updateDistrict={(e) => {
        updateFilter('district', e.toString())
      }}
		/>
  )
}

export default LocalisationFilterInput

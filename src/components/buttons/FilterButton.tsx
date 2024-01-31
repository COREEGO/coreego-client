import { Button } from "@mui/material"
import { FILTER_ICON } from "../../utils/icon"



const FilterButton = () => {

    return (
        <Button variant="outlined" sx={{
            backgroundColor: 'white',
            borderColor: 'var(--mui-light)',
            '&:hover':{
                borderColor: 'var(--mui-light)',
                boxShadow: 'var(--box-shadow)',
                backgroundColor: 'white'
            }
            }} >
             <FILTER_ICON sx={{ color: 'var(--coreego-blue)' }} />
        </Button>
    )
}

export default FilterButton
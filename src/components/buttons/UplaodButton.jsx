import { Box } from "@mui/material"
import { allowedExtensions } from "../../utils"


const UpladButton = ({children, onChange, multiple = true, ...props}) => {

    return (
        <Box {...props} sx={{position: 'relative', width: '100%'}} component="span">
            <Box component="input" sx={{height: '100%', cursor: "pointer", opacity: 0, zIndex: 10, position: 'absolute', right: 0, left: 0}} type="file" accept={allowedExtensions.join(',')} multiple={multiple} onChange={onChange}></Box>
            {children}
        </Box>
    )

}

export default UpladButton
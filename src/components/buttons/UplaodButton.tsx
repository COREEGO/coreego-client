import { Box } from "@mui/material"

interface PropsInterface{
    children: React.ReactNode,
    onChange: (e:any) => void,
    multiple?: boolean
}

const UpladButton: React.FC<PropsInterface> = ({children, onChange, multiple = true}) => {

    return (
        <Box  sx={{width: 'fit-content', position: 'relative'}} component="span">
            <Box component="input" sx={{height: '100%', cursor: "pointer", opacity: 0, zIndex: 10, position: 'absolute', right: 0, left: 0}} type="file" multiple={multiple} onChange={onChange}></Box>
            {children}
        </Box>
    )

}

export default UpladButton
import { Box } from "@chakra-ui/react"
import { ReactPropTypes, useEffect } from "react"


const HeaderSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {


    return (
        <Box
            as="header"
            className="header-container"
            minH={200}
            width="100%"
            background="linear-gradient(#005998, #0693e3)"
            position="relative"
        >
            {children}
        </Box>
    )

}

export default HeaderSection
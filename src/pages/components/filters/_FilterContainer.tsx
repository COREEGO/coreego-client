import { Stack } from "@chakra-ui/react";

interface FilterContainerInterface {
    children: React.ReactNode
}

const FilterContainer: React.FC<FilterContainerInterface> = ({ children }) => {

    return (
        <Stack bg="var(--coreego-blue-light)" p={3} >
            <>
                {children}
            </>
        </Stack>
    )

}

export default FilterContainer
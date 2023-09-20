import { FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useFilterContext } from "../../../contexts/FilterProvider";


export default function DateFilter() {

    const { setOrderBy, orderBy } = useFilterContext()

    return (
        <RadioGroup onChange={(e: any) => setOrderBy(e)} value={orderBy}>
            <Stack direction='row'>
                <Radio value='desc'>Les plus récents</Radio>
                <Radio value='asc'>Les plus anciens</Radio>
            </Stack>
        </RadioGroup>
    )

}
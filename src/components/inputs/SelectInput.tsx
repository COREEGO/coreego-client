import { useSearchParams } from "react-router-dom";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react"
import React from "react";

interface SelectInputInterface {
    datas: Array<any>,
    value: any,
    formLabel: string,
    emptyValueLabel?: string,
    setValue: (event: any) => any
}

const SelectInput: React.FC<SelectInputInterface> = ({ emptyValueLabel, datas, value, formLabel, setValue }) => {


    return (
        <FormControl>
            {formLabel && <FormLabel>{formLabel}</FormLabel>}
            <Select value={value} onChange={(event: any) => setValue(event.target.value)}>
                {emptyValueLabel && <option value="">{emptyValueLabel}</option>}
                {datas.map((data: any) => (
                    <option key={data.id} value={data.id}>
                        {data.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    )

}

export default SelectInput
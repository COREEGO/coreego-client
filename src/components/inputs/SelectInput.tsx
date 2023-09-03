import { useSearchParams } from "react-router-dom";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react"
import React, { useState } from "react";

interface SelectInputInterface {
    datas: Array<any>,
    value: any,
    formLabel: string,
    emptyValueLabel?: string,
    name: string
}

const SelectInput: React.FC<SelectInputInterface> = ({ emptyValueLabel, datas, value, formLabel, name }) => {

    const [defaultValue, setDefaultValue] = useState<any>(value ? value : '')

    return (
            <FormControl>
                {formLabel && <FormLabel>{formLabel}</FormLabel>}
                <Select id={name} name={name} value={defaultValue} onChange={(e: any) => setDefaultValue(e.target.value)}>
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
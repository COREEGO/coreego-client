import { useSearchParams } from "react-router-dom";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react"
import React, { useState } from "react";

interface SelectInputInterface {
    options: Array<any>,
    value: any,
    label?: string,
    emptyOptionLabel?: string,
    name: string
}

const SelectInput: React.FC<SelectInputInterface> = ({ emptyOptionLabel, options, value, label, name }) => {

    const [defaultValue, setDefaultValue] = useState<any>(value ? value : '')

    return (
            <FormControl>
                {label && <FormLabel color="var(--coreego-blue)" >{label}</FormLabel>}
                <Select id={name} name={name} value={defaultValue} onChange={(e: any) => setDefaultValue(e.target.value)}>
                    {emptyOptionLabel && <option value="">{emptyOptionLabel}</option>}
                    {options.map((option: any) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
    )

}

export default SelectInput
import { useSearchParams } from "react-router-dom";
import { Button, FormControl, FormLabel, Select } from "@chakra-ui/react"
import React, { useState } from "react";

interface SelectInputInterface {
    options: Array<any>,
    value: any,
    updateValue: (e:any) => void,
    label?: string,
    emptyOptionLabel?: string,
}

const SelectInput: React.FC<SelectInputInterface> = ({ emptyOptionLabel, options, value,updateValue, label }) => {


    return (
            <FormControl>
                {label && <FormLabel color="var(--coreego-blue)" >{label}</FormLabel>}
                <Select value={value} onChange={(e: any) => updateValue(e.target.value)}>
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
import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { useState, useEffect } from "react";


interface PropsInterface {
    value: string;
    onChange: (value: string) => void;
    name: string;
    options?: any;
    datas: any[];
    labelEmptyBox?: string
}

const RadioCard: React.FC<any> = (props) => {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input: any = getInputProps();
    const checkbox: any = getRadioProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box {...checkbox} {...props.options} cursor='pointer'
            >
                {props.children}
            </Box>
        </Box>
    );
};

const RadioGroupInput: React.FC<PropsInterface> = ({ value, onChange, datas, labelEmptyBox, name, options }) => {

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: name,
        value: value,
        onChange: (newValue: string) => onChange(newValue),
    });
    const group = getRootProps();

    const dataList: any = [...datas]

    return (
        <HStack {...group} flexWrap={"wrap"}>
            {labelEmptyBox && (
                <RadioCard
                    {...getRadioProps({ value: '' })}
                    options={options}
                    onChange={() => onChange('')}
                >
                    {labelEmptyBox}
                </RadioCard>
            )}

            {
                dataList.map((data: any, i: number) => {
                    const radio = getRadioProps({ value: String(data.id) });
                    return (
                        <RadioCard key={i} {...radio} options={options} >
                            {data.label}
                        </RadioCard>
                    )
                })
            }
        </HStack>
    )

}

export default RadioGroupInput
import { FormControl, FormLabel, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from "@chakra-ui/react"


interface RangeInputInterface {
    label?: string
}

const RangeInput: React.FC<RangeInputInterface> = ({ label }) => {

    return (
        <FormControl>
            {label && <FormLabel color="var(--coreego-blue)" >{label}</FormLabel>}
            <RangeSlider
                aria-label={['min', 'max']}
                colorScheme='gray'
                defaultValue={[10, 30]}
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
                <RangeSliderThumb boxSize={6} index={1} />
            </RangeSlider>
        </FormControl>
    )
}

export default RangeInput
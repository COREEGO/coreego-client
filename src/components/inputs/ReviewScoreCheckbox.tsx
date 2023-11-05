import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";

interface PropsInterface {
  value: number;
  onChange: (value: number) => void;
}

const RadioCard: React.FC<any> = (props) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        _checked={{
          color: 'yellow'
        }}
        fontSize={24}
      >
        {props.children}
      </Box>
    </Box>
  );
}

const ReviewScoreCheckbox: React.FC<PropsInterface> = ({ value, onChange }) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'stars',
    value: String(value),
    onChange: (newValue: string) => onChange(Number(newValue)),
  });

  const group = getRootProps();

  return (
    <HStack justifyContent="center" {...group}>
      {Array.from({ length: 5 }, (_, i) => {
        const radio = getRadioProps({ value: String(i + 1) });
        return (
          <RadioCard key={i} {...radio}>
            <BsFillStarFill color={value <= i ? 'gray' : 'yellow'} />
          </RadioCard>
        );
      })}
    </HStack>
  );
};

export default ReviewScoreCheckbox;

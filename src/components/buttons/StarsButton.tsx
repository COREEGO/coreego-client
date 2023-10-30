import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { BsFillStarFill } from "react-icons/bs";

interface StarsButtonInterface {
    value: number;
    onChange: (e: any) => void;
}

const StarsButton: React.FC<StarsButtonInterface> = ({ value, onChange }) => {

    const starsValue = value ? value : 0

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <HStack justifyContent={"center"}>
            {Array.from({ length: 5 }, (_, i) => (
                <BsFillStarFill
                    color={starsValue <= i ? 'gray' : 'yellow'}
                    style={{ fontSize: 34, cursor: 'pointer' }}
                    key={i} onClick={() => onChange(i + 1)}
                />
            ))}
        </HStack>
    );
};

export default StarsButton;

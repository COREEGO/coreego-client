import { Slider } from "@mui/material";
import React, { useEffect } from "react";


const DoubleSliderInput = ({onChange, defaultValue, rangeValue}) => {

    const [value, setValue] = React.useState([Number(defaultValue[0]), Number(defaultValue[1])]);


    const [pendingUpdate, setPendingUpdate] = React.useState(false);

    const minDistance = 10;

    const handleChange = (event, newValue, activeThumb) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }

      // Set the pending update flag
      setPendingUpdate(true);
    };

    useEffect(() => {
      const timerId = setTimeout(() => {
        if (pendingUpdate) {
          onChange(value);
          setPendingUpdate(false);
        }
      }, 1000);
      return () => clearTimeout(timerId);
    }, [value, pendingUpdate, onChange]);

    return (
        <Slider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value}
        min={Number(rangeValue[0])}
        max={Number(rangeValue[1])}
        onChange={handleChange}
        marks={[
          {
            value: Number(rangeValue[0]),
            label: 'min'
          },
          {
            value: Number(rangeValue[1]),
            label: 'max'
          },
        ]}
        step={500}
        valueLabelDisplay="auto"
        disableSwap
      />
    )
}

export default DoubleSliderInput
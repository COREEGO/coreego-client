import { Stack, Step, StepButton, StepLabel, Stepper } from "@mui/material"

const StepperForm = ({ steps = [], errors, activeStep, setActiveStep = () => {} }) => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        width: '100%',
        overflowX: 'auto'
      }}
		>
      <Stepper
        sx={{
          width: '90%',
          py: 3
        }}
        activeStep={activeStep}
        nonLinear
			>
        {steps.map((step, index) => {
          let labelProps = {}
          if (errors[step.element]) {
            labelProps.error = true
          } else {
            labelProps.error = false
          }
          return (
            <Step sx={{ width: 'fit-content' }} key={index}>
              <StepButton
                color='inherit'
                onClick={() => setActiveStep(index)}
							>
                <StepLabel {...labelProps}>{step.label}</StepLabel>
              </StepButton>
            </Step>
          )
        })}
      </Stepper>
    </Stack>
  )
}

export default StepperForm

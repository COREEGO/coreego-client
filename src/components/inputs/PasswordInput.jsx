import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { EYE_CLOSE_ICON, EYE_ICON } from '../../utils/icon'

const PasswordInput = ({ ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <TextField
      {...props}
      type={isVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={() => setIsVisible(!isVisible)}>
              {!isVisible ? <EYE_ICON /> : <EYE_CLOSE_ICON />}
            </IconButton>
          </InputAdornment>
				)
      }}
		/>
  )
}

export default PasswordInput

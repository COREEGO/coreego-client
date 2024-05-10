import { Box } from '@mui/material'
import { allowedExtensions } from '../../utils'

const UpladButton = ({
	children,
	onChange,
	multiple = true,
	...props
}) => {
  return (
    <Box
      {...props}
      sx={{ position: 'relative', width: '100%', height: '100%' }}
      component='span'
		>
      <Box
        component='input'
        sx={{
          height: '100%',
          cursor: 'pointer',
          opacity: 0,
          zIndex: 300,
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          height: '100%'
        }}
        type='file'
        accept={allowedExtensions.join(',')}
        multiple={multiple}
        onChange={onChange}
        capture="gallery"
			/>
      {children}
    </Box>
  )
}

export default UpladButton

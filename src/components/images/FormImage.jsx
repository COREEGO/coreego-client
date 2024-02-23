import { Box, IconButton } from '@mui/material'
import { TRASH_ICON } from '../../utils/icon'

const FormImage = ({ imageUrl, onRemove, displayTrash = true }) => {
  return (
    <Box sx={{ position: 'relative', width: 100, height: 100 }}>
      <img
        style={{
          objectFit: 'cover',
          borderRadius: 10,
          width: '100%',
          height: '100%'
        }}
        src={imageUrl}
			/>
      {displayTrash && (
      <IconButton
        onClick={onRemove}
        sx={{
          color: 'white',
          position: 'absolute',
          bottom: 1,
          right: 1,
          backgroundColor: 'var(--coreego-red)'
        }}
        aria-label='remove image'
				>
        <TRASH_ICON />
      </IconButton>
			)}
    </Box>
  )
}

export default FormImage

import { Card, CardMedia, IconButton, Stack } from '@mui/material'
import { TRASH_ICON } from '../../utils/icon'

const PreviewImageCard = ({
	imageUrl,
	onRemove,
	displayTrash = true,
  ...props
}) => {
  return (
    <Card
      {...props}
      sx={{
        width: 80,
        height: 80,
        display: 'flex',
        position: 'relative'
      }}
		>
      <CardMedia
        component='img'
        width='100%'
        height='100%'
        image={imageUrl}
			/>
      {displayTrash && (
      <Stack
        sx={{
          position: 'absolute',
          transition: '0.3s',
          opacity: 0,
          '&:hover': {
            opacity: 1
          },
          justifyContent: 'center',
          alignContents: 'center',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--coreego-blue-opacity)'
        }}
				>
        <IconButton onClick={onRemove} sx={{ color: 'white' }}>
          <TRASH_ICON />
        </IconButton>
      </Stack>
			)}
    </Card>
  )
}

export default PreviewImageCard

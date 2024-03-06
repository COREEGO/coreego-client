import { Card, CardContent, Typography, Stack } from '@mui/material'

const AnaliticsCountCard = ({ props, data }) => {
  return (
    <Card {...props} sx={{ backgroundColor: data.color }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}
			>
          <Typography component='div' variant='h6' fontWeight="regular" textTransform="uppercase">
            {data.title}
          </Typography>
        <Typography component='span' variant='h4'>
          {data.count}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnaliticsCountCard

import { Typography } from '@mui/material'

const TitleSectionText = ({ startText, endText, ...props }) => {
  return (
    <Typography {...props} textTransform="uppercase" variant={props.variant || 'h6' } component='span' fontWeight='bold'>
      {startText}{' '}
      <span style={{ color: 'var(--coreego-blue)' }}>
        {endText}
      </span>
    </Typography>
  )
}

export default TitleSectionText

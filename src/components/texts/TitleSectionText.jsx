import { Typography } from '@mui/material'

const TitleSectionText = ({
	startText = '',
	endText = '',
	...props
}) => {
  return (
    <Typography
      {...props}
      textTransform='uppercase'
      fontSize={24}
      component={props.component || 'div'}
      fontWeight='bolder'
		>
      {startText}{' '}
      {endText && (
      <span style={{ color: 'var(--coreego-blue)' }}>
        {endText}
      </span>
			)}
    </Typography>
  )
}

export default TitleSectionText

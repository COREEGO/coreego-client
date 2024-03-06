import { Box } from '@mui/material'
import {
	Bar,
	BarChart,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const TinyBarFilterChart = ({ datas }) => {
  return (
    <Box sx={{ width: '100%', height: 340 }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={datas}>
          <Bar dataKey='value' nameKey='label' fill='#8884d8' label />
          <XAxis dataKey='label' />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default TinyBarFilterChart

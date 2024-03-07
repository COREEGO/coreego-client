import { Box } from '@mui/material'
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const DefaultTinyBarChart = ({ datas }) => {
  return (
    <Box sx={{ width: '100%', height: 340 }}>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={datas}>
          <Bar
            dataKey='value'
            nameKey='label'
            fill='var(--coreego-red)'
            label
					/>
          <XAxis dataKey='label' />
          <YAxis />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default DefaultTinyBarChart

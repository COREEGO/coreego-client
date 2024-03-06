import {
	DemoContainer,
	DemoItem
} from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography
} from "@mui/material";
import React from "react";
import {
	LineChart,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
	CartesianGrid,
	ResponsiveContainer
} from "recharts";
import moment from "moment";
import LoadingPage from "../LoadingPage";

const DefaultLinechart = ({ datas }) => {
	const [value, setValue] = React.useState("month")

	return (
		<>
			<FormControl>
				<InputLabel id="demo-simple-select-label">
					Temporalité
				</InputLabel>
				<Select
					size="small"
					value={value}
					label="Temporalité"
					onChange={(event) => setValue(event.target.value)}
				>
					<MenuItem value="month">Mois</MenuItem>
					<MenuItem value="week">Semaine</MenuItem>
				</Select>
			</FormControl>
			<Box sx={{height: 300, mt: 3 }}>
				{datas ?  <ResponsiveContainer width="100%" height="100%">
					<LineChart data={datas[value]}>
						<XAxis dataKey="date" type="category" />
						<YAxis />
						<Tooltip />
						<CartesianGrid strokeDasharray="3 3" />
						<Line
							type="monotone"
							dataKey="count"
							name="nb publication"
							fill="red"
							strokeWidth={2}
							activeDot={{ r: 5 }}
						/>
					</LineChart>
				</ResponsiveContainer> : <LoadingPage type="data" />}

			</Box>
		</>
	);
};

export default DefaultLinechart;

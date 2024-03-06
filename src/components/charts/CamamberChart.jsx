import { Box } from "@mui/material";
import React, { useMemo } from "react";
import {
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
	Tooltip
} from "recharts";

const CamamberChart = ({ datas }) => {
	const formatDatas = React.useMemo(() => {
		return datas?.reduce((prev, next) => {
			if (next.value > 0) {
				prev.push(next);
			}
			return prev;
		}, []);
	}, [datas]);

	console.log(formatDatas);

	return (
		<Box sx={{ width: "100%", height: 340 }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={formatDatas}
						dataKey="value"
						nameKey="label"
						fill="#8884d8"
						innerRadius={60}
						outerRadius={80}
						paddingAngle={1}
						label
					>
						{formatDatas &&
							formatDatas.map((data, index) => (
								<Cell key={`cell-${index}`} fill={data?.color} />
							))}
					</Pie>
					<Tooltip />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default CamamberChart;

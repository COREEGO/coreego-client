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

const CamamberChart = ({ datas, showLegend = true }) => {


	return (
		<Box sx={{ width: "100%", height: 340 }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={datas}
						dataKey='value'
						nameKey="label"
						fill="var(--coreego-blue)"
						innerRadius={60}
						outerRadius={80}
						paddingAngle={1}
						label
					>
						{datas &&
							datas.map((data, index) => (
								<Cell
									key={`cell-${index}`}
									fill={data?.color || "var(--coreego-blue)"}
								/>
							))}
					</Pie>
					<Tooltip />
					{showLegend && <Legend />}
				</PieChart>
			</ResponsiveContainer>
		</Box>
	);
};

export default CamamberChart;

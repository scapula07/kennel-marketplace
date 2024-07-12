import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const PieChartComponent = ({ value }) => {

  const percentage =  value * 100;
  const angle = 360 * (percentage / 100);

  const data = [
    { name: 'User Engagement rate', value: percentage },
    { name: 'Remaining', value: 100 - percentage }
  ];
  const COLORS = ['#FF8042','grey'];
  return (
          <PieChart width={350} height={350}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            className='text-sm'
          
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        );
};

export default  PieChartComponent;

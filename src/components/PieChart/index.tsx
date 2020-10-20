import React from 'react';
import { Pie, PieChart as Chart, Cell, ResponsiveContainer} from 'recharts'

import { Container, SideLeft, LegendContainer, Legend, SideRight } from './styles';

interface IPieChartProps {
  data: {
    name: string;
    value: number;
    percent: number;
    color: string;
  }[]
}

const PieChart: React.FC<IPieChartProps> = ({ data }) => (
    <Container>
      <SideLeft>
        <h2>Relação</h2>
        <LegendContainer>
          {
            data.map(indicator => (
              <Legend color={indicator.color} key={indicator.name}>
                <div>{`${indicator.percent}%`}</div>
                <span>{indicator.name}</span>
              </Legend>
            ))
          }
        </LegendContainer>
      </SideLeft>

      <SideRight>
        <ResponsiveContainer>
          <Chart>
            <Pie 
              data={data}
              dataKey="percent"
              >
                {
                  data.map(indicator => (
                    <Cell key={indicator.name} fill={indicator.color} />
                  ))
                }
            </Pie>
          </Chart>
        </ResponsiveContainer>
      </SideRight>
    </Container>
  );

export default PieChart;
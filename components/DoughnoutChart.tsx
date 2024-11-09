"use client"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnoutChart = ({ accounts } : DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: ['12233', '12355', '12531'],
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],
        labels: ['Bank 1', 'Bank 2', 'Bank 3']
    }
  return (
    <Doughnut 
        data={data} 
        options={{
            cutout: '60%', //width of the dooughnut chart
            plugins: {
                legend: {
                    display: false //hides the legend display of banks
                }
            }
        }}
    />
  )
}

export default DoughnoutChart
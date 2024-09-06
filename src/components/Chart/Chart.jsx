import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import s from "./Chart.module.css";

// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

// Data for the Doughnut chart
const data = {
  labels: [
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
  ],
  datasets: [
    {
      data: [8700, 3800.74, 1500, 800, 2208.5, 300, 3400, 1230, 610],
      backgroundColor: [
        "#F6C23E",
        "#3DD597",
        "#FF6384",
        "#FFCE56",
        "#36A2EB",
        "#7D4A89",
        "#4BC0C0",
        "#8A2BE2",
        "#32CD32",
      ],
      borderWidth: 0,
      hoverBackgroundColor: [
        "#F6C23E",
        "#3DD597",
        "#FF6384",
        "#FFCE56",
        "#36A2EB",
        "#7D4A89",
        "#4BC0C0",
        "#8A2BE2",
        "#32CD32",
      ],
    },
  ],
};

// Options for the Doughnut chart
const options = {
  cutout: "70%", // Adjusts the size of the inner hole
  plugins: {
    legend: {
      display: false, // Hide the default legend
    },
    tooltip: {
      enabled: true,
    },
  },
};

const Chart = () => {
  const totalAmount = data.datasets[0].data
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  return (
    <div className={s.doughnutContainer}>
      <Doughnut data={data} options={options} />
      <div className={s.doughnutCenter}>
        <span> ₴ {totalAmount}</span>
      </div>
    </div>
  );
};

export default Chart;

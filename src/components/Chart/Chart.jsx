import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import s from "./Chart.module.css";
import { useSelector } from "react-redux";
import { selectPeriodTransactions } from "../../redux/transaction/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  cutout: "70%",
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
};

const Chart = () => {
  const { categoriesSummary = [], periodTotal = 0 } = useSelector(
    selectPeriodTransactions
  );
  const categoriesNames = categoriesSummary.map((category) => category.name);
  if (categoriesNames.length === 0) {
    return <p className={s.notice}>Sorry, No transactions for that period</p>;
  }
  const data = {
    labels: categoriesNames,
    datasets: [
      {
        data: categoriesSummary.map((category) => category.total),
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
        borderShadow: (0, 0, 0, 0.25),
        borderColor: (0, 0, 0, 0.25),
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

  return (
    <div className={s.doughnutContainer}>
      <Doughnut className={s.doughnut} data={data} options={options} />
      <div className={s.doughnutCenter}>
        <span> ₴ {periodTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Chart;

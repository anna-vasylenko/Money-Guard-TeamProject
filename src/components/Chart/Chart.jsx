import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import s from "./Chart.module.css";
import { useSelector } from "react-redux";
import { selectPeriodTransactions } from "../../redux/transaction/selectors";
import {
  backgroundColor,
  hoverBackgroundColor,
  options,
} from "../../helpers/statisticsColors";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const { categoriesSummary = [], periodTotal = 0 } = useSelector(
    selectPeriodTransactions
  );
  const categoriesNames = categoriesSummary.filter(
    (category) => category.type === "EXPENSE"
  );
  if (categoriesNames.length === 0) {
    return <p className={s.notice}>Sorry, No transactions for that period</p>;
  }

  const data = {
    labels: categoriesNames.map((category) => category.name),
    datasets: [
      {
        data: categoriesNames.map((category) => category.total),
        backgroundColor,
        borderWidth: 0,
        hoverBackgroundColor,
      },
    ],
  };

  return (
    <div className={s.doughnutContainer}>
      <Doughnut data={data} options={options} />
      <div className={s.doughnutCenter}>
        <span className={s.innerCenter}> ₴ {periodTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Chart;

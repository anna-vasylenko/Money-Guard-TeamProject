import { useSelector } from "react-redux";
import s from "./StatisticsTable.module.css";
import { getPeriodTransactions } from "../../redux/transaction/operations";

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

const StatisticsTable = () => {
  const { categoriesSummary, incomeSummary, expenseSummary, periodTotal } =
    useSelector(getPeriodTransactions);
  if (categoriesSummary.length === 0) {
    return <p>Sorry, No transactions for this period</p>;
  }
  return (
    <div className={s.customLegend}>
      {categoriesSummary.map((category, index) => (
        <div key={index} className={s.legendItem}>
          <span
            className={s.legendColor}
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
            }}
          ></span>
          <span>{}</span>
          <span>
            {data.datasets[0].data[index].toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatisticsTable;

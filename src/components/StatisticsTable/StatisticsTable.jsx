import { useSelector } from "react-redux";
import s from "./StatisticsTable.module.css";
import { selectPeriodTransactions } from "../../redux/transaction/selectors";

const StatisticsTable = () => {
  const {
    categoriesSummary = [],
    incomeSummary = 0,
    expenseSummary = 0,
  } = useSelector(selectPeriodTransactions);

  const backgroundColor = [
    "#F6C23E",
    "#3DD597",
    "#FF6384",
    "#FFCE56",
    "#36A2EB",
    "#7D4A89",
    "#4BC0C0",
    "#8A2BE2",
    "#32CD32",
  ];

  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead className={s.tableHead}>
          <tr className={s.table_heading}>
            <th className={s.table_heading}>Category</th>
            <th className={s.table_heading}>Sum</th>
          </tr>
        </thead>
        <tbody className={s.table_body}>
          {categoriesSummary.map((category, index) => (
            <tr key={index} className={s.table_row}>
              <td className={s.table_data}>
                <span
                  className={s.legendColor}
                  style={{
                    backgroundColor:
                      backgroundColor[index % backgroundColor.length],
                  }}
                ></span>
                {category.name}
              </td>
              <td className={s.table_data}>{category.total.toFixed(2)}</td>
            </tr>
          ))}
          <tr className={s.bottom_row}>
            <td className={s.bottom_data}>Expenses:</td>
            <td className={s.bottom_data}>
              <span className={s.expenses_summary}>
                {expenseSummary.toFixed(2)}
              </span>
            </td>
          </tr>
          <tr className={s.bottom_row}>
            <td className={s.bottom_data}>Income:</td>
            <td className={s.bottom_data}>
              <span className={s.income_summary}>
                {incomeSummary.toFixed(2)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Chart } from "react-chartjs-2";

import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import { getPeriodTransactions } from "../../redux/transaction/operations";

const StatisticsTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPeriodTransactions);
  }, [dispatch]);

  return (
    <div>
      <Chart />
      <StatisticsDashboard />
      <StatisticsTable />
    </div>
  );
};

export default StatisticsTab;

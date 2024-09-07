import Chart from "../../components/Chart/Chart";
import StatisticsDashboard from "../../components/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";

const StatisticsTab = () => {
  return (
    <div>
      <h1>Statistics</h1>
      <Chart />
      <StatisticsDashboard />
      <StatisticsTable />
    </div>
  );
};

export default StatisticsTab;

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import s from "./Chart.module.css";
import { useSelector } from "react-redux";
import { selectPeriodTransactions } from "../../redux/transaction/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const shadowBorderPlugin = {
  id: "shadowBorderPlugin",
  afterDraw: (chart) => {
    const { ctx } = chart;
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i);
      meta.data.forEach((element) => {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"; // Shadow color
        ctx.shadowBlur = 10; // Shadow blur level
        ctx.shadowOffsetX = 0; // Horizontal shadow offset
        ctx.shadowOffsetY = 0; // Vertical shadow offset
        ctx.lineJoin = "round"; // Makes the border corners rounded
        ctx.lineWidth = 2; // Width of the shadow border
        ctx.strokeStyle = element.options.backgroundColor; // Matches shadow to segment color
        element.draw(ctx); // Draw the shadow around the segment
        ctx.restore();
      });
    });
  },
};

const options = {
  cutout: "70%",
  plugins: {
    plugin: [shadowBorderPlugin],
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
  const categoriesNames = categoriesSummary.filter(
    (category) => category.type === "EXPENSE"
  );
  if (categoriesNames.length === 0) {
    return <p className={s.notice}>Sorry, No transactions for this period</p>;
  }

  const data = {
    labels: categoriesNames.map((category) => category.name),
    datasets: [
      {
        data: categoriesNames.map((category) => category.total),
        backgroundColor: [
          "#24cca7",
          "#81e1ff",
          "#4a56e2",
          "#6e78e8",
          "#c5baff",
          "#fd9498",
          "#ffd8d0",
          "#fed057",
          "#00ad84",
        ],
        borderWidth: 0,
        hoverBackgroundColor: [
          "#4de5c0", // Lighter for "#24cca7"
          "#a1ecff", // Lighter for "#81e1ff"
          "#5d6df5", // Lighter for "#4a56e2"
          "#8693f1", // Lighter for "#6e78e8"
          "#d5ccff", // Lighter for "#c5baff"
          "#ffa5a9", // Lighter for "#fd9498"
          "#ffe5da", // Lighter for "#ffd8d0"
          "#ffe080", // Lighter for "#fed057"
          "#00c89b", // Lighter for "#00ad84"
        ],
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

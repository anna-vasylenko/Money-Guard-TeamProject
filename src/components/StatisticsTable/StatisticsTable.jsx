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
  return (
    <div className={s.customLegend}>
      {data.labels.map((label, index) => (
        <div key={index} className={s.legendItem}>
          <span
            className={s.legendColor}
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index],
            }}
          ></span>
          <span>{label}</span>
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

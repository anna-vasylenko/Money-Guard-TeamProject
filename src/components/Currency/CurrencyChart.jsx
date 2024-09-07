import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const CurrencyChart = ({ data }) => {
  const renderDot = (props) => {
    const { cx, cy, index } = props;
    if (data[index].name === "USD" || data[index].name === "EURO") {
      return (
        <circle
          key={`dot-${index}`}
          cx={cx}
          cy={cy}
          r={4}
          fill="#563EAF"
          stroke="#ff6f61"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "300px",

        position: "relative",
        marginTop: "15px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} className="custom-chart">
          <Area
            type="monotone"
            dataKey="value"
            stroke="none"
            fill="rgba(255, 255, 255, 0.2)"
            fillOpacity={1}
            transform="translate(0, 20)"
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#ff6f61"
            strokeWidth={2}
            fill="none"
            activeDot={{ r: 4, fill: "#ff6f61" }}
            dot={renderDot}
          >
            <LabelList
              dataKey="label"
              position="top"
              offset={10}
              fill="#ff6f61"
              fontSize={14}
            />
          </Area>
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyChart;

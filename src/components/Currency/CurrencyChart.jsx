import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import s from "./Currency.module.css";

const CurrencyChart = ({ data }) => {
  const renderLabelWithIcon = (props) => {
    const { x, y, value, index } = props;
    let icon = null;

    if (data[index].name === "USD") {
      icon = "$";
    } else if (data[index].name === "EURO") {
      icon = "€";
    }

    return (
      <text x={x} y={y - 10} fill="#ff6f61" fontSize={14} textAnchor="middle">
        {icon ? `${icon} ${value}` : value}
      </text>
    );
  };

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
    <div className={s.graphik}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} className="custom-chart">
          <Area
            type="monotone"
            dataKey="currency"
            stroke="none"
            fill="rgba(255, 255, 255, 0.2)"
            fillOpacity={1}
            transform="translate(0, 15)"
          />

          <Area
            type="monotone"
            dataKey="currency"
            stroke="#ff6f61"
            strokeWidth={2}
            fill="none"
            activeDot={{ r: 4, fill: "#ff6f61" }}
            dot={renderDot}
          >
            <LabelList
              dataKey="label"
              content={renderLabelWithIcon}
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

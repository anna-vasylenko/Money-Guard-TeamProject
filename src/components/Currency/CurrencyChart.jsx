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
    <div className={s.graph}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} className="custom-chart">
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.3} />

              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="currency"
            stroke="none"
            fill="url(#colorGradient)"
            fillOpacity={1}
            transform="translate(0, 10)"
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
              fontSize={12}
            />
          </Area>
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyChart;

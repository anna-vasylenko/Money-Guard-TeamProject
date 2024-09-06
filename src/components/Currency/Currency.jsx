import { useDispatch } from "react-redux";
import React from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const Currency = () => {
  // Дані для графіків
  const data = [
    { name: "x", value: 0 },
    { name: "USD", value: 37.55 },
    { name: "x", value: 0 },
    { name: "EURO", value: 20.0 },
    { name: "x", value: 0 },
  ];

  return (
    <div>
      <ul>
        <li>
          <h3>Currency</h3>
          <h3>Purchase</h3>
          <h3>Sale</h3>
        </li>
        <li>
          <p>USD</p>
          <p>{`${data[1].value}`}</p> {/* Відображення курсу валюти */}
          <p>{`${data[1].value}`}</p>
        </li>
        <li>
          <p>EUR</p>
          <p>{`${data[3].value}`}</p> {/* Відображення курсу валюти */}
          <p>{`${data[3].value}`}</p>
        </li>
      </ul>

      {/* Графіки */}
      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "#2b1a64",
          position: "relative",
          marginTop: "15px", // Відступ між графіками
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} className="custom-chart">
            {/* Нижній графік, що повторює форму верхньої кривої */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="rgba(255, 255, 255, 0.2)"
              fillOpacity={1}
              transform="translate(0, 20)"
            />
            {/* Верхній графік, що відображає курс валют */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#ff6f61"
              strokeWidth={2}
              fill="none"
              activeDot={{ r: 4, fill: "#ff6f61" }}
            >
              {/* Використання LabelList для відображення значень */}
              <LabelList
                dataKey="value"
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
    </div>
  );
};

export default Currency;

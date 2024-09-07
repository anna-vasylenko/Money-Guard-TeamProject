import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { fetchCurrencyRates } from "../../helpers/currencyMono";
import s from "./Currency.module.css";

const Currency = () => {
  const [usdRate, setUsdRate] = useState({ rateBuy: 0, rateSell: 0 });
  const [euroRate, setEuroRate] = useState({ reteBuy: 0, rateSell: 0 });

  useEffect(() => {
    const getCurrencyRates = async () => {
      const currencyRates = await fetchCurrencyRates();

      if (currencyRates.length > 0) {
        const usd = currencyRates.find(
          (rate) => rate.currencyCodeA === 840 && rate.currencyCodeB === 980
        );
        const euro = currencyRates.find(
          (rate) => rate.currencyCodeA === 978 && rate.currencyCodeB === 980
        );

        if (usd)
          setUsdRate({
            rateBuy: usd.rateBuy,
            rateSell: usd.rateSell.toFixed(2),
          });
        if (euro)
          setEuroRate({
            rateBuy: euro.rateBuy,
            rateSell: euro.rateSell.toFixed(2),
          });
      }
    };

    getCurrencyRates();
  }, []);

  const data = [
    { name: "start", value: 8, label: "" },
    { name: "USD", value: usdRate.rateBuy, label: usdRate.rateBuy },
    { name: "midle", value: 10, label: "" },
    {
      name: "EURO",
      value: euroRate.rateBuy,
      label: euroRate.rateBuy,
    },
    { name: "end", value: 25, label: "" },
  ];

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
    <div>
      <ul className={s.list}>
        <li className={s.item}>
          <h3>Currency</h3>
          <p>USD</p>
          <p>EUR</p>
        </li>
        <li className={s.item}>
          <h3>Purchase</h3>
          <p>{`${usdRate.rateBuy}`}</p>
          <p>{`${euroRate.rateBuy}`}</p>
        </li>
        <li className={s.item}>
          <h3>Sale</h3>
          <p>{`${usdRate.rateSell}`}</p>
          <p>{`${euroRate.rateSell}`}</p>
        </li>
      </ul>

      <div
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "#2b1a64",
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
    </div>
  );
};

export default Currency;

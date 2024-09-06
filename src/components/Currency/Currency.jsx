import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { fetchCurrencyRates } from "../../helpers/currencyMono";

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

        if (usd) setUsdRate({ rateBuy: usd.rateBuy, rateSell: usd.rateSell });
        if (euro)
          setEuroRate({ rateBuy: euro.rateBuy, rateSell: euro.rateSell });
      }
    };

    getCurrencyRates();
  }, []);

  const data = [
    { name: "start", value: 8 },
    { name: "USD", value: usdRate.rateBuy },
    { name: "midle", value: 10 },
    { name: "EURO", value: euroRate.rateBuy },
    { name: "end", value: 25 },
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
          <p>{`${usdRate.rateBuy}`}</p>
          <p>{`${usdRate.rateSell}`}</p>
        </li>
        <li>
          <p>EUR</p>
          <p>{`${euroRate.rateBuy}`}</p>
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
            >
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

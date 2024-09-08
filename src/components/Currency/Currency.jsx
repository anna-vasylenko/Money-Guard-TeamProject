import React, { useEffect, useState } from "react";
import { getCurrencyRates } from "../../helpers/currencyMono";
import CurrencyChart from "./CurrencyChart";
import s from "./Currency.module.css";

const Currency = () => {
  const [usdRate, setUsdRate] = useState({ rateBuy: 0, rateSell: 0 });
  const [euroRate, setEuroRate] = useState({ rateBuy: 0, rateSell: 0 });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const currencyData = await getCurrencyRates();
        console.log("Currency data:", currencyData);

        if (currencyData.usdRate) setUsdRate(currencyData.usdRate);
        if (currencyData.euroRate) setEuroRate(currencyData.euroRate);
      } catch (error) {
        console.error("Error fetching currency data:", error.message);
      }
    };

    fetchRates();
  }, []);

  const data = [
    { name: "start", currency: 8, label: "" },
    { name: "USD", currency: usdRate.rateBuy, label: usdRate.rateBuy },
    { name: "midle", currency: 10, label: "" },
    { name: "EURO", currency: euroRate.rateBuy, label: euroRate.rateBuy },
    { name: "end", currency: 25, label: "" },
  ];

  return (
    <div className={s.wrapper}>
      <table className={s.tab}>
        <thead className={s.header}>
          <tr className={s.tr}>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          <tr className={s.tr}>
            <td>USD</td>
            <td>{usdRate.rateBuy}</td>
            <td>{usdRate.rateSell}</td>
          </tr>
          <tr className={s.tr}>
            <td style={{ paddingLeft: "2px" }}>EUR</td>
            <td style={{ paddingLeft: "8px" }}>{euroRate.rateBuy}</td>
            <td style={{ paddingLeft: "5px" }}>{euroRate.rateSell}</td>
          </tr>
        </tbody>
      </table>
      <CurrencyChart data={data} />
    </div>
  );
};

export default Currency;

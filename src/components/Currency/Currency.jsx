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
        <thead>
          <tr className={(s.tr, s.header)}>
            <th className={s.item}>Currency</th>
            <th className={s.item}>Purchase</th>
            <th className={s.item}>Sale</th>
          </tr>
        </thead>
        <tbody>
          <tr className={s.tr}>
            <td className={s.item}>USD</td>
            <td className={s.item}>{usdRate.rateBuy}</td>
            <td className={s.item}>{usdRate.rateSell}</td>
          </tr>
          <tr className={s.tr}>
            <td className={s.item}>EUR</td>
            <td className={s.item}>{euroRate.rateBuy}</td>
            <td className={s.item}>{euroRate.rateSell}</td>
          </tr>
        </tbody>
      </table>
      <CurrencyChart data={data} />
    </div>
  );
};

export default Currency;

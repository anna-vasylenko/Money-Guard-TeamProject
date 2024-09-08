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
    { name: "start", value: 8, label: "" },
    { name: "USD", value: usdRate.rateBuy, label: usdRate.rateBuy },
    { name: "midle", value: 10, label: "" },
    { name: "EURO", value: euroRate.rateBuy, label: euroRate.rateBuy },
    { name: "end", value: 25, label: "" },
  ];

  return (
    <div>
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
            <td>EUR</td>
            <td>{euroRate.rateBuy}</td>
            <td>{euroRate.rateSell}</td>
          </tr>
        </tbody>
      </table>

      {/* <div className={s.wrapper}>
        <div className={s.headContainer}>
          <p className={s.currency}>Currency</p>
          <p className={s.purchase}>Purchase</p>
          <p className={s.sale}>Sale</p>
        </div>
        <div className={s.valWrapper}>
          <div className={s.valContainer}>
            <p>USD</p>
            <p>{usdRate.rateBuy.toFixed(2)}</p>
            <p>{usdRate.rateSell.toFixed(2)}</p>
          </div>
          <div className={s.valContainer}>
            <p>EUR</p>
            <p>{euroRate.rateBuy.toFixed(2)}</p>
            <p>{currency.eur.rateSell.toFixed(2)}</p>
          </div>
        </div>
        <img className={s.image} src={getImage()} alt="stats" />
      </div> */}

      <CurrencyChart data={data} />
    </div>
  );
};

export default Currency;

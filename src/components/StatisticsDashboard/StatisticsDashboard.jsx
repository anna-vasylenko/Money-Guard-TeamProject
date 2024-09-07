import { useDispatch } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";

import { getPeriodTransactions } from "../../redux/transaction/operations";
import s from "./StatisticsDashboard.module.css";
import { month, yearOption } from "../../helpers/monthAndYearStatistics";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();

  const [selectDate, setSelectDate] = useState({
    year: new Date().getFullYear(),
  });

  const handleDateMonth = (selectedMonth) => {
    if (selectedMonth.value === "AllMonth") {
      return setSelectDate((prev) => ({ year: prev.year }));
    }
    setSelectDate((prev) => ({ ...prev, month: selectedMonth.value }));
  };

  const handleDateYear = (selectedYear) => {
    setSelectDate((prev) => ({ ...prev, year: selectedYear.value }));
  };

  useEffect(() => {
    dispatch(getPeriodTransactions(selectDate));
  }, [dispatch, selectDate]);

  return (
    <div className={s.boxSelect}>
      <Select
        className={s.select}
        options={month}
        onChange={handleDateMonth}
        defaultValue={month[0]}
        classNamePrefix="react-select"
      />
      <Select
        className={s.select}
        options={yearOption}
        onChange={handleDateYear}
        defaultValue={yearOption.find(
          (option) => option.value === selectDate.year
        )}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default StatisticsDashboard;

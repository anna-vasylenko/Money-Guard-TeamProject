import { useDispatch } from "react-redux";
import Select from "react-select";
import { useEffect, useState } from "react";

import { getPeriodTransactions } from "../../redux/transaction/operations";
import s from "./StatisticsDashboard.module.css";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const [selectDate, setSelectDate] = useState({
    year: new Date().getFullYear(),
  });

  console.log(selectDate);

  useEffect(() => {
    dispatch(getPeriodTransactions(selectDate));
  }, [dispatch, selectDate]);

  const Allyear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => Allyear - i);
  const yearOption = years.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  const handleDateMonth = (selectedMonth) => {
    if (selectedMonth.value === "AllMonth") {
      return setSelectDate((prev) => ({ year: prev.year }));
    }
    setSelectDate((prev) => ({ ...prev, month: selectedMonth.value }));
  };

  const handleDateYear = (selectedYear) => {
    setSelectDate((prev) => ({ ...prev, year: selectedYear.value }));
  };

  const month = [
    { value: "AllMonth", label: "All month" },
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

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

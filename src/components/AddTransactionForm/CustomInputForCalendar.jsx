import { forwardRef } from "react";
import s from "./CustomInputForCalendar.module.css";
import { RiCalendar2Fill } from "react-icons/ri";

const CustomInputForCalendar = forwardRef(({ value, onClick }, ref) => {
  return (
    <button
      type="button"
      ref={ref}
      value={value}
      onClick={onClick}
      //   readOnly
      className={s.dataInput}
    >
      {value}
      <RiCalendar2Fill className={s.calendar} />
    </button>
  );
});

CustomInputForCalendar.displayName = "CustomInputForCalendar";

export default CustomInputForCalendar;

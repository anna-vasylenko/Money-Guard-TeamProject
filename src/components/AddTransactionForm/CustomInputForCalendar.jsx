import { forwardRef } from "react";
import s from "./CustomInputForCalendar.module.css";
import { Icons } from "../Icons/Icons";

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
      <Icons name={"calendar"} width={18} height={20} />
    </button>
  );
});

CustomInputForCalendar.displayName = "CustomInputForCalendar";

export default CustomInputForCalendar;

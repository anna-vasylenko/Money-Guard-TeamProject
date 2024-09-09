import { forwardRef } from "react";
import s from "./CustomIconForCalendar.module.css";
import { Icons } from "../Icons/Icons";

const CustomIconForCalendar = forwardRef(({ value, onClick }, ref) => {
  return (
    <div className={s.calendarWrapper}>
      <button
        type="button"
        ref={ref}
        value={value}
        onClick={onClick}
        //   readOnly
        className={s.dateIconInput}
      >
        {value}
        <Icons
          className={s.dateIcon}
          name={"calendar"}
          width={18}
          height={20}
        />
      </button>
    </div>
  );
});

CustomIconForCalendar.displayName = "CustomIconForCalendar";

export default CustomIconForCalendar;

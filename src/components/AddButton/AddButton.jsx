import { Icons } from "../Icons/Icons";
import s from "./AddButton.module.css";
const AddButton = ({ onClick }) => {
  return (
    <button className={s.addBtn} onClick={onClick}>
      <Icons className={s.plusIcon} name={"plus"} width={20} height={20} />
    </button>
  );
};

export default AddButton;

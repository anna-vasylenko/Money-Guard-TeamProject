import { ScaleLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderMain}>
      <ScaleLoader color="#ffb627" />
    </div>
  );
};

export default Loader;

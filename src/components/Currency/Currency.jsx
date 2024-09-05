import { useDispatch } from "react-redux";

const Currency = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        <li>
          <h3>Currency</h3>
          <h3>Purchase</h3>
          <h3>Sale</h3>
        </li>
        <li>
          <p>USD</p>
          <p>`${}`</p>
          <p>`${}`</p>
        </li>
        <li>
          <p>EUR</p>
          <p>`${}`</p>
          <p>`${}`</p>
        </li>
      </ul>
      <img src="" alt="" />
    </div>
  );
};

export default Currency;

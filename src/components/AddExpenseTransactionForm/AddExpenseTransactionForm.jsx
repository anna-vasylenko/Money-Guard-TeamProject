import { useSelector } from "react-redux";
import Select from "react-select";
import { selectCategories } from "../../redux/transaction/selectors";
import s from "./AddExpenseTransactionForm.module.css";
// import { useState } from "react";

const AddExpenseTransactionForm = () => {
  // const [isIncome, setIsIncome] = useState(true);

  // const toggleSwitch = () => {
  //   setIsIncome(!isIncome);
  // };

  const initialValues = {
    transactionDate: "",
    type: "",
    categoryId: "",
    comment: "",
    amount: "",
  };

  const data = useSelector(selectCategories);

  const categories = data.map((category) => ({
    value: category.id,
    label: category.name.toString(),
  }));

  const handleCategoryName = (selectCategory) => {
    initialValues.categoryId = selectCategory.value;
    console.log(initialValues.categoryId);
  };

  return (
    <div>
      {/* <div className={s.toggleContainer}>
        <div
          className={s.toggleSwitch`${isIncome ? "income" : "expense"}`}
          onClick={toggleSwitch}
        >
          <div className={s.toggleSlider}>
            <div className={s.toggleSymbol}>
              {isIncome ? <span>+</span> : <span>-</span>}
            </div>
          </div>
          <div className={s.toggleLabels}>
            <span className={isIncome ? "active" : ""}></span>
            <span className={!isIncome ? "active" : ""}></span>
          </div>
        </div>
      </div> */}
      <div>
        <Select
          className={s.select}
          placeholder="Select a category"
          options={categories}
          onChange={handleCategoryName}
          defaultValue={categories[0]}
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
};

export default AddExpenseTransactionForm;

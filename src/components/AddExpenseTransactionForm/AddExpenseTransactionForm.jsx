import { useSelector } from "react-redux";
import Select from "react-select";
import { selectCategories } from "../../redux/transaction/selectors";
import s from "./AddExpenseTransactionForm.module.css";

const AddExpenseTransactionForm = () => {
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
      <Select
        className={s.select}
        placeholder="Select a category"
        options={categories}
        onChange={handleCategoryName}
        defaultValue={categories[0]}
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default AddExpenseTransactionForm;

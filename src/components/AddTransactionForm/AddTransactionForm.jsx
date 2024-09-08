import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { addTransaction } from "../../redux/transaction/operations";
import CustomInputForCalendar from "./CustomInputForCalendar";
import { closeModal } from "../../redux/modal/slice";
import { validationSchema } from "../../helpers/addTransactionSchema";
import s from "./AddTransactionForm.module.css";
import { selectCategories } from "../../redux/transaction/selectors";
// import { Icons } from "../Icons/Icons";
import ToggleModal from "../ToggleModal/ToggleModal";
import { getTransactionCategoryID } from "../../helpers/transactionCategory";

const AddTransactionForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState(false);
  const data = useSelector(selectCategories);
  // const [incomeCategory, setIncomeCategory] = useState(null);
  const [selectCategory, setSelectCategory] = useState(null);

  console.log(selectCategory);

  console.log(getTransactionCategoryID(transactionType, selectCategory));

  const dispatch = useDispatch();

  const initialValues = {
    startDate: new Date(),
    comment: "",
    amount: "",
  };

  const handleSubmit = (values, options) => {
    const newTransaction = {
      comment: values.comment,
      amount: values.amount,
      // amount: transactionType
      //   ? parseFloat(values.amount)
      //   : -parseFloat(values.amount),
      transactionDate: startDate.toISOString(),
      type: transactionType ? "INCOME" : "EXPENSE",
      categoryId: getTransactionCategoryID(transactionType, selectCategory),
    };
    // console.log(newTransaction);
    dispatch(addTransaction(newTransaction));
    options.resetForm();
    handleClickCancel();
  };

  const categories = data.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleCategoryName = (selectedCategory) => {
    setSelectCategory(selectedCategory.value);
    // console.log(selectedCategory.value);
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={s.modalContainer}>
      <h2 className={s.title}>Add transaction</h2>
      <ToggleModal onChange={setTransactionType} defaultActive={false} />
      <div>
        {!transactionType && (
          <div className={s.selectWrapper}>
            <Select
              className={s.select}
              // value={selectCategory}
              placeholder="Select a category"
              options={categories}
              onChange={handleCategoryName}
              classNamePrefix="react-select"
            />
          </div>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.wrapper}>
          <div>
            <Field
              className={s.input}
              name="amount"
              type="number"
              placeholder="0.00"
              required
              // autoComplete="off"
            />
            <ErrorMessage name="amount" component="span" />
            <div>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                calendarStartDay={1}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
                customInput={<CustomInputForCalendar />}
              />
              <Field
                as="textarea"
                name="comment"
                placeholder="Comment"
                className={s.commentInput}
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={s.error}
              />
            </div>
          </div>
          <button className={s.btnAdd} type="submit">
            Add
          </button>
          <button
            className={s.btnCancel}
            type="button"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTransactionForm;

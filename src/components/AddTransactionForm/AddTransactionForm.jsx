import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { addTransaction } from "../../redux/transaction/operations";
import CustomIconForCalendar from "./CustomIconForCalendar";
import { closeModal } from "../../redux/modal/slice";
import { validationSchema } from "../../helpers/addTransactionSchema";
import s from "./AddTransactionForm.module.css";
import { selectCategories } from "../../redux/transaction/selectors";
import ToggleModal from "../ToggleModal/ToggleModal";
import { getTransactionCategoryID } from "../../helpers/transactionCategory";

const AddTransactionForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isIncome, setIsIncome] = useState(false);
  const data = useSelector(selectCategories);
  const [selectCategory, setSelectCategory] = useState(null);

  // console.log(selectCategory);

  // console.log(getTransactionCategoryID(isIncome, selectCategory));

  const dispatch = useDispatch();

  const initialValues = {
    transactionDate: new Date(),
    comment: "",
    amount: "",
    categoryId: "",
    type: "",
  };

  // console.log(isIncome ? "INCOME" : "EXPENSE");

  const handleSubmit = (values, options) => {
    const newTransaction = {
      type: isIncome ? "INCOME" : "EXPENSE",
      transactionDate: startDate.toISOString(),
      comment: values.comment,
      amount: isIncome ? parseFloat(values.amount) : -parseFloat(values.amount),
      categoryId: getTransactionCategoryID(isIncome, selectCategory),
    };
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
  };

  const handleClickCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={s.modalContainer}>
      <h2 className={s.title}>Add transaction</h2>
      <ToggleModal onChange={setIsIncome} defaultActive={false} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className={s.wrapper}>
          {!isIncome && (
            <Select
              className={s.select}
              placeholder="Select a category"
              options={categories}
              onChange={handleCategoryName}
              classNamePrefix="react-select"
            />
          )}
          <div className={s.amountDateInputWrapper}>
            <div>
              <Field
                className={s.amountInput}
                name="amount"
                type="number"
                placeholder="0.00"
                required
                autoComplete="off"
              />
              <ErrorMessage name="amount" component="div" />
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              calendarStartDay={1}
              dateFormat="dd.MM.yyyy"
              maxDate={new Date()}
              customInput={<CustomIconForCalendar />}
            />
          </div>
          <div>
            <Field
              as="textarea"
              name="comment"
              placeholder="Comment"
              className={s.commentInput}
            />
            <ErrorMessage name="comment" component="span" className={s.error} />
          </div>
          <div className={s.buttonsWrapper}>
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
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTransactionForm;

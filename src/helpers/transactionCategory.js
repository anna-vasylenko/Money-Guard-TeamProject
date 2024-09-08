export const getTransactionCategory = (categoryId, categories) => {
  const transactionCategory = categories.find((item) => item.id === categoryId);
  if (!transactionCategory) return;
  return transactionCategory.name;
};

export const getTransactionCategoryID = (type, selectCategory) => {
  let categoryID = "";
  if (type) {
    categoryID = "063f1132-ba5d-42b4-951d-44011ca46262";
  } else {
    categoryID = selectCategory;
  }

  return categoryID;
};

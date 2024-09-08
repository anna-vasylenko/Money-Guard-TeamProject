export const getTransactionCategory = (categoryId, categories) => {
  const transactionCategory = categories.find((item) => item.id === categoryId);

  return transactionCategory.name;
};

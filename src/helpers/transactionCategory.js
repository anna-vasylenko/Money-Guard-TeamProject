export const getTransactionCategory = (categoryId, categories) => {
  const transactionCategory = categories.find((item) => item.id === categoryId);
  if (!transactionCategory) return;
  return transactionCategory.name;
};

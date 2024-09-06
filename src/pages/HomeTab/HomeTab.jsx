import TransactionsList from "../../components/TransactionsList/TransactionsList";

const HomeTab = () => {
  const transactions = [
    {
      date: "04.01.23",
      type: "-",
      category: "Other",
      comment: "Gift for your wife",
      sum: 300.0,
    },
    {
      date: "05.01.23",
      type: "+",
      category: "Income",
      comment: "January bonus",
      sum: 8000.0,
    },
    {
      date: "07.01.23",
      type: "-",
      category: "Car",
      comment: "Oil",
      sum: 1000.0,
    },
    {
      date: "07.01.23",
      type: "-",
      category: "Products",
      comment: "Vegetables for the week",
      sum: 280.0,
    },
    {
      date: "07.01.23",
      type: "+",
      category: "Income",
      comment: "Gift",
      sum: 1000.0,
    },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <TransactionsList transactions={transactions} />
    </div>
  );
};

export default HomeTab;

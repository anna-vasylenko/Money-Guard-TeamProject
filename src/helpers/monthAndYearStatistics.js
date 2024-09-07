const allYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => allYear - i);
export const yearOption = years.map((year) => ({
  value: year,
  label: year.toString(),
}));

export const month = [
  { value: "AllMonth", label: "All month" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];



// import InnerLabelInputDiv from "./InnerLabelInputDiv";
// import Select from "./Select";

// generate select element on create new timetable
const daysOptions = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

// moving between each array item index[0] or [1] to get required data
const daysModel = [
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
];

// function SelectDays({ label, id }) {
//   return (
//     <InnerLabelInputDiv>
//       <label>{label}</label>
//       <Select id={id} options={options} />
//     </InnerLabelInputDiv>
//   );
// }

export { daysOptions, daysModel };

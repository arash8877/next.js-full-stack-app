import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useLanguageStore from "@/stores/language-store";


interface CustomDateInputProps {
  value: string | null; 
  onChange: (date: string | null) => void; 
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  borderColor?: string;
}

//---------------------------------- main function ------------------------------
const CustomDateInput: React.FC<CustomDateInputProps> = ({ value, onChange, onBlur, borderColor }) => {
  const dateValue = value ? new Date(value) : null;
  const { l } = useLanguageStore(); 


  const handleDateChange = (date: Date | null) => {
    if (date) {
      // Convert the date to a UTC string in the format yyyy-MM-dd
      const formattedDateString = date.toLocaleDateString('en-CA');
      onChange(formattedDateString);
    } else {
      onChange(null);
    }
  };

  //---------------------------------- JSX ----------------------------------
  return (
    <DatePicker
      selected={dateValue}
      onChange={handleDateChange}
      onBlur={onBlur}
      dateFormat="MMMM d, yyyy"
      className={`register_input focus:border-zinc-400 ${borderColor ? `${borderColor}` : ''}`}
      placeholderText={l("input.datepicker.placeholder") || "Click to select a date"}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
    />
  );
};

export default CustomDateInput;
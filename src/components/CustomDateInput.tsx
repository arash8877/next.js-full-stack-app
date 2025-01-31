"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useLanguageStore from "@/stores/language-store";
import { da } from "date-fns/locale";

interface CustomDateInputProps {
  value: string | null;
  onChange: (date: string | null) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxDate?: Date;
  minDate?: Date;
  borderColor?: string;
}

//---------------------------------- main function ------------------------------
const CustomDateInput: React.FC<CustomDateInputProps> = ({
  value,
  onChange,
  onBlur,
  maxDate,
  minDate,
  borderColor,
}) => {
  const dateValue = value ? new Date(value) : null;
  const { l } = useLanguageStore();
  const selectedLang = typeof window !== "undefined" ? localStorage.getItem("language") : "en";

  //----- Handle changes when the date is changed -----
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDateString = date.toLocaleDateString("en-CA");
      onChange(formattedDateString);
    } else {
      onChange(null);
    }
  };

  //-- Handle changes when the month is changed --
  const handleMonthChange = (date: Date) => {
    handleDateChange(date); // Update the date when the month changes
  };

  //-- Handle changes when the year is changed --
  const handleYearChange = (date: Date) => {
    handleDateChange(date); // Update the date when the year changes
  };

  const datePickerLocale = selectedLang === "da" ? da : undefined;

  //---------------------------------- JSX ----------------------------------
  return (
    <DatePicker
      selected={dateValue}
      onChange={handleDateChange}
      onMonthChange={handleMonthChange} // Trigger when month changes
      onYearChange={handleYearChange} // Trigger when year changes
      onBlur={onBlur}
      dateFormat="d MMMM, yyyy"
      maxDate={maxDate}
      minDate={minDate}
      className={`register_input focus:border-zinc-400 ${
        borderColor ? `${borderColor}` : ""
      }`}
      placeholderText={
        l("input.datepicker.placeholder") || "Click to select a date"
      }
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      locale={datePickerLocale}
    />
  );
};

export default CustomDateInput;

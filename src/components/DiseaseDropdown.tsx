import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { debounce } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useLanguageStore from "@/stores/language-store";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface DiseaseDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
}

//-------------------------------------- main function -------------------------------------
export default function DiseaseDropdown({
  value,
  onChange,
}: DiseaseDropdownProps) {
  const [allDiseases, setAllDiseases] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { l } = useLanguageStore();

  //--------- get diseases from API ----------
  async function getDiseaseList(searchValue: string) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SHARED_API_URL}/v1/diseases/${searchValue}`
      );
      setAllDiseases(res.data);
    } catch (error) {
      console.log("error in getDiseaseList:", error);
    }
  }

  const debouncedGetDiseaseList = debounce((value: string) => {
    if (value) {
      getDiseaseList(value);
    }
  }, 200);

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setInputValue(value); // Update input field immediately
    debouncedGetDiseaseList(value); // Trigger debounced API call
  };

  //------------------------------------ JSX ------------------------------------------
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={allDiseases}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      onChange={(_, newValue) => onChange(newValue)}
      value={value}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      noOptionsText={
        l("settings.diseases.dropdown.search.text") || "Type to search"
      }
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        );
      }}
      className="w-full"
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={
            l("settings.diseases.dropdown.search.text") || "Type to search"
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#dff2df",
                borderRadius: "8px",
              },
              "&:hover fieldset": {
                borderColor: "#dff2df",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(37 99 235)",
              },
            },
          }}
        />
      )}
    />
  );
}

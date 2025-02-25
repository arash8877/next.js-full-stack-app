import * as React from "react";
import { useState } from "react";
// import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
// import { debounce } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useLanguageStore from "@/stores/language-store";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface SiteDropdownProps {
  value: { name: string; address: string; zipCode: string; country: string }[];
  onChange: (value: { name: string; address: string; zipCode: string; country: string }[]) => void;
}

//-------------------------------------- main function -------------------------------------
export default function SiteDropdown({ value, onChange }: SiteDropdownProps) {
  //   const [allSites, setAllSites] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { l } = useLanguageStore();

  //--------- mySites array ----------
  const mySites = [
    {
      name: "Copenhagen University Hospital",
      address: "Blegdamsvej 9, 4th",
      zipCode: "2100",
      country: "Denmark",
    },
    {
      name: "Aahus Hospital",
      address: "Maine street 1",
      zipCode: "2800",
      country: "Denmark",
    },
    {
      name: "Berlin Hospital",
      address: "Maine street 2",
      zipCode: "10117",
      country: "Germany",
    },
    {
      name: "Paris Hospital",
      address: "Main street 3",
      zipCode: "3050",
      country: "France",
    },
  ];

  //--------- get site from API ----------
  //   async function getSitesList(searchValue: string) {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_SHARED_API_URL}/v1/diseases/${searchValue}`
  //       );
  //       setAllSites(res.data);
  //     } catch (error) {
  //       console.log("error in getSitesList:", error);
  //     }
  //   }

  //   const debouncedGetSitesList = debounce((value: string) => {
  //     if (value) {
  //       mySites(value);
  //     }
  //   }, 200);

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setInputValue(value); // Update input field immediately
    // debouncedGetSitesList(value); // Trigger debounced API call
  };

  //------------------------------------ JSX ------------------------------------------
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={mySites}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      onChange={(_, newValue) => {
        onChange(newValue);
      }}
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
            <div>
              <strong>{option.name}</strong> <br />
              <small>{option.address}</small>
              <small>{option.zipCode}</small>
              <small>{option.country}</small>
            </div>
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

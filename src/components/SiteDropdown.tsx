import * as React from "react";
import { useState } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import { SiteFormValues } from "@/types";
import { debounce } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useLanguageStore from "@/stores/language-store";
import useSelectedSitesStore from "@/stores/selectedSites-store";

//--------- icons for checkbox ----------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//-------------------------------------- main function -------------------------------------
export default function SiteDropdown() {
  const { l } = useLanguageStore();
  const [allSites, setAllSites] = useState<SiteFormValues[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { selectedSites, setSelectedSites } = useSelectedSitesStore();

  //--------- get sites from API ----------
  async function getSiteList(searchValue: string) {
    const token = localStorage.getItem("sp_token");
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/sites/${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllSites(res.data);
      console.log("Response from getSiteList:", res);
    } catch (error) {
      console.log("error in getSitesList:", error);
    }
  }

  const debouncedGetSitesList = debounce((value: string) => {
    if (value) {
      getSiteList(value);
    }
  }, 200);

  //--------- handle change in dropdown ----------
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: SiteFormValues[]
  ) => {
    setSelectedSites(value);
  };

  const handleInputChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setInputValue(value); // Update input field immediately
    debouncedGetSitesList(value); // Trigger debounced API call
  };

  //------------------------------------ JSX ------------------------------------------
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={allSites}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      onChange={handleChange}
      value={selectedSites}
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
              <strong className="text-base">{option.name}</strong> <br />
              <span className="text-sm text-gray-600">{option.address} </span>
              <span className="text-sm text-gray-600">
                {option.zipCode}, {option.country}
              </span>
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

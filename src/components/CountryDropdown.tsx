"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useCountries from "@/hooks/useCountries";

interface CountryDropdownProps {
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
}

//---------------------------------- main function ------------------------------------------
export default function CountryDropdown({
  country,
  setCountry,
  borderColor,
}: CountryDropdownProps) {
  //get all countries from the custom hook
  const { countries } = useCountries();

  if (!countries || countries.length === 0) {
    return null; 
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCountry(event.target.value);
  };

  // ---------------------------------- return ------------------------------------------
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={country}
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
            height: "48px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColor,
            },
          }}
        >
          <MenuItem disabled value="">
            <Typography
              sx={{ fontStyle: "normal", fontWeight: "400", color: "#aaaaaa" }}
            >
              Select one ...
            </Typography>
          </MenuItem>
          {countries
            .slice()
            .sort((a, b) => a.localeCompare(b))
            .map((country, index) => (
              <MenuItem value={country} key={index}>
                {country}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

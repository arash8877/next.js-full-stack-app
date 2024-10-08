"use client"

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useLanguageStore from "@/stores/language-store";

interface GenderDropdownProps {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
}


//---------------------------------- main function ------------------------------------------
export default function GenderDropdown({ gender, setGender, borderColor }: GenderDropdownProps) {
  const { l } = useLanguageStore();
  const handleChange = (event: SelectChangeEvent<string>) => {
    setGender(event.target.value);
  };
//------------ return -------------------
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={gender}
          onChange={handleChange}
          sx={{
            height: "48px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColor,
            },
          }}
        >
          <MenuItem disabled value="">
            <Typography sx={{ fontStyle: "normal", fontWeight: "400", color: "#aaaaaa" }}>
              {l("dropdown.gender.info") || "Select Biological Sex"}
            </Typography>
          </MenuItem>
          <MenuItem value="Male">{l("dropdown.gender.male") || "Male"}</MenuItem>
          <MenuItem value="Female">{l("dropdown.gender.female") || "Female"}</MenuItem>
          <MenuItem value="Intersex">{l("dropdown.gender.intersex") || "Intersex"}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
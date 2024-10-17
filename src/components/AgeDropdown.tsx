"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useLanguageStore from "@/stores/language-store";

interface AgeDropdownProps {
  age: number;
  setAge: React.Dispatch<React.SetStateAction<number>>;
  borderColor: string;
}

const generateAgeOptions = () => {
  const ageOptions = [];
  for (let i = 18; i <= 120; i++) {
    ageOptions.push(i);
  }
  return ageOptions;
};

//---------------------------------- main function ------------------------------------------
export default function AgeDropdown({ age, setAge, borderColor }: AgeDropdownProps) {
  const { l } = useLanguageStore();
  
  const handleChange = (event: SelectChangeEvent<number>) => {
    setAge(Number(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={age || ""}
          onChange={handleChange}
          sx={{
            borderRadius: "8px",
            backgroundColor: "white",
            height: "48px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColor,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColor, // Keep border color same on hover
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: borderColor, // Keep border color same on focus
            },
          }}
        >
          <MenuItem disabled value="">
            <Typography sx={{ fontStyle: "normal", fontWeight: "400", color: "#aaaaaa" }}>
              {l("dropdown.age.info") || "Select age"}
            </Typography>
          </MenuItem>
          {generateAgeOptions().map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import useLanguageStore from "@/stores/language-store";

interface RecruitingDropdownProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
}

//---------------------------------- main function ------------------------------------------
export default function RecruitingDropdown({
  value,
  onChange,
  borderColor,
}: RecruitingDropdownProps) {
  const { l } = useLanguageStore();


  //-------------------- JSX ------------------------
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
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
              {l("dropdown.gender.info") || "Select recruiting Status"}
            </Typography>
          </MenuItem>
          <MenuItem value="true">
            {l("dropdown.gender.male") || "Recruiting"}
          </MenuItem>
          <MenuItem value="false">
            {l("dropdown.gender.female") || "Not Recruiting"}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

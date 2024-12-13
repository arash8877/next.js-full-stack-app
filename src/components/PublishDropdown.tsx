"use client";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import useLanguageStore from "@/stores/language-store";

interface RecruitingDropdownProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
}

//---------------------------------- main function ------------------------------------------
export default function PublishDropdown({
  status,
  setStatus,
  borderColor,
}: RecruitingDropdownProps) {
  const { l } = useLanguageStore();
  const handleChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };
  //------------ return -------------------
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={status}
          onChange={handleChange}
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
              {l("dropdown.gender.info") || "Select one ..."}
            </Typography>
          </MenuItem>
          <MenuItem value="Publish">
            {l("dropdown.gender.male") || "Publish"}
          </MenuItem>
          <MenuItem value="Unpublish">
            {l("dropdown.gender.female") || "Unpublish"}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

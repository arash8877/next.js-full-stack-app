"use client";

import { ReactNode } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

type consentPropsType = {
  title: string;
  children?: ReactNode;
  label: string;
  name: string;
  value: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | boolean;
};

const Consent = ({
  title,
  children,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
}: consentPropsType) => {
  

  return (
    <div className="flex flex-col my-6">
      <h3 className="text-base font-bold mb-1">{title}</h3>
      <small className="text-sm ">{children}</small>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            checked={value}
            onChange={onChange}
            onBlur={() => onBlur}
            inputProps={{ "aria-label": "controlled" }}
            color="default"
          />
        }
        label={<span className="text-sm">{label}</span>}
      />
      {error && <small className="text-red-600">{error}</small>}
    </div>
  );
};

export default Consent;

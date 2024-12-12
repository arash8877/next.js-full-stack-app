import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

interface TooltipButtonProps {
  title: string;
  iconSrc: string;
  alt?: string;
}

const TooltipButton: React.FC<TooltipButtonProps> = ({
  title,
  iconSrc,
  alt = "icon",
}) => {
  return (
    <Tooltip
      title={title}
      componentsProps={{
        tooltip: {
          sx: {
            width: '200px', 
            fontSize: '0.875rem', 
            textAlign: 'center', 
          },
        },
      }}
    >
      <IconButton>
        <Image src={iconSrc} alt={alt} width={12} height={12} />
      </IconButton>
    </Tooltip>
  );
};

export default TooltipButton;

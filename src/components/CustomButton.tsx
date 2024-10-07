"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image";

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyles,
  rightIcon,
  disabled,
  disabledTitle,
  disabledContainerStyles,
}: CustomButtonProps) => {
  // Determine the button's title based on the disabled state
  const buttonTitle = disabled && disabledTitle ? disabledTitle : title;

  // Apply only disabledContainerStyles when disabled, otherwise use containerStyles
  const buttonContainerStyles = disabled
    ? disabledContainerStyles // Use only disabled styles when disabled
    : containerStyles; // Use normal styles when not disabled

  return (
    <button
      type={btnType || "button"}
      className={`custom-btn active:scale-1.025 hover:scale-[1.025] ${buttonContainerStyles} `}
      onClick={handleClick}
      disabled={disabled}
    >
      <span className={`flex-1 ${textStyles}`}>{buttonTitle}</span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="right icon"
            fill
            className="object contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;

import React from "react";

interface TagProps {
  icon?: JSX.Element;
  title: string;
  handleClick?: () => void;
  isSelected?: boolean;
  isDefault?: boolean;
  spanClassName?: string;
  clickable?: boolean
}

const Tag: React.FC<TagProps> = ({
  icon,
  title,
  handleClick,
  isSelected,
  isDefault,
  spanClassName,
  clickable = true
}) => {
  return (
    <div
      onClick={handleClick}
      className={`inline-flex items-center border border-primary-500 px-2 rounded-200 md:mr-4 mb-4 py-2 ${clickable ? "cursor-pointer" : ""} ${
        isSelected
          ? "bg-gradient-button border-primary-800"
          : isDefault
          ? "bg-gradient-button "
          : "bg-white"
      }`}
    >
      {icon &&
        React.cloneElement(icon, {
          style: { width: "1.25rem", height: "1.25rem" },
        })}
      <span
        className={`ml-2 text-sm sm:text-base ${spanClassName}`}
        style={{ fontSize: "0.85rem" }}
      >
        {title}
      </span>
    </div>
  );
};

export default Tag;

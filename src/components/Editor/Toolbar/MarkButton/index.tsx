import React from "react";
import { useSlate } from "slate-react";
import CustomEditor from "@/components/CustomEditor";

type MarkButtonProps = {
  children: React.ReactElement;
  format: "bold" | "italic" | "underline";
};

const MarkButton = (props: MarkButtonProps) => {
  const { children, format } = props;

  const editor = useSlate();
  const isActive = CustomEditor.isMarkActive(editor, format);

  // Define styles for active and inactive states
  const buttonStyle: React.CSSProperties = {
    backgroundColor: isActive ? "#000" : "transparent",
    color: isActive ? "white" : "black",
    border: "1px solid",
    borderColor: isActive ? "#000" : "#ccc",
    padding: "8px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px",
  };

  return (
    <button
      aria-label={format}
      style={buttonStyle}
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleMark(editor, format);
      }}
    >
      {children}
    </button>
  );
};

export default MarkButton;

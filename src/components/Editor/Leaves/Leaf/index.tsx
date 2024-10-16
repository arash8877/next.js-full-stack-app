
import {
  RenderLeafProps,
} from "slate-react";

const Leaf = (props:RenderLeafProps) => {
  console.log("leaf props", props);
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
        textDecoration: props.leaf.underline ? "underline" : "none",
      }}
    >
      {props.children}
    </span>
  );
};

export default Leaf;

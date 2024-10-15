import React from "react";

type HeadingProps = {
  as: "h1" | "h2";
  attributes?: React.HTMLAttributes<HTMLHeadingElement>; 
  element: { align?: "left" | "center" | "right" }; 
  size: "xl" | "lg";
  children: React.ReactNode;
};

const Heading = (props: HeadingProps) => {
  const { as: Tag, attributes, children, element, size } = props;

  // Define a basic size map
  const sizeStyles = {
    xl: { fontSize: "2em" },
    lg: { fontSize: "1.5em" },
  };

  return (
    <Tag
      style={{ ...sizeStyles[size], textAlign: element.align || "left" }}
      {...attributes}
    >
      {children}
    </Tag>
  );
};

export default Heading;

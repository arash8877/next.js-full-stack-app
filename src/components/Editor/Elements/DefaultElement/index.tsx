type DefaultProps = {
  as?: "p";
  attributes?: React.HTMLAttributes<HTMLHeadingElement>;
  element?: { align?: "left" | "center" | "right" };
  size?: "xl" | "lg";
  children?: React.ReactNode;
};
const DefaultElement = (props: DefaultProps) => (
  <p {...props.attributes}>{props.children}</p>
);

export default DefaultElement;

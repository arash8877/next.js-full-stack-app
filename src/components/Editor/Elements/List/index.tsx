type ListProps = {
  as: "h1" | "h2";
  attributes: React.HTMLAttributes<HTMLElement>; // Type attributes properly
  element: {
    type: "ordered-list" | "unordered-list";
    align?: React.CSSProperties["textAlign"];
  }; // Define element types
  children: React.ReactNode;
};

const List = (props: ListProps) => {
  const { attributes, children, element } = props;

  // Use <ol> for ordered lists and <ul> for unordered lists
  const Component = element.type === "ordered-list" ? "ol" : "ul";

  return (
    <Component
      {...attributes}
      style={{
        textAlign: element.align,
        listStyle: "revert",
        paddingLeft: "25px",
      }}
    >
      {children}
    </Component>
  );
};

export default List;

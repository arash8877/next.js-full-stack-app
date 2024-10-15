type ListItemProps = {
  attributes: React.HTMLAttributes<HTMLLIElement>; // Properly type attributes
  children: React.ReactNode;
};

const ListItem = (props: ListItemProps) => {
  const { attributes, children } = props;

  return <li {...attributes}>{children}</li>;
};

export default ListItem;

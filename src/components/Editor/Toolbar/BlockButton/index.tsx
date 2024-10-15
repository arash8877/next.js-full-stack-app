import React from 'react';
import { useSlate } from 'slate-react';
import CustomEditor from '@/components/CustomEditor';

type BlockButtonProps = {
  children: React.ReactElement;
  format: 'heading-one' | 'heading-two' | 'ordered-list' | 'unordered-list';
};

const BlockButton = (props: BlockButtonProps) => {
  const { children, format } = props;

  const editor = useSlate();

  const isActive = CustomEditor.isBlockActive(editor, format);

  // Define styles for active and inactive states
  const buttonStyle: React.CSSProperties = {
    backgroundColor: isActive ? '#000' : 'transparent',
    color: isActive ? 'white' : 'black',
    border: '1px solid',
    borderColor: isActive ? '#000' : '#ccc',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px',
    display: 'flex',  // To handle icon display nicely
    alignItems: 'center', 
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: isActive ? '#000' : '#f0f0f0',
  };

  return (
    <button
      aria-label={format}
      style={buttonStyle}
      type="button"
      onMouseDown={(event) => {
        event.preventDefault();
        CustomEditor.toggleBlock(editor, format);
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = hoverStyle.backgroundColor!;
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = isActive ? '#000' : 'transparent';
      }}
    >
      {children}
    </button>
  );
};

export default BlockButton;

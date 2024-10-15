import React from "react";
import { Slate, ReactEditor } from "slate-react";
import { BaseEditor, Descendant } from "slate";
import EditorInput from "./EditorInput";
import ToolBar from "./Toolbar";

// Custom Types for Slate
type CustomElementType = "code" | "paragraph";
type CustomElement = {
  type: CustomElementType;
  children: CustomText[];
};
type CustomText = {
  text: string;
};

// Declare module for Slate
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

//----------------------------- main function ------------------------------
const Editor = ({
  editor,
  initialValue,
  onChange,
}: {
  editor: BaseEditor & ReactEditor;
  initialValue: Descendant[];
  onChange: (value: string) => void;
}) => {
  return (
    <Slate
      editor={editor}
      initialValue={initialValue || []}
      onChange={(value: Descendant[]) => {
        const isAstChange = editor.operations.some(
          (op) => op.type !== "set_selection"
        );
        if (isAstChange) {
          const content = JSON.stringify(value);
          onChange(content); // Call the formik setFieldValue from the parent
        }
      }}
    >
      <ToolBar />
      <EditorInput />
    </Slate>
  );
};

Editor.Input = EditorInput;
Editor.ToolBar = ToolBar;

export default Editor;

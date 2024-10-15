import { useCallback } from "react";
import { BaseEditor } from "slate";
import {Editable, RenderElementProps, RenderLeafProps, ReactEditor} from "slate-react";
import CustomEditor from "@/components/CustomEditor";
import Heading from "../Elements/Heading";
import DefaultElement from "../Elements/DefaultElement";
import List from "../Elements/List";
import ListItem from "../Elements/ListItem";
import Leaf from "../Leaves/Leaf";

type EditorInputProps = {
  editor?: typeof CustomEditor;
  readOnly?: boolean;
};

type CustomElement = { type: string; align?: "left" | "center" | "right";};
type CustomText = { text: string; };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}




//------------------------------ main function --------------------------
const EditorInput = (props: EditorInputProps) => {
  const { editor, readOnly = false } = props;

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "heading-one":
        return <Heading as="h1" size="xl" {...props} />;
      case "heading-two":
        return <Heading as="h2" size="lg" {...props} />;
      case "list-item":
        return <ListItem {...props} />;
      case "ordered-list":
        return <List {...(props as RenderElementProps & { element: { type: "ordered-list" } })} />;
      case "unordered-list":
        return <List as="ul" {...(props as RenderElementProps & { element: { type: "unordered-list" } })} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);

  return (
    <Editable
      onChange={(value) => {
        console.log("onChange", value);
      }}
      onKeyDown={(event) => {
        if (!event.ctrlKey) {
          return;
        }

        // Replace the `onKeyDown` logic with our new commands.
        switch (event.key) {
          case "b": {
            event.preventDefault();
            CustomEditor.toggleMark(editor, "bold");
            break;
          }
          case "i": {
            event.preventDefault();
            CustomEditor.toggleMark(editor, "italic");
            break;
          }
        }
      }}
      readOnly={readOnly}
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      style={{
        minHeight: readOnly ? undefined : 180,
        border: "1px solid #dff2df", // Add border
        padding: "10px", // Add padding
        borderRadius: "8px", // Add border radius (optional)
      }}
    />
  );
};

export default EditorInput;

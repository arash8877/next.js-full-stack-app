import { Editor, Element as SlateElement, Transforms } from "slate";
type CustomEditorType = {
  isBlockActive: (editor: Editor, format: BlockType, blockType?: string) => boolean;
  isMarkActive: (editor: Editor, type: string) => boolean;
  toggleBlock: (editor: Editor, format: BlockType) => void;
  toggleMark: (editor: Editor, type: string) => void;
};

type BlockType=
  | "paragraph"
  | "heading-one"
  | "heading-two"
  | "list-item"
  | "ordered-list"
  | "unordered-list"
  | "default";


const LIST_TYPES = ["ordered-list", "unordered-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const CustomEditor: CustomEditorType = {
  isBlockActive(editor, format, blockType = "type") {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    );

    return !!match;
  },

  isMarkActive(editor, type: string) {
    const marks = Editor.marks(editor);
    return marks ? marks[type] === true : false;
  },

  toggleBlock(editor, format: BlockType) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    );
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true,
    });
    let newProperties: Partial<SlateElement>;
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : (format as "left" | "center" | "right"),
      };
    } else {
      newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
      };
    }

    Transforms.setNodes<SlateElement>(editor, newProperties);

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  toggleMark(editor, type: string) {
    const isActive = CustomEditor.isMarkActive(editor, type);
    if (isActive) {
      Editor.removeMark(editor, type);
    } else {
      Editor.addMark(editor, type, true);
    }
  },
};

export default CustomEditor;

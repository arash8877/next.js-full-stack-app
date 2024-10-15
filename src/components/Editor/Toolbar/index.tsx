import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
} from "react-icons/fa";

import BlockButton from "./BlockButton";
import MarkButton from "./MarkButton";

const ToolBar = () => (
  <div className="flex py-2 mb-2">
    <MarkButton format="bold">
      <FaBold />
    </MarkButton>
    <MarkButton format="italic">
      <FaItalic />
    </MarkButton>
    <MarkButton format="underline">
      <FaUnderline />
    </MarkButton>

    <BlockButton format="heading-one">
      <span>H1</span>
    </BlockButton>
    <BlockButton format="heading-two">
      <span>H2</span>
    </BlockButton>

    <BlockButton format="ordered-list">
      <FaListOl />
    </BlockButton>
    <BlockButton format="unordered-list">
      <FaListUl />
    </BlockButton>
  </div>
);

export default ToolBar;

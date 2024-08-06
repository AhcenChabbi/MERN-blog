import { Editor } from "@tiptap/react";
import {
  LuBold,
  LuStrikethrough,
  LuItalic,
  LuList,
  LuListOrdered,
  LuHeading2,
  LuUnderline,
  LuQuote,
  LuUndo,
  LuRedo,
  LuCode2,
} from "react-icons/lu";
import { VscHorizontalRule } from "react-icons/vsc";
interface ToolbarProps {
  editor: Editor | null;
}
const activeBtn = "bg-blue-700 text-white";
const inactiveBtn = "text-blue-400 bg-transparent";
const btnStyle = "p-2 transition-colors duration-300  rounded-lg text-lg";
const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="px-4 py-3  flex gap-3 items-start w-full flex-wrap">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={`${
          editor.isActive("bold") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuBold />
      </button>
      {/* Italic */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={`${
          editor.isActive("italic") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuItalic />
      </button>
      {/* Underline */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={`${
          editor.isActive("underline") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuUnderline />
      </button>
      {/* Strike through */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={`${
          editor.isActive("strike") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuStrikethrough />
      </button>
      {/* Heading2 */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={`${
          editor.isActive("heading", { level: 2 }) ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuHeading2 />
      </button>
      {/* bullet list  */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`${
          editor.isActive("bulletList") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuList />
      </button>
      {/* Ordered list */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`${
          editor.isActive("orderedList") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuListOrdered />
      </button>
      {/* Quote */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={`${
          editor.isActive("blockquote") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuQuote />
      </button>
      {/* Code */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={`${
          editor.isActive("codeBlock") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuCode2 />
      </button>
      {/* Undo */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className={`${
          editor.isActive("undo") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuUndo />
      </button>
      {/* Redo */}
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className={`${
          editor.isActive("redo") ? activeBtn : inactiveBtn
        } ${btnStyle}`}
      >
        <LuRedo />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHorizontalRule().run();
        }}
        className={`${btnStyle} text-blue-400 active:text-blue-700`}
      >
        <VscHorizontalRule />
      </button>
    </div>
  );
};

export default Toolbar;

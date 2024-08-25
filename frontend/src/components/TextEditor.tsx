import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { common, createLowlight } from "lowlight";
const extensions = [
  StarterKit.configure({
    codeBlock: false,
    horizontalRule: false,
  }),
  Underline,
  CodeBlockLowlight.configure({
    lowlight: createLowlight(common),
  }),
  HorizontalRule,
];
interface TextEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}
const TextEditor = ({ content, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class:
          "px-4 py-3 dark:text-white min-h-28 text-gray-900 w-full gap-3 text-base outline-none transition-colors duration-300 space-y-3",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="w-full border border-gray-400 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg divide-y divide-gray-400 dark:divide-gray-600">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;

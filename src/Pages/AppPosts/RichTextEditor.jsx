import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const RichTextEditor = ({ description, setPost }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description || "<p>Start writing here...</p>",
    onUpdate: ({ editor }) => {
      setPost((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  return (
    <div>
      <label>Description </label>
      <div className="border rounded p-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RichTextEditor; // ✅ Ensure correct default export

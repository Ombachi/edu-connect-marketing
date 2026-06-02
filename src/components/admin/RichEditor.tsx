import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import {
  Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3,
  Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
} from "lucide-react";
import { useRef } from "react";
import { uploadBlogImage } from "@/lib/blogImages";
import { toast } from "sonner";

const Btn = ({ active, onClick, children, label }: any) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground hover:bg-muted ${
      active ? "bg-muted" : "bg-background"
    }`}
  >
    {children}
  </button>
);

export const RichEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: "rounded-lg my-4" } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-primary underline" } }),
      Placeholder.configure({ placeholder: "Start writing your post…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert max-w-none min-h-[400px] focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const onPickImage = () => fileRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const url = await uploadBlogImage(file);
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 p-2">
        <Btn label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="h-4 w-4" /></Btn>
        <Btn label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="h-4 w-4" /></Btn>
        <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="h-4 w-4" /></Btn>
        <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="h-4 w-4" /></Btn>
        <Btn label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="h-4 w-4" /></Btn>
        <Btn label="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="h-4 w-4" /></Btn>
        <Btn label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="h-4 w-4" /></Btn>
        <Btn label="Code" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code className="h-4 w-4" /></Btn>
        <Btn label="Link" active={editor.isActive("link")} onClick={addLink}><LinkIcon className="h-4 w-4" /></Btn>
        <Btn label="Image" onClick={onPickImage}><ImageIcon className="h-4 w-4" /></Btn>
        <div className="mx-1 h-6 w-px bg-border" />
        <Btn label="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="h-4 w-4" /></Btn>
        <Btn label="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="h-4 w-4" /></Btn>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

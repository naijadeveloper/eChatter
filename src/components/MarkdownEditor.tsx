import { useMemo } from "react";

type editorProps = {
  content: string;
  setContent: (content: string) => void;
};

export default function MarkdownEditor({ content, setContent }: editorProps) {
  const textSize = useMemo(() => {
    if (content.length > 50 && content.length <= 100) {
      return "text-2xl";
    } else if (content.length > 100 && content.length <= 200) {
      return "text-xl";
    } else if (content.length > 200 && content.length <= 300) {
      return "text-lg";
    } else if (content.length > 300) {
      return "text-base";
    } else {
      return "text-3xl";
    }
  }, [content]);

  return (
    <>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write the content for the eChat here!"
        autoFocus
        spellCheck={false}
        className={`dropdown-scroll h-full w-full resize-none rounded ${textSize} border-2 border-transparent bg-gray-300 p-2 font-semibold focus:outline-none dark:bg-gray-800`}
      ></textarea>
    </>
  );
}

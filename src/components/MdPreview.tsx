import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

type previewProps = {
  content: string;
};

export default function MdPreview({ content }: previewProps) {
  return (
    <>
      <div className="dropdown-scroll h-full w-full overflow-y-auto rounded bg-gray-300 dark:bg-gray-800">
        <ReactMarkdown
          children={content}
          className="min-h-full w-full whitespace-pre-line rounded p-2"
        />
      </div>
    </>
  );
}

const StyleComponent = ({
  value,
  language,
}: {
  value: string;
  language: string;
}) => {
  return (
    <SyntaxHighlighter language={language ?? ""} style={docco}>
      {value ?? ""}
    </SyntaxHighlighter>
  );
};

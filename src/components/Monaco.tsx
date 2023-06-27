import dynamic from "next/dynamic";

import LoadingSpinner from "@/components/LoadingSpinner";
const MonacoEditor = dynamic(import("react-monaco-editor"), {
  ssr: false,
  loading: () => <LoadingSpinner position="absolute" />,
});

import { useTheme } from "next-themes";

type editorProps = {
  content: string;
  setContent: (content: string) => void;
};

export default function Monaco({ content, setContent }: editorProps) {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <MonacoEditor
        editorDidMount={() => {
          // @ts-ignore
          window.MonacoEnvironment.getWorkerUrl = (
            _moduleId: string,
            label: string
          ) => {
            if (label === "json") return "_next/static/json.worker.js";
            if (label === "css") return "_next/static/css.worker.js";
            if (label === "html") return "_next/static/html.worker.js";
            if (label === "typescript" || label === "javascript")
              return "_next/static/ts.worker.js";
            return "_next/static/editor.worker.js";
          };
        }}
        language="markdown"
        theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          folding: false,
          fontSize: 16,
          scrollBeyondLastLine: false,
        }}
        value={content}
        onChange={setContent}
      />
    </>
  );
}

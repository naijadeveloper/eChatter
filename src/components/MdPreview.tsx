import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { useMemo } from "react";

type previewProps = {
  content: string;
  image: File | null;
  title: string;
  tags: string[];
};

export default function MdPreview({
  content,
  image,
  title,
  tags,
}: previewProps) {
  const imageUrl = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  }, [image]);
  return (
    <>
      <div className="dropdown-scroll h-full w-full  overflow-y-auto overflow-x-hidden rounded rounded-tr-none border-2 border-transparent bg-gray-300 dark:bg-gray-800">
        <div
          className={`relative mx-auto mt-2 w-[98%] overflow-hidden ${
            image && "h-[320px]"
          }`}
        >
          {image && imageUrl && (
            <Image
              src={imageUrl}
              alt={image.name}
              fill={true}
              className="rounded bg-cover"
            />
          )}
        </div>
        {title && (
          <p className="mx-auto mt-2 flex w-[96%] items-center justify-center text-center text-4xl font-bold capitalize underline underline-offset-2 decoration-gray-500">
            {title}
          </p>
        )}
        <ReactMarkdown
          children={content}
          className="mdstyleAll prose prose-gray min-h-full min-w-full max-w-full rounded p-2 dark:prose-invert md:prose-lg lg:prose-xl prose-headings:break-words prose-p:break-words prose-a:text-blue-600 prose-pre:border-2 prose-pre:border-transparent prose-pre:bg-gray-900 prose-a:dark:text-blue-400"
        />
      </div>
    </>
  );
}

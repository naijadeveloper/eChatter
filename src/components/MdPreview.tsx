import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { useMemo } from "react";

type previewProps = {
  content: string;
  image: File | null;
  title: string;
  tags: string[];
  category: string;
};

export default function MdPreview({
  content,
  image,
  title,
  tags,
  category
}: previewProps) {
  const imageUrl = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
    return "";
  }, [image]);
  return (
    <>
      <div className="dropdown-scroll relative h-full w-full  overflow-y-auto overflow-x-hidden rounded rounded-tr-none border-2 border-transparent bg-gray-300 dark:bg-gray-800">
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
          <p className={`mx-auto ${image? "mt-3" : "mt-12"} flex w-[96%] items-center justify-center text-center text-5xl max-md:text-4xl font-bold capitalize underline decoration-gray-500 underline-offset-2`}>
            {title}
          </p>
        )}

        {tags.length > 0 && (<ul className={`w-full ${title? "mt-3" : "mt-12"} flex items-center justify-center gap-3 p-2 flex-wrap`}>
          {tags.map((tag, index) => (
            <li key={index} className="rounded min-w-[70px] flex items-center justify-center font-semibold bg-gray-400 dark:bg-gray-600 p-2 dark:bg-gray-800">{tag}</li>
          ))}
        </ul>)}

        <ReactMarkdown
          children={content}
          className={`mdstyleAll prose prose-gray ${(image || title || tags.length > 0)? "mt-2" : "mt-10"} min-w-full max-w-full rounded p-2 dark:prose-invert sm:prose-lg prose-headings:break-words prose-headings:mb-2 prose-headings:mt-5 prose-p:break-words prose-p:my-2 prose-a:text-blue-600 prose-pre:border-2 prose-pre:border-transparent prose-pre:bg-gray-900 dark:prose-a:text-blue-400`}
        />

        {category && (<div className={`absolute ${image? "top-4 right-4" : "top-2 right-2"} bg-maingreen-300 dark:bg-maingreen-200 p-2 min-w-[70px] flex items-center justify-center rounded border border-gray-800 text-gray-100 dark:text-gray-800 uppercase font-semibold`}>
          {category}
        </div>)}
      </div>
    </>
  );
}

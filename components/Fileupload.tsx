"use client";

import { UploadDropzone } from "../lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FileIcon, Trash, X } from "lucide-react";
import Image from "next/image";

interface fileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endPoint: "messageFile" | "serverImage";
}

const Fileupload = ({ endPoint, onChange, value }: fileUploadProps) => {
  const fileType = value?.split(".").pop();
  if (value && fileType !== "pdf" && endPoint === "serverImage") {
    return (
      <div className="relative h-20 w-20">
        <Image alt="img-upload" fill src={value} className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType !== "pdf" && endPoint === "messageFile") {
    return (
      <div className="relative h-[200px] w-[200px]">
        <Image
          alt="img-upload"
          fill
          src={value}
          className="h-full w-full  rounded-sm"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-sm absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf" && endPoint === "messageFile") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferre"
          className="ml-2 text-sm text-indigo-400 hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-sm absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-3 w-3 rounded-[50%]" />
        </button>
      </div>
    );
  }
  return (
    <div>
      <UploadDropzone
        endpoint={endPoint}
        onClientUploadComplete={(res) => onChange(res?.[0]?.url)}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default Fileupload;

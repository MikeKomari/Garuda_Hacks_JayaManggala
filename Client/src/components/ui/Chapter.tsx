import React from "react";
type ChapterProps = {
  outerColor?: string;
  innerColor?: string;
  title?: string;
  subtitle?: string;
};

const Chapter = ({
  outerColor = "#439a86",
  innerColor = "#165b4b",
  title = "Chapter 1",
  subtitle = "Java Islands",
}: ChapterProps) => {
  return (
    <div className="relative mt-10 w-full max-w-md">
      <div
        className="relative rounded-2xl flex items-start justify-start px-10 py-6 gap-2 z-10 shadow-md"
        style={{ backgroundColor: outerColor }}
      >
        <div className="flex flex-col items-start justify-start">
          <p className="text-white">{title}</p>
          <p className="font-bold text-xl text-white">{subtitle}</p>
        </div>
      </div>
      <div
        className="absolute top-12 h-14 w-full rounded-2xl z-0"
        style={{ backgroundColor: innerColor }}
      ></div>
    </div>
  );
};

export default Chapter;

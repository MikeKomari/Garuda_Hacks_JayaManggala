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
    <div className="relative mt-10">
      <div
        className={`relative w-full  bg-[${outerColor}] rounded-2xl flex items-start justify-start  drop-shadow-none px-10 py-6 gap-2 z-10 inset-shadow-${innerColor} inset-shadow-xl shadow-${innerColor}  `}
      >
        <div className="flex flex-col items-start justify-start">
          <p className="text-white">{title}</p>
          <p className="font-bold text-xl text-white">{subtitle}</p>
        </div>
      </div>
      <div
        className={`absolute w-full bg-[${innerColor}]  h-15 z-5 top-12  rounded-2xl`}
      ></div>
    </div>
  );
};

export default Chapter;

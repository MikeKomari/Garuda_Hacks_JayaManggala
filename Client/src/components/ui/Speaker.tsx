import React from "react";

type SpeakerProps = {
  iconSrc: string;
  label: string;
  outerColor?: string;
  innerColor?: string;
};

const Speaker = ({
  iconSrc,
  label,
  outerColor = "#FF651D",
  innerColor = "#AE3700",
}: SpeakerProps) => {
  return (
    <div className="relative mt-10 w-full max-w-md cursor-pointer">
      <div
        className="absolute inset-0 translate-y-2 rounded-2xl z-0"
        style={{ backgroundColor: innerColor }}
      ></div>

      <div
        className="relative rounded-2xl flex items-center justify-center gap-2 px-6 py-4 z-10 shadow-md"
        style={{ backgroundColor: outerColor }}
      >
        <img src={iconSrc} alt={label} className="w-6 h-6" />
        <span className="text-white text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

export default Speaker;

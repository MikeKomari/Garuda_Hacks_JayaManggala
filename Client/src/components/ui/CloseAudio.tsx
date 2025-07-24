import React from "react";

type CloseAudioProps = {
  onClick: () => void;
  outerColor?: string; // backdrop
  innerColor?: string; // button
};

const CloseAudio = ({
  onClick,
  outerColor = "#C31616",
  innerColor = "#F45E5E",
}: CloseAudioProps) => {
  return (
    <div
      className="relative w-full max-w-[3rem] cursor-pointer"
      onClick={onClick}
    >
      <div
        className="absolute top-1 left-0 right-0 h-12 rounded-2xl z-0"
        style={{ backgroundColor: outerColor }}
      ></div>

      <div
        className="relative z-10 rounded-2xl flex items-center justify-center px-3 py-3 shadow-md"
        style={{ backgroundColor: innerColor }}
      >
        <span className="text-white text-xl font-bold leading-none">×</span>
      </div>
    </div>
  );
};

export default CloseAudio;

import React from "react";

type NextProps = {
  onClick: () => void;
  outerColor?: string;
  innerColor?: string;
};

const NextButton = ({
  onClick,
  outerColor = "#AE3700",
  innerColor = "#FF651D",
}: NextProps) => {
  return (
    <div
      className="fixed bottom-34 right-6 w-full max-w-[3rem] cursor-pointer"
      onClick={onClick}
    >
      <div
        className="absolute top-1 left-0 right-0 h-14 w-14 rounded-2xl z-0"
        style={{ backgroundColor: outerColor }}
      ></div>
      <div
        className="relative z-10 rounded-2xl flex items-center justify-center px-3 py-3 shadow-md w-14 h-13"
        style={{ backgroundColor: innerColor }}
      >
        <img src="/assets/Next.svg" alt="Next" className="w-4 h-4" />
      </div>
    </div>
  );
};

export default NextButton;

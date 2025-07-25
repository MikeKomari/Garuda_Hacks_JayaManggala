import { useState } from "react";

type MicProps = {
  onClick: (isRecording: boolean) => void;
  outerColor?: string;
  innerColor?: string;
};

const Mic = ({
  onClick,
  outerColor = "#003257",
  innerColor = "#004E89",
}: MicProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    setIsRecording(!isRecording);
    onClick(!isRecording);
  };

  return (
    <div
      className="relative cursor-pointer"
      style={{ width: "145px", height: "145px" }}
      onClick={handleClick}
    >
      <div
        className="absolute top-1 left-0 right-0 h-[137px] rounded-full z-0"
        style={{ backgroundColor: outerColor }}
      ></div>

      <div
        className="relative z-10 rounded-full flex items-center justify-center px-3 py-3 shadow-md w-[145px] h-[135px]"
        style={{
          backgroundColor: isRecording ? "#003257" : innerColor,
          width: "145px",
          height: "145px",
        }}
      >
        <img
          src={isRecording ? "/assets/MicUnmuted.svg" : "/assets/Mic.svg"}
          alt="Mic"
        />
      </div>
    </div>
  );
};

export default Mic;

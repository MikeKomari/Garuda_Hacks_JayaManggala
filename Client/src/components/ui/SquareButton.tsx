import React from "react";

type SquareButtonProps = {
  icon: string;
  onClick?: () => void;
  size?: number;
};

const SquareButton: React.FC<SquareButtonProps> = ({
  icon,
  onClick,
  size = 84,
}) => {
  return (
    <>
      <div className="relative">
        <div
          className="relative bg-grayBgColor rounded-2xl flex items-center justify-center cursor-pointer drop-shadow-none inset-shadow-darkGrayBgColor inset-shadow-xl shadow-darkGrayBgColor  "
          onClick={onClick}
          style={{ width: size, height: size, zIndex: 30 }}
        >
          <img
            src={icon}
            className="w-1/2 h-1/2 z-20"
            style={{ zIndex: 30 }}
            alt=""
          />
        </div>
        <div
          className="absolute  bg-darkGrayBgColor   top-2 rounded-2xl"
          style={{ width: size, height: size, zIndex: -1 }}
        ></div>
      </div>
    </>
  );
};

export default SquareButton;

type CardProps = {
  label: string;
  outerColor?: string;
  innerColor?: string;
};

const Card = ({
  outerColor = "#CCCCCC",
  innerColor = "#FFFFFF",
  label,
}: CardProps) => {
  return (
    <div className="relative w-full max-w-[275px] cursor-pointer ">
      <div
        className="absolute top-1 left-0 right-0 h-12 rounded-2xl z-0"
        style={{ backgroundColor: outerColor }}
      ></div>
      <div
        className="relative z-10 rounded-2xl flex items-center justify-center px-3 py-3 shadow-md min-h-[10rem]"
        style={{ backgroundColor: innerColor }}
      >
        <p className="text-xl font-bold leading-none">{label}</p>
      </div>
    </div>
  );
};

export default Card;

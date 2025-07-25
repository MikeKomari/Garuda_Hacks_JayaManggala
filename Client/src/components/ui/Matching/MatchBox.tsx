type MatchBoxProps = {
  id: string | number;
  label: string;
  isSelected: boolean;
  onToggle: (id: string | number) => void;
  outerColor?: string;
  innerColor?: string;
};

const MatchBox = ({
  id,
  label,
  isSelected,
  onToggle,
  outerColor = "#C1C1C1",
  innerColor = "#F7F0EB",
}: MatchBoxProps) => {
  return (
    <div
      className="relative w-full max-w-[10rem] cursor-pointer transition-all"
      onClick={() => onToggle(id)}
    >
      {!isSelected && (
        <div
          className="absolute top-1 left-0 right-0 h-10 rounded z-0 "
          style={{ backgroundColor: outerColor, opacity: 0.5 }}
        ></div>
      )}
      <div
        className="relative z-10 rounded flex items-center justify-center px-3 py-3 shadow-md"
        style={{
          backgroundColor: isSelected ? "#63B847" : innerColor,
          color: isSelected ? "#FFFFFF" : "#646464",
        }}
      >
        <span className="text-base font-medium leading-none text-center">
          {label}
        </span>
      </div>
    </div>
  );
};

export default MatchBox;

type SpeakerProps = {
  iconSrc: string;
  outerColor?: string;
  innerColor?: string;
};

const SpeakerButton = ({
  iconSrc,
  outerColor = "#004E89",
  innerColor = "#003257",
}: SpeakerProps) => {
  return (
    <div className="relative mt-10 w-full max-w-md cursor-pointer">
      <div
        className="absolute inset-0 translate-y-2 rounded-lg z-0"
        style={{ backgroundColor: innerColor }}
      ></div>

      <div
        className="relative rounded-lg flex items-center justify-center gap-2 px-6 py-4 z-10 shadow-md"
        style={{ backgroundColor: outerColor }}
      >
        <img src={iconSrc} className="w-6 h-6" />
      </div>
    </div>
  );
};

export default SpeakerButton;

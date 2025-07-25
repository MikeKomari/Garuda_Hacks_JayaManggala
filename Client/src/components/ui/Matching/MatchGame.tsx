import { useState } from "react";
import MatchBox from "./MatchBox";

type MatchGameProps = {
  options: { id: string | number; label: string }[];
  onSelect: (selectedIds: (string | number)[]) => void;
  outerColor?: string;
  innerColor?: string;
};

const MatchGame = ({
  options,
  onSelect,
  outerColor = "#C31616",
  innerColor = "#F45E5E",
}: MatchGameProps) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const handleToggle = (id: string | number) => {
    let newSelectedIds: (string | number)[] = [];

    if (selectedIds.includes(id)) {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      newSelectedIds = [...selectedIds, id].slice(-2);
    }

    setSelectedIds(newSelectedIds);
    onSelect(newSelectedIds);
  };

  return (
    <div className="grid grid-cols-2 justify-between gap-4 w-full">
      {options.map((option) => (
        <MatchBox
          key={option.id}
          id={option.id}
          label={option.label}
          isSelected={selectedIds.includes(option.id)}
          onToggle={handleToggle}
          outerColor={outerColor}
          innerColor={innerColor}
        />
      ))}
    </div>
  );
};

export default MatchGame;

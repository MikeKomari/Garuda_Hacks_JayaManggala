import { useState } from "react";
import ListeningBox from "./ListeningBox";

type ListeningGameProps = {
  options: { id: string | number; label: string }[];
  onSelect: (selectedIds: (string | number)[]) => void;
  outerColor?: string;
  innerColor?: string;
};

const ListeningGame = ({
  options,
  onSelect,
  outerColor = "#C31616",
  innerColor = "#F45E5E",
}: ListeningGameProps) => {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  const handleToggle = (id: string | number) => {
    let newSelectedIds: (string | number)[] = [];

    if (selectedIds.includes(id)) {
      newSelectedIds = [];
    } else {
      newSelectedIds = [id];
    }

    setSelectedIds(newSelectedIds);
    onSelect(newSelectedIds);
  };

  return (
    <div className="grid grid-cols-2 justify-between gap-4 w-full">
      {options.map((option) => (
        <ListeningBox
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

export default ListeningGame;

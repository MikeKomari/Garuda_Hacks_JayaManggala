import React, { useState } from "react";
import CloseAudio from "@/components/ui/CloseAudio";
import MatchGame from "@/components/ui/Matching/MatchGame";
import Toast from "@/components/ui/Toast";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const options = [
    { id: "1", label: "Sugeng" },
    { id: "2", label: "Night" },
    { id: "3", label: "Rawuh" },
    { id: "4", label: "Afternoon" },
    { id: "5", label: "Enjang" },
    { id: "6", label: "Morning" },
    { id: "7", label: "Sonten" },
    { id: "8", label: "Good" },
    { id: "9", label: "Dalu" },
    { id: "10", label: "Welcome" },
  ];

  const correctPairs: { [key: string]: string } = {
    "1": "4", // Sugeng = Afternoon
  };
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSelect = (ids: (string | number)[]) => {
    setSelectedIds(ids);
  };

  const handleCheck = () => {
    if (selectedIds.length === 2) {
      const [id1, id2] = selectedIds;
      const isPairCorrect =
        correctPairs[id1] === id2 || correctPairs[id2] === id1;
      setIsCorrect(isPairCorrect);

      if (!isPairCorrect) {
        const correctId = correctPairs[id1] || correctPairs[id2];
        const correctLabel = options.find((opt) => opt.id === correctId)?.label;
        const selectedLabel = options.find((opt) => opt.id === id1)?.label;
        setCorrectAnswer(`${selectedLabel} = ${correctLabel}`);
      }

      setShowToast(true);
    }
  };

  const handleCloseToast = () => {
    // setShowToast(false);
    navigate("/app/journey");
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 px-6 relative">
      <div className="flex justify-between items-center">
        <CloseAudio onClick={() => navigate("/journey")} />
        <div className="px-4 py-3 flex items-center justify-center gap-2 border-mainBgColor border-3 rounded-2xl">
          <img src={"/assets/heart.svg"} alt="Heart" />
          <p className="font-bold text-xl text-grayBgColor">5</p>
        </div>
      </div>
      <div className="relative w-full max-w-2xl mt-4">
        <div className="absolute top-1 left-0 w-full h-10 bg-gray-300 z-0 rounded-sm" />
        <div className="relative z-10 bg-white border border-gray-400 h-10 rounded-sm">
          <div className="h-full px-2 py-2">
            <div className="bg-orange-500 h-full animate-pulse rounded" />
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl pt-4">Select the matching pairs!</h2>
      </div>
      <div className="pt-2 flex justify-between items-center w-full">
        <MatchGame
          options={options}
          onSelect={handleSelect}
          outerColor="#C1C1C1"
          innerColor="#F7F0EB"
        />
      </div>
      <div className="flex justify-center items-center mt-6">
        <div className="relative w-full  cursor-pointer" onClick={handleCheck}>
          <div
            className="absolute top-1 left-0 right-0 h-11 rounded z-0"
            style={{ backgroundColor: "#79797B" }}
          ></div>
          <div
            className="relative z-10 rounded flex items-center justify-center px-3 py-3 shadow-md"
            style={{ backgroundColor: "#CCCCCC" }}
          >
            <span className="text-[#646464] text-xl font-bold leading-none">
              Check
            </span>
          </div>
        </div>
      </div>
      <Toast
        isVisible={showToast}
        isCorrect={isCorrect}
        correctAnswer={correctAnswer}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Question;

import { useState } from "react";
import CloseAudio from "@/components/ui/CloseAudio";
import Toast from "@/components/ui/Toast";
import SpeakerButton from "@/components/ui/SpeakerButton";
import Card from "@/components/ui/ListenRepeat/Card";
import Mic from "@/components/ui/ListenRepeat/Mic";

const originalText = "Matur nuwun sanget sampun mbantu kula.";

const ListenRepeat = () => {
  const [showToast, setShowToast] = useState(false);
  const [isCorrect, setIsCorrect] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleAudioClick = () => {
    setIsPlaying(true);
    const audio = new Audio("/voice/maturNuwun.mp3");
    audio.play().catch((err) => {
      console.error("Audio playback failed:", err);
    });
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleMicClick = (isRecording: boolean) => {
    setIsRecording(isRecording);
    if (isRecording) {
      console.log("Starting recording...");
    } else {
      console.log("Stopping recording...");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 px-6 relative">
      <div className="flex justify-between items-center">
        <CloseAudio onClick={() => {}} />
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
        <h2 className="font-bold text-2xl pt-4">Listen and Repeat!</h2>
      </div>
      <div className="flex justify-baseline items-center w-full pt-4">
        <div onClick={handleAudioClick} className="cursor-pointer mb-6">
          <SpeakerButton iconSrc="/assets/Speaker.svg" />
        </div>
        <div>
          <Card
            outerColor="#C1C1C1"
            innerColor="#F7F0EB"
            label="Matur nuwun sanget sampun mbantu kula."
          />
        </div>
      </div>
      <div className="mt-[6rem] flex justify-center items-center w-full">
        <Mic
          onClick={handleMicClick}
          outerColor="#003257"
          innerColor="#004E89"
        />
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

export default ListenRepeat;

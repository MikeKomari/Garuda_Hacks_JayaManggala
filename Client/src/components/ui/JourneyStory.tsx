import { useState } from "react";
import Chapter from "./Chapter";
import Speaker from "./Speaker";
import CloseAudio from "./CloseAudio";
import NextButton from "./NextButton";

type journeyProps = {
  title: String;
  englishText: String;
};

const JourneyStory = ({ title, englishText }: journeyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAudioClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col items-center px-4">
      {isPlaying && (
        <div className="flex items-center justify-between gap-2 w-full  my-4 ">
          <CloseAudio onClick={() => setIsPlaying(false)} />
          <div className="relative w-full max-w-2xl mt-2 ml-2">
            <div className="absolute top-1 left-0 w-full h-10 bg-gray-300 z-0 rounded-sm" />

            <div className="relative z-10 bg-white border border-gray-400 h-10 rounded-sm">
              <div className="h-full px-2 py-2">
                <div
                  className="bg-orange-500 h-full animate-pulse rounded"
                  //   style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <h2
        className="text-4xl font-bold text-[#222222]"
        style={{ fontFamily: "MuseoModerno" }}
      >
        {title}
      </h2>

      <div onClick={handleAudioClick} className="cursor-pointer mb-6">
        <Speaker iconSrc="/assets/Speaker.svg" label="Speaker" />
      </div>

      <div className="max-w-2xl text-justify leading-relaxed">
        {englishText.split("\n").map((paragraph, idx) => (
          <p key={idx} className="mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default JourneyStory;

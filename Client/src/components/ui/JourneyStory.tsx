import { useState, useEffect } from "react";
import Chapter from "./Chapter";
import Speaker from "./Speaker";
import CloseAudio from "./CloseAudio";
import NextButton from "./NextButton";

type journeyProps = {
  title: string;
  englishText: string; // All paragraphs separated by \n
};

const PAGE_SIZE = 5; // Number of paragraphs per page

const JourneyStory = ({ title, englishText }: journeyProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speakingDots, setSpeakingDots] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  // Split paragraphs into pages
  const paragraphs = englishText
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);
  const totalPages = Math.ceil(paragraphs.length / PAGE_SIZE);

  const getPageParagraphs = (page: number) =>
    paragraphs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  useEffect(() => {
    if (!isPlaying) {
      setSpeakingDots(1);
      return;
    }
    const interval = setInterval(() => {
      setSpeakingDots((prev) => (prev < 3 ? prev + 1 : 1));
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleAudioClick = () => {
    setIsPlaying(!isPlaying);
  };

  const [progressPercent, setProgressPercent] = useState(20);

  return (
    <div className="flex flex-col items-center px-4 min-h-screen">
      <div className="flex items-center justify-between gap-2 w-full  my-4 ">
        <CloseAudio onClick={() => setIsPlaying(false)} />
        <div className="relative w-full max-w-2xl mt-2 ml-2">
          <div className="absolute top-1 left-0 w-full h-10 bg-gray-300 z-0 rounded-sm" />
          <div className="relative z-10 bg-white border border-gray-400 h-10 rounded-sm">
            <div className="h-full px-2 py-2">
              <div
                className="bg-orange-500 h-full animate-pulse"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <h2
        className="text-4xl font-bold text-[#222222]"
        style={{ fontFamily: "MuseoModerno" }}
      >
        {title}
      </h2>

      <div onClick={handleAudioClick} className="cursor-pointer mb-6">
        <Speaker
          iconSrc="/assets/Speaker.svg"
          label={isPlaying ? `Speaking${".".repeat(speakingDots)}` : "Speaker"}
        />
      </div>

      <div className="max-w-2xl text-justify leading-relaxed">
        {getPageParagraphs(currentPage).map((paragraph, idx) => (
          <p key={idx} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {currentPage < totalPages - 1 ? (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => alert("Finished!")}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Finish
          </button>
        )}
      </div>
      <div className="mt-2 text-sm text-gray-500">
        Page {currentPage + 1} of {totalPages}
      </div>
    </div>
  );
};

export default JourneyStory;

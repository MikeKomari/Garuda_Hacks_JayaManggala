import React from "react";
import { useNavigate } from "react-router-dom";

type ToastProps = {
  isVisible: boolean;
  isCorrect: boolean;
  correctAnswer?: string;
  onClose: () => void;
  speaking?: boolean;
};

const Toast = ({
  isVisible,
  isCorrect,
  correctAnswer,
  onClose,
  speaking = false,
}: ToastProps) => {
  const navigate = useNavigate();
  return (
    <div
      className={`z-250 fixed bottom-0 left-0 right-0 ${
        isCorrect ? "bg-[#63B847]" : "bg-[#F45E5E]"
      } text-white p-8 shadow-lg transition-transform duration-300 transform ${
        isVisible ? "translate-y-0" : "translate-y-full"
      } rounded-tl-2xl rounded-tr-2xl z-50 min-h-[30vh] flex flex-col justify-baseline gap-4`}
      aria-live="polite"
    >
      {isCorrect ? (
        <div className="flex justify-baseline gap-4">
          <img src="/assets/check.svg" alt="Cool Icon" className="w-8 h-8" />
          <span className="text-2xl font-bold">Cool Yeah!</span>
        </div>
      ) : (
        <div className="flex justify-baseline gap-4">
          <img src="/assets/X.svg" alt="Cool Icon" className="w-8 h-8" />
          <span className="text-2xl font-bold">Whoopsie!</span>
        </div>
      )}
      <div className="text-center flex justify-baseline flex-col items-start pt-2">
        <p className="text-xl font-semibold">
          {isCorrect ? "Awesome, Nailed it" : "Try Again."}
        </p>
        <p className="text-base mt-2">
          {speaking === false && isCorrect
            ? "You learned so fast."
            : `The correct answer is ${correctAnswer}.`}

          {speaking === true && `${correctAnswer}`}
        </p>
      </div>
      <button
        className="bg-white cursor-pointer text-gray-800 px-4 py-2 rounded font-bold text-base hover:bg-gray-200 transition-colors mt-auto"
        onClick={() => navigate("/app/journey")}
      >
        Continue
      </button>
    </div>
  );
};

export default Toast;

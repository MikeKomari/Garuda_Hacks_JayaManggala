import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const text = [
  {
    id: 1,
    content:
      "Shhh... hear that? The wind is whispering... not just any wind, but one that carries tales from long, long ago...",
  },
  {
    id: 2,
    content:
      "They say every island in our land hides a story — of clever children, powerful beasts, and magical friends. But the stories? They're fading... forgotten like old footprints in the sand.",
  },
  {
    id: 4,
    content:
      "Hello, Penjelajah Cerita! My name is Saka, keeper of forgotten tales and friend of every story ever told.",
  },
  {
    id: 5,
    content:
      "I’ve been waiting for someone brave and curious enough to help me bring them back to life.",
  },
  {
    id: 6,
    content:
      "We’ll fly from island to island, unlock ancient scrolls, and meet heroes you’ve never dreamed of. But I can’t do it alone..",
  },
  {
    id: 7,
    content:
      "Will you come with me? Will you help me bring old stories new magic?.",
  },
  {
    id: 8,
    content:
      "Sometimes, stories bloom when you least expect them... Maybe today’s the day?",
  },
  {
    id: 9,
    content:
      "Still thinking, huh? I get it! These are big stories... full of giants, flying deer, and golden fruit. When you're ready, say the word!",
  },
];

const TYPING_SPEED = 30; // ms per character

const PreApp = () => {
  const [index, setIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(true);
    let i = 0;

    function type() {
      if (i <= text[index].content.length) {
        setDisplayedText(text[index].content.slice(0, i));
        i++;
        typingTimeout.current = setTimeout(type, TYPING_SPEED);
      } else {
        setIsTyping(false);
      }
    }

    type();

    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [index]);

  const handleContinue = () => {
    if (isTyping) {
      // Instantly finish typing
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      setDisplayedText(text[index].content);
      setIsTyping(false);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const MessageBox = (
    <div
      className="px-2 relative flex flex-col items-center"
      style={{
        animation: "popup-bottom-right 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        opacity: 0,
        animationFillMode: "forwards",
      }}
    >
      <img src="/assets/chatBox.svg" alt="" className="w-full" />
      <p className="absolute inset-0 flex items-center justify-center text-lg mx-8 mb-10">
        {displayedText}
        <span className="animate-blink">{isTyping ? "|" : ""}</span>
      </p>
      <style>
        {`
          @keyframes popup-bottom-right {
            0% {
              transform: translate(40px, 40px) scale(0.8);
              opacity: 0;
            }
            80% {
              opacity: 1;
              transform: translate(-4px, -4px) scale(1.04);
            }
            100% {
              opacity: 1;
              transform: translate(0, 0) scale(1);
            }
          }
        `}
      </style>
    </div>
  );

  const ContinueButton = (
    <div
      onClick={handleContinue}
      className="px-15 mb-10 w-full relative bottom-5 cursor-pointer"
    >
      <div className="col-span-1 relative w-full">
        <div className="relative bg-[#A1EF6C] rounded-2xl flex items-start justify-start drop-shadow-none px-2 py-2 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor">
          <div className="flex flex-col items-center justify-start w-full">
            <div className="flex items-center gap-2 py-2">
              <p className="text-white font-bold text-xl">
                {isTyping ? "Skip" : "Continue"}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bg-darkBgColor w-full h-[55px] z-5 top-[10px] rounded-2xl"></div>
      </div>
    </div>
  );

  if (index >= 6 && index < 8) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between w-full ">
        <div className="flex flex-col items-end justify-end mt-20">
          {MessageBox}
          <img src="/assets/preAppMan.png" className="h-90" alt="" />
        </div>
        <div className="flex gap-4 mb-10 w-full justify-center px-4">
          <div
            onClick={() => {
              setIndex(index === 7 ? 6 : index + 1);
            }}
            className="mb-10 w-full relative bottom-5 cursor-pointer"
          >
            <div className="col-span-1 relative w-full">
              <div className="relative bg-redRejection rounded-2xl flex items-start justify-start drop-shadow-none px-2 py-2 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor">
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex items-center gap-2 py-2">
                    <p className="text-white font-bold text-xl">No</p>
                  </div>
                </div>
              </div>
              <div className="absolute bg-darkBgColor w-full h-[55px] z-5 top-[10px] rounded-2xl"></div>
            </div>
          </div>

          {/* yes */}
          <div
            onClick={() => navigate("/login")}
            className="mb-10 w-full relative bottom-5 cursor-pointer"
          >
            <div className="col-span-1 relative w-full">
              <div className="relative bg-greenConfirmation rounded-2xl flex items-start justify-start drop-shadow-none px-2 py-2 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor">
                <div className="flex flex-col items-center justify-start w-full">
                  <div className="flex items-center gap-2 py-2">
                    <p className="text-white font-bold text-xl">Yes</p>
                  </div>
                </div>
              </div>
              <div className="absolute bg-darkBgColor w-full h-[55px] z-5 top-[10px] rounded-2xl"></div>
            </div>
          </div>
          {/* <button
            className="bg-gray-300 text-gray-700 font-bold px-6 py-2 rounded-2xl shadow-md"
            onClick={() => setIndex(index === 7 ? 6 : 6)}
            disabled={isTyping}
          >
            No
          </button>
          <button
            className="bg-[#A1EF6C] text-white font-bold px-6 py-2 rounded-2xl shadow-md"
            onClick={() => {
              navigate("/login");
            }}
            disabled={isTyping}
          >
            Yes
          </button> */}
        </div>
      </div>
    );
  }

  if (index >= 2 && index < 6) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-around w-full ">
          <div className="flex flex-col items-end justify-end mt-20">
            {MessageBox}
            <img src="/assets/preAppMan.png" className="h-90" alt="" />
          </div>
          {ContinueButton}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-between w-full ">
        <div></div>
        {MessageBox}
        {ContinueButton}
      </div>
    </>
  );
};

export default PreApp;

import Chapter from "@/components/ui/Chapter";
import { userStore } from "@/store/userStore";
import React, { useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { set } from "react-hook-form";

const Learning = () => {
  const { user } = userStore();
  const [claimed, setClaimed] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const handleGetStreak = () => {
    if (claimed) return;
    setClaimed(true);
    // Logic to claim the streak reward

    if (user) {
      user.streak = user.streak ? user.streak + 1 : user.streak;
    }

    setConfetti(true);
    setTimeout(() => {
      setConfetti(false);
    }, 3000);
  };

  return (
    <>
      {confetti && (
        <Confetti width={width} height={height} tweenDuration={2000} />
      )}
      <div className="flex flex-col  min-h-screen pt-20 mx-7">
        <div className="flex justify-between items-center">
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "MuseoModerno" }}
          >
            Learning
          </h1>
          <div className="flex items-center gap-2">
            <div className="px-4 py-3 flex items-center justify-center gap-2 border-mainBgColor border-3 rounded-2xl">
              {" "}
              <img src={"/assets/fire.svg"} alt="" />
              <p className="font-bold text-xl text-grayBgColor">
                {user?.streak || 0}
              </p>
            </div>
            <div className="px-4 py-3 flex items-center justify-center gap-2 border-mainBgColor border-3 rounded-2xl">
              {" "}
              <img src={"/assets/heart.svg"} alt="" />
              <p className="font-bold text-xl text-grayBgColor">
                {user?.hearts || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="relative mt-10">
          <div className="relative w-full bg-mainBgColor rounded-2xl flex items-start justify-start  drop-shadow-none px-6 py-6 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor  ">
            <div className="flex items-center justify-start gap-6 w-full">
              <img src="/assets/bigFire.svg" alt="" />

              <div className="flex items-start flex-col gap-3 w-full">
                <p className="text-5xl text-white font-bold">
                  {user?.streak || 0}
                </p>
                <p className="text-2xl text-white font-bold">Days of Streak!</p>
                {/* Streak button */}
                <div
                  onClick={handleGetStreak}
                  className={`${
                    claimed ? "disabled " : "cursor-pointer "
                  } relative `}
                >
                  <div
                    className={`relative w-full  bg-white rounded-lg flex items-start justify-start cursor-pointer drop-shadow-none gap-2 z-10  inset-shadow-xl px-9 py-1`}
                  >
                    <div className="flex flex-col items-start justify-start w-full">
                      <p className="text-darkGrayBgColor">
                        {claimed ? "Got Daily Reward!" : "Get Daily Reward!"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`absolute w-full bg-grayBgColor  h-5 z-5 top-5  rounded-lg`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute w-full bg-darkBgColor  h-20 z-5 top-[110px]  rounded-2xl"></div>
        </div>

        {/* Chapter */}
        <Chapter />
      </div>
    </>
  );
};

export default Learning;

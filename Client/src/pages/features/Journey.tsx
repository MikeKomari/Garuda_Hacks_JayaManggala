import React from "react";
import { useNavigate } from "react-router-dom";

const Journey = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  min-h-screen pt-20 mx-7">
      <div className="flex justify-between items-center">
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "MuseoModerno" }}
        >
          Roadmap
        </h1>
        <div className="flex items-center gap-2">
          {/* Before */}
          {/* Fire */}
          {/* <div className="relative">
            <div className="relative bg-grayBgColor rounded-2xl flex items-center justify-center cursor-pointer drop-shadow-none px-5 py-4 gap-2 z-10 inset-shadow-darkGrayBgColor inset-shadow-xl shadow-darkGrayBgColor  ">
              <img src={"/assets/fire.svg"} alt="" />
              <p className="font-bold text-xl text-white">5</p>
            </div>
            <div className="absolute  bg-darkGrayBgColor w-[78px] h-15 z-5 top-[6px]  rounded-2xl"></div>
          </div> */}

          {/* Heart */}
          {/* <div className="relative">
            <div className="relative bg-grayBgColor rounded-2xl flex items-center justify-center cursor-pointer drop-shadow-none px-5 py-4 gap-2 z-10 inset-shadow-darkGrayBgColor inset-shadow-xl shadow-darkGrayBgColor  ">
              <img src={"/assets/heart.svg"} alt="" />
              <p className="font-bold text-xl text-white">5</p>
            </div>
            <div className="absolute  bg-darkGrayBgColor w-[81px] h-15 z-5 top-[6px]  rounded-2xl"></div>
          </div> */}

          <div className="px-4 py-3 flex items-center justify-center gap-2 border-grayBgColor border-3 rounded-2xl">
            {" "}
            <img src={"/assets/fire.svg"} alt="" />
            <p className="font-bold text-xl text-grayBgColor">5</p>
          </div>
          <div className="px-4 py-3 flex items-center justify-center gap-2 border-grayBgColor border-3 rounded-2xl">
            {" "}
            <img src={"/assets/heart.svg"} alt="" />
            <p className="font-bold text-xl text-grayBgColor">5</p>
          </div>
        </div>
      </div>

      {/* Chapter */}
      <div className="relative mt-10">
        <div className="relative w-full bg-grayBgColor rounded-2xl flex items-start justify-start cursor-pointer drop-shadow-none px-10 py-6 gap-2 z-10 inset-shadow-darkGrayBgColor inset-shadow-xl shadow-darkGrayBgColor  ">
          <div className="flex flex-col items-start justify-start">
            <p className="text-white">Chapter 1</p>
            <p className="font-bold text-xl text-white">Java Islands</p>
          </div>
        </div>
        <div className="absolute w-full bg-darkGrayBgColor  h-15 z-5 top-12  rounded-2xl">
          1
        </div>
      </div>

      {/* Roadmap */}
      <div className="w-96 min-h-screen relative overflow-y-auto">
        <div onClick={() => navigate("/app/story")} className="">
          <div className="w-72 h-0 left-[49.98px] top-[67.11px] absolute origin-top-left rotate-[25.71deg]  outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <div className="w-72 h-0 left-[49.98px] top-[292.06px] absolute origin-top-left rotate-[-21.86deg]  outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <div className="w-72 h-0 left-[49.98px] top-[521.74px] absolute origin-top-left rotate-[-21.86deg]  outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <div className="w-72 h-0 left-[49.98px] top-[297.72px] absolute origin-top-left rotate-[25.71deg]  outline-2 outline-offset-[-1px] outline-zinc-300"></div>
          <img src="/assets/perahu.svg" className="z-10" alt="" />
          <div className="w-24 h-24 left-0 top-[28px] absolute bg-teal-900 rounded-full" />
          <div className="w-24 h-24 left-0 top-[23px] absolute bg-slate-500 rounded-full" />
          <div className="w-12 h-12 left-[24px] top-[47px] absolute overflow-hidden">
            <div className="w-11 h-10 left-[1.50px] top-[0.01px] absolute bg-White" />
          </div>
        </div>
        <div className="w-24 h-24 left-[244px] top-[154px] absolute bg-neutral-600 rounded-full" />
        <div className="w-24 h-24 left-[244px] top-[149px] absolute bg-neutral-400 rounded-full" />
        <div className="w-12 h-12 left-[268px] top-[173px] absolute overflow-hidden">
          <div className="w-7 h-5 left-[10px] top-[3px] absolute bg-neutral-600" />
          <div className="w-8 h-7 left-[7px] top-[17px] absolute bg-neutral-600" />
          <div className="w-10 h-7 left-[4px] top-[11px] absolute bg-neutral-600" />
          <div className="w-1 h-1 left-[18px] top-[12px] absolute bg-neutral-600" />
          <div className="w-1 h-1 left-[26px] top-[12px] absolute bg-neutral-600" />
        </div>
        <div className="w-24 h-24 left-0 top-[271px] absolute bg-neutral-600 rounded-full" />
        <div className="w-24 h-24 left-0 top-[266px] absolute bg-neutral-400 rounded-full" />
        <div className="w-12 h-12 left-[24px] top-[290px] absolute overflow-hidden">
          <div className="w-11 h-11 left-[3.58px] top-[0.56px] absolute bg-neutral-600" />
        </div>
        <div className="w-24 h-24 left-[244px] top-[394px] absolute bg-neutral-600 rounded-full" />
        <div className="w-24 h-24 left-[244px] top-[389px] absolute bg-neutral-400 rounded-full" />
        <div className="w-12 h-12 left-[268px] top-[413px] absolute overflow-hidden">
          <div className="w-10 h-10 left-[3.61px] top-[3.61px] absolute bg-neutral-600" />
        </div>
        <div className="w-24 h-24 left-0 top-[514px] absolute bg-neutral-600 rounded-full" />
        <div className="w-24 h-24 left-0 top-[509px] absolute bg-neutral-400 rounded-full" />
        <div className="w-12 h-12 left-[24px] top-[533px] absolute overflow-hidden">
          <div className="w-10 h-10 left-[3px] top-[3px] absolute bg-neutral-600" />
        </div>
      </div>
    </div>
  );
};

export default Journey;

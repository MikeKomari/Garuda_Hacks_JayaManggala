import React from "react";

const Profile = () => {
  return (
    <div className="flex flex-col  min-h-screen mt-20 mx-7">
      <div className="flex justify-between items-center">
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "MuseoModerno" }}
        >
          Profile
        </h1>
      </div>

      {/* Streak */}
      <div className="relative mt-10">
        <div className="flex items-center gap-4">
          <img src="/PWA/LogoCircle.png" className="w-36 h-36" alt="" />

          <div>
            <p className="text-3xl font-bold">Rendy Ciang</p>
            <p className="text-sm px-2 py-2 w-fit bg-[#A1EF6C] rounded-lg text-center font-bold my-4">
              Javanese Expert
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-10">
          {/* Streak */}
          <div className="col-span-1 w-full relative">
            <div className="relative   bg-mainBgColor rounded-2xl flex items-start justify-start  drop-shadow-none px-1 py-2 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor  ">
              <div className="flex flex-col items-center justify-start  w-full">
                <div className="flex items-center gap-2">
                  <img src="/assets/fire3.svg" alt="" />
                  <p className="text-white font-bold text-xl">5</p>
                </div>
                <p className="text-white text-[10px]">Longest Streak: 10</p>
              </div>
            </div>
            <div className="absolute  bg-darkBgColor w-full h-[55px] z-5 top-[10px]  rounded-2xl">
              1
            </div>
          </div>

          {/* Badge */}
          <div className="col-span-1 w-full relative">
            <div className="relative   bg-mainBgColor rounded-2xl flex items-start justify-start  drop-shadow-none px-2 py-2 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor  ">
              <div className="flex flex-col items-center justify-start  w-full">
                <div className="flex items-center gap-2">
                  <img src="/assets/badge.svg" alt="" />
                  <p className="text-white font-bold text-xl">5</p>
                </div>
                <p className="text-white text-[10px]">Badge Earned: 10</p>
              </div>
            </div>
            <div className="absolute  bg-darkBgColor w-full h-[55px] z-5 top-[10px]  rounded-2xl">
              1
            </div>
          </div>

          {/* Chapter */}
          <div className="col-span-1 relative w-full">
            <div className="relative   bg-mainBgColor rounded-2xl flex items-start justify-start  drop-shadow-none px-2 py-2 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor  ">
              <div className="flex flex-col items-center justify-start  w-full">
                <div className="flex items-center gap-2">
                  <img src="/assets/chapter.svg" alt="" />
                  <p className="text-white font-bold text-xl">5</p>
                </div>
                <p className="text-white text-[10px]">Longest Streak: 10</p>
              </div>
            </div>
            <div className="absolute  bg-darkBgColor w-full h-[55px] z-5 top-[10px]  rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

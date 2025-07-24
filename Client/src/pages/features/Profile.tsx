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
        <div>
          <img src="/PWA/LogoCircle.png" className="w-36 h-36" alt="" />

          <div>
            <p>Rendy Ciang</p>
          </div>
        </div>

        <div className="relative w-full bg-mainBgColor rounded-2xl flex items-start justify-start  drop-shadow-none px-6 py-6 gap-2 z-10 inset-shadow-darkBgColor inset-shadow-xl shadow-darkBgColor  ">
          <div className="flex items-center justify-start gap-6 w-full">
            <img src="/assets/bigFire.svg" alt="" />

            <div className="flex items-start flex-col gap-3 w-full">
              <p className="text-5xl text-white font-bold">0</p>
              <p className="text-2xl text-white font-bold">Days of Streak!</p>
              {/* Streak button */}
              <div className="relative cursor-pointer">
                <div
                  className={`relative w-full  bg-white rounded-lg flex items-start justify-start cursor-pointer drop-shadow-none gap-2 z-10  inset-shadow-xl px-9 py-1`}
                >
                  <div className="flex flex-col items-start justify-start w-full">
                    <p className="text-darkGrayBgColor">Get Daily Reward!</p>
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
    </div>
  );
};

export default Profile;

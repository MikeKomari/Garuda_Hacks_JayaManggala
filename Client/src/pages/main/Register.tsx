import InputButton from "@/components/ui/InputButton";
import React, { useState } from "react";

const Register = () => {
  const [agree, setAgree] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center  overflow-y-auto min-h-[120vh]  bg-gray-100">
      <h1
        className="text-6xl font-bold text-[#FF651D]"
        style={{ fontFamily: "MuseoModerno" }}
      >
        Login
      </h1>
      <form className="p-6 rounded shadow-md w-full max-w-sm">
        <InputButton label="Name" placeholder="Budi Hermanto" type="text" />
        <InputButton
          label="Email"
          placeholder="Enter your email"
          type="email"
        />
        <InputButton label="Username" placeholder="JohnDoe123" type="text" />
        <InputButton label="Age" placeholder="18" type="number" />
        <InputButton
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
        />
        <div className="flex items-center mt-4">
          <input
            id="terms"
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="h-4 w-4 rounded-sm border border-gray-300 bg-white checked:bg-[#AE3700] checked:border-[#AE3700] appearance-none checked:after:content-['✔'] checked:after:text-white checked:after:text-xs checked:after:flex checked:after:items-center checked:after:justify-center checked:after:w-full checked:after:h-full focus:ring-2 focus:ring-[#AE3700]"
          />
          <label
            htmlFor="terms"
            className="ml-2 text-sm text-[#AE3700] font-bold"
          >
            I agree with the{" "}
            <a href="#" className="text-[#AE3700]">
              Terms and Conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          disabled={!agree}
          className={`w-full text-white px-3 py-3 rounded-full transition-colors mt-2 ${
            agree
              ? "bg-[#AE3700] hover:bg-[#932D00]"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Register
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#FF9166] rounded-4xl hover:bg-gray-100"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-[#444] font-medium">
            Continue with Google
          </span>
        </button>

        <div className="flex items-center justify-center mt-4">
          <p className="text-sm text-[#222222]">
            Already have an account ?{" "}
            <a
              href="/login"
              className="text-[#FF651D] font-bold underline decoration-[#FF651D]"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

import InputButton from "@/components/ui/InputButton";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center  overflow-y-auto min-h-[120vh]  bg-gray-100">
      <h1
        className="text-6xl font-bold text-[#FF651D]"
        style={{ fontFamily: "MuseoModerno" }}
      >
        Login
      </h1>
      <form className="p-6 rounded shadow-md w-full max-w-sm">
        <InputButton
          label="Username"
          placeholder="Enter your username"
          type="text"
        />
        <InputButton
          label="Password"
          placeholder="Minimum 8 characters"
          type="password"
        />
        <button
          type="submit"
          className="w-full text-white px-3 py-3 rounded-full transition-colors mt-2 bg-[#AE3700] hover:bg-[#932D00]
          "
        >
          Login
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
            Don't have an account ?{" "}
            <a
              href="/register"
              className="text-[#FF651D] font-bold underline decoration-[#FF651D]"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;

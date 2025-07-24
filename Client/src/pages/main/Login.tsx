import InputButton from "@/components/ui/InputButton";
import { loginSchema } from "@/types/schema";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

export type FormFields = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });
  const handleSubmitForm: SubmitHandler<FormFields> = async (data) => {
    // if (data.pass2 !== data.pass) {
    //   toast.error("Password tidak sama");
    //   return;
    // }
    // let identityEmail = "";
    // let identityPhone = "";
    // registerBuyer({
    //   role: "Buyer",
    //   first_name: data.namaDepan,
    //   last_name: data.namaBlkg,
    //   email: identityEmail,
    //   phone: identityPhone,
    //   password: data.pass,
    //   rememberMe: isRemember,
    // });
    console.log(data);
  };
  return (
    <>
      <h1
        className="text-6xl font-bold text-center mt-20 mb-10 text-[#FF651D]"
        style={{ fontFamily: "MuseoModerno" }}
      >
        Login
      </h1>
      <div className="flex flex-col items-center justify-center  overflow-y-auto bg-white">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="p-6 rounded shadow-md w-full max-w-sm"
        >
          <InputButton
            label="Username"
            placeholder="Enter your username"
            type="text"
            register={register}
            errorMsg={errors.username?.message}
            name="username"
          />
          <InputButton
            label="Password"
            placeholder="Minimum 8 characters"
            type="password"
            register={register}
            errorMsg={errors.password?.message}
            name="password"
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
          <div className="flex w-full items-center justify-center mt-4">
            <p className="text-sm text-[#222222]">
              Don't have an account ?{" "}
              <Link to="/register">
                <span className="text-[#FF651D] font-bold underline decoration-[#FF651D]">
                  Register
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

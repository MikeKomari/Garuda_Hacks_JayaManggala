import type { Path, UseFormRegister } from "react-hook-form";

type InputButtonProps<T> = {
  label: string;
  placeholder: string;
  type: string;
  errorMsg?: string;
  register: UseFormRegister<T>;
  name: Path<T>;
};

const InputButton = <T,>({
  label,
  placeholder,
  type,
  register,
  errorMsg,
  name,
}: InputButtonProps<T>) => {
  return (
    <div className="mb-4 w-full">
      <p className="block text-[#FF651D] mb-2 font-semibold">{label}</p>
      <input
        type={type}
        {...register(name)}
        className="w-full px-3 py-3 border-2 border-[#FF9166] rounded-full outline-none"
        placeholder={placeholder}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
};

export default InputButton;

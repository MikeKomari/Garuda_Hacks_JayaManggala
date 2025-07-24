type inputButtonProps = {
  label: string;
  placeholder: string;
  type: string;
};

const InputButton = ({ label, placeholder, type }: inputButtonProps) => {
  return (
    <div className="mb-4 w-full">
      <p className="block text-[#FF651D] mb-2 font-semibold">{label}</p>
      <input
        type={type}
        className="w-full px-3 py-3 border-2 border-[#FF9166] rounded-full outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputButton;

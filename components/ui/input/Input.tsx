export default function Input({
  type,
  id,
  name,
  placeholder,
  isLabel,
  labelText,
  handleChange,
}: {
  type: string;
  id: string;
  name: string;
  placeholder: string;
  isLabel: boolean;
  labelText: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      {isLabel && (
        <label htmlFor={id} className="block text-xs text-dark-grey mb-2">
          {labelText}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder && placeholder}
        className="w-full px-4 py-2.5 shadow-input rounded-lg placeholder:text-grey"
        onChange={handleChange}
      />
    </div>
  );
}

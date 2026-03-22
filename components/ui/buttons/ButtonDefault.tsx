const ButtonDefault: React.FC<{
  type: "button" | "submit";
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      className="bg-button-default block w-full rounded-md cursor-pointer"
      onClick={onClick}
    >
      <span className="block w-full px-3 leading-10  text-white text-sm">
        {text}
      </span>
    </button>
  );
};

export default ButtonDefault;

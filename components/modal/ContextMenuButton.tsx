interface ContextMenuButtonPops {
  icon: React.ReactNode;
  text: string;
  onClick: (() => void) | undefined;
}

function ContextMenuButton({ icon, text, onClick }: ContextMenuButtonPops) {
  return (
    <button
      type="button"
      className="flex items-center w-full cursor-pointer rounded-md hover:bg-[#f0efed]"
      onClick={onClick}
    >
      <div className="flex justify-start itmes-center px-1.5 py-1 gap-x-1.5">
        <span className="inline-flex justify-center items-cetner w-5 h-5">
          {icon}
        </span>
        <span className="text-sm">{text}</span>
      </div>
    </button>
  );
}

export default ContextMenuButton;

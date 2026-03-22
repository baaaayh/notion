interface ButtonProps {
  button: {
    id: string;
    icon: React.ReactNode;
    text: string;
  };
}

export default function PageHeadButton({ button }: ButtonProps) {
  return (
    <button type="button" className="inline-flex cursor-pointer group/item">
      <div className="inline-flex justify-center items-center px-2 gap-x-1.5 rounded-md text-[#a19e99] group-hover/item:bg-[#f0efed]">
        <span className="inline-flex justify-center items-cetner w-4 h-4">
          {button.icon}
        </span>
        <span className="leading-7 text-sm">{button.text}</span>
      </div>
    </button>
  );
}

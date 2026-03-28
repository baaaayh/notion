interface ButtonProps {
  button: {
    id: string;
    icon: React.ReactNode;
    text: string;
  };
  buttonProps?: React.HTMLAttributes<HTMLElement>;
  innerRef?: (node: HTMLElement | null) => void;
  iconData: string | null;
  coverData: string | null;
  buttonId: string;
}
export default function PageHeadButton({
  button,
  buttonProps,
  innerRef,
  iconData,
  coverData,
  buttonId,
}: ButtonProps) {
  if (
    (buttonId === "emojiIcon" && !!iconData) ||
    (buttonId === "coverIcon" && !!coverData)
  ) {
    return null;
  }

  return (
    <button
      type="button"
      ref={innerRef}
      {...buttonProps}
      className="inline-flex cursor-pointer group/item"
    >
      <div className="inline-flex justify-center items-center px-2 gap-x-1.5 rounded-md text-[#a19e99] group-hover/item:bg-[#f0efed]">
        <span className="inline-flex justify-center items-center w-4 h-4">
          {button.icon}
        </span>
        <span className="leading-7 text-sm">{button.text}</span>
      </div>
    </button>
  );
}

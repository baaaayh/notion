export default function IconButton({
  children,
  onClick,
}: {
  children: React.ReactElement;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <span
      className="inline-flex justify-center items-center w-5 h-5 hover:bg-[#dfdedd] active:bg-[#cdcccb] rounded-md"
      onClick={onClick}
    >
      <span className="inline-flex justify-center items-center w-4 h-4">
        {children}
      </span>
    </span>
  );
}

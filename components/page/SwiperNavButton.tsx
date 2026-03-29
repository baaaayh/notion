interface NavButtonProps {
  direction: "left" | "right";
  className: string;
}

const SwiperNavButton = ({ direction, className }: NavButtonProps) => {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      className={`${className} absolute ${isLeft ? "-left-4" : "-right-4"} top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-[#eee] flex justify-center items-center z-10 cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <span className="inline-flex justify-center items-center w-4 h-4">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d={isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

export default SwiperNavButton;

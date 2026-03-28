import { forwardRef } from "react";

interface IconButtonProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement;
  onClick?: (e: React.MouseEvent) => void;
}

const IconButton = forwardRef<HTMLSpanElement, IconButtonProps>(
  ({ children, onClick, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className="inline-flex justify-center items-center w-5 h-5 hover:bg-[#dfdedd] active:bg-[#cdcccb] rounded-md cursor-pointer"
        onClick={onClick}
        {...props}
      >
        <span className="inline-flex justify-center items-center w-4 h-4">
          {children}
        </span>
      </span>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;

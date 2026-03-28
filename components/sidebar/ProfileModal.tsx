"use client";
import { forwardRef } from "react";
import { signOut } from "next-auth/react";

interface ProfileModalProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string | null | undefined;
}

const ProfileModal = forwardRef<HTMLDivElement, ProfileModalProps>(
  ({ name, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        {...props}
        className="profile-modal flex flex-col w-70 bg-white rounded-md z-1 shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border border-[rgb(44,44,43,0.3)]"
      >
        <div className="profile-modal__user flex w-full justify-start items-center gap-x-2.5 p-2">
          <span>
            <span className="inline-flex justify-center items-center p-1.5 rounded-md bg-[#689f38] text-sm text-white">
              {name}
            </span>
          </span>
          <div>
            <div>{name}의 Notion</div>
            <div className="text-xs text-[#7d7a75]">- 명의 멤버</div>
          </div>
        </div>
        <div className="profile-menu p-2 border-top border-[rgb(44,44,43,0.3)]">
          <button
            type="button"
            className="flex w-full rounded-md hover:bg-[#f1f0ef] cursor-pointer"
            onClick={() => signOut()}
          >
            <span className="flex w-full p-1 text-sm text-[#7d7a75]">
              로그아웃
            </span>
          </button>
        </div>
      </div>
    );
  },
);

ProfileModal.displayName = "ProfileModal";

export default ProfileModal;

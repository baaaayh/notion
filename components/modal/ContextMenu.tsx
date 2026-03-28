import { forwardRef } from "react";
import ContextMenuButton from "@/components/modal/ContextMenuButton";
import LinkCopyIcon from "@/components/icons/sidebar/LinkCopyIcon";
import RenameIcon from "@/components/icons/sidebar/RenameIcon";
import RemovePageIcon from "@/components/icons/sidebar/RemovePageIcon";
import NewTabIcon from "@/components/icons/sidebar/NewTabIcon";

interface ContextMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  pageId: string;
  onRemove: () => void;
  onRename?: () => void;
  onClose: () => void;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ pageId, onRemove, onRename, onClose, style, ...props }, ref) => {
    const menuItems = [
      {
        icon: <LinkCopyIcon />,
        text: "링크 복사",
        onClick: () => {
          navigator.clipboard.writeText(
            `${window.location.origin}/page/${pageId}`,
          );
          onClose();
        },
      },
      {
        icon: <RenameIcon />,
        text: "이름 바꾸기",
        onClick: onRename,
      },
      {
        icon: <RemovePageIcon />,
        text: "휴지통으로 이동",
        onClick: onRemove,
      },
      {
        icon: <NewTabIcon />,
        text: "새 탭에서 열기",
        onClick: () => {
          console.log("새 탭에서 열기");
          window.open(`/page/${pageId}`, "_blank");
          onClose();
        },
      },
    ];

    return (
      <div
        ref={ref}
        style={style}
        {...props}
        className="z-50 min-w-55 bg-white shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border rounded-lg p-1.5 antialiased border-[rgb(44,44,43,0.3)] overflow-hidden "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="context-menu__wrapper">
          <ul>
            {menuItems.map((item) => (
              <li key={item.text}>
                <ContextMenuButton
                  icon={item.icon}
                  text={item.text}
                  onClick={item.onClick}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);

ContextMenu.displayName = "ContextMenu";
export default ContextMenu;

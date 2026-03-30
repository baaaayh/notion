import { forwardRef } from "react";
import TextIcon from "@/components/icons/page/TextIcon";
import H1Icon from "@/components/icons/page/H1Icon";
import H2Icon from "@/components/icons/page/H2Icon";
import H3Icon from "@/components/icons/page/H3Icon";
import H4Icon from "@/components/icons/page/H4Icon";
import ListBulletIcon from "@/components/icons/page/ListBulletIcon";
import ListNumberIcon from "@/components/icons/page/ListNumberIcon";
import CheckListIcon from "@/components/icons/page/CheckListIcon";

interface ElementListProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectElement: (el: string) => void;
  // style과 ...props는 HTMLAttributes에 이미 포함되어 있습니다.
}

const ELEMENT_LIST = [
  { id: "text", icon: <TextIcon />, text: "텍스트" },
  { id: "h1", icon: <H1Icon />, text: "제목1" },
  { id: "h2", icon: <H2Icon />, text: "제목2" },
  { id: "h3", icon: <H3Icon />, text: "제목3" },
  { id: "h4", icon: <H4Icon />, text: "제목4" },
  { id: "listBullet", icon: <ListBulletIcon />, text: "글머리 기호 목록" },
  { id: "listNumber", icon: <ListNumberIcon />, text: "번호 매기기 목록" },
  { id: "checkList", icon: <CheckListIcon />, text: "할 일 목록" },
];

const ElementList = forwardRef<HTMLDivElement, ElementListProps>(
  ({ onSelectElement, style, ...props }, ref) => {
    return (
      <div
        className="element-list w-80 bg-white rounded-md shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
        ref={ref}
        style={style}
        {...props}
      >
        <div className="element-list__body p-2">
          <ul>
            {ELEMENT_LIST.map((el) => (
              <li key={el.id}>
                <button
                  type="button"
                  className="flex w-full px-2 py-1 justify-start items-center rounded-md gap-x-1.5 cursor-pointer hover:bg-[#f0efed]"
                  onClick={() => onSelectElement(el.id)}
                >
                  <span className="inline-flex justify-center items-center w-5 h-5">
                    {el.icon}
                  </span>
                  <span className="text-sm">{el.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="element-list__footer flex justify-between items-center p-2 border-t border-[#2a1c0012]">
          <div>
            <button type="button">
              <span className="text-xs">메뉴 닫기</span>
            </button>
          </div>
          <div>
            <span className="text-xs">esc</span>
          </div>
        </div>
      </div>
    );
  },
);

ElementList.displayName = "ElementList";
export default ElementList;

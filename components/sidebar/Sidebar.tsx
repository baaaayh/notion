import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getSidebarPages } from "@/services/pageService";
import Link from "next/link";
import SidebarProfile from "@/components/sidebar/SidebarProfile";
import SidebarList from "@/components/sidebar/SidebarList";
import SearchButton from "@/components/sidebar/SearchButton";
import HomeIcon from "@/components/icons/sidebar/HomeIcon";

const STATIC_NAV_ITME = [
  // { icon: <SearchIcon />, label: "검색", href: "/search" },
  { icon: <HomeIcon />, label: "홈", href: "/" },
];

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const {
    user: { name, id },
  } = session;

  const initialPages = await getSidebarPages(id);

  return (
    <div className="side-bar h-full border-r border-[#d3d1cb]">
      <div className="side-bar__wrapper flex flex-col h-full bg-[#f9f8f7]">
        <div className="side-bar__head px-2 py-1.5">
          <SidebarProfile name={name} />
        </div>
        <div className="side-bar__body flex flex-col flex-1 min-h-0">
          <div className="menu h-full flex flex-col">
            <div className="menu__top p-2">
              <ul>
                <SearchButton />
                {STATIC_NAV_ITME.map((item) => (
                  <li key={item.label}>
                    <div className="menu-item__warpper">
                      <Link
                        href={item.href}
                        className="flex gap-x-2 p-2 rounded-md hover:bg-[#00000008] active:bg-[#00000015]"
                      >
                        <span className="inline-flex justify-center items-center w-5 h-5">
                          {item.icon}
                        </span>
                        <span className="inline-flex items-center text-sm text-[#5f5259]">
                          {item.label}
                        </span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="menu__bottom p-2 flex-1 min-h-0 overflow-auto">
              <SidebarList userId={id} initialPages={initialPages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

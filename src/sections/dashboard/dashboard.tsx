import type { FC } from 'react';

import { getAdminUrl }   from "@/helper/getAdminUrls";
import { useLocation }   from "react-router-dom";
import { getActivePath } from "@/helper/getActivePath";
import { useAdmin }      from "@/contexts/admin";


const DashboardTabs: {
  name: string
  url: string


}[] = [

  {
    name: "Seo",
    url : 'seo'
  },
  {
    name: "Contacts",
    url : 'contacts'
  },
  // {
  //   name: "Banner",
  //   url : 'banner'
  // },
  {
    name: "About",
    url : 'about'
  },
  // {
  //   name: "Pictures",
  //   url : 'pictures',
  //
  // },
  // {
  //   name: "Exhibition",
  //   url : 'exhibition',
  //
  // },
]


export const Dashboard: FC = () => {
  const {onLogOut} = useAdmin()
  const location = useLocation();
  const activeTab = getActivePath(location.pathname)

  return (
    <div id="dashboard" className="flex flex-col flex-1 py-4 h-full w-full">
      <ul className="w-full h-full felx-1 flex flex-col justify-start gap-4 list-none p-0">
        {
          DashboardTabs.map(dashboardTab => {
            const isActive = dashboardTab.url === activeTab;

            return (
              <li
                key={dashboardTab.url}
                className={`
            flex flex-col gap-4
            rounded-r-2xl
            transition-all duration-500
            shadow-[0_0_5px_#00000077]
            min-h-10 py-2
            ${isActive
                  ? 'w-[calc(100%-10px)] font-bold border-l-[5px] border-[#32b675]'
                  : 'w-[calc(100%-20px)] hover:w-[calc(100%-10px)] hover:font-bold hover:border-l-[5px] hover:border-[#32b675]'
                }
          `}
              >
                <a
                  className={`
              w-full block text-lg leading-6
              transition-all duration-500
              ${isActive
                    ? 'text-xl px-5 tracking-wide text-[#32b675]'
                    : 'px-2.5 hover:text-xl hover:px-5 hover:tracking-wide hover:text-[#32b675]'
                  }
            `}
                  href={getAdminUrl(dashboardTab.url)}
                >
                  {dashboardTab.name}
                </a>
              </li>
            );
          })
        }
      </ul>
      <div className="w-full px-4">
        <div onClick={onLogOut} className="w-full h-[40px]   flex items-center justify-start rounded-xl gap-4 cursor-pointer hover-shadow  transition-all duration-500 px-4  "><i className="fa-regular fa-left-from-bracket"/>Log out</div>

      </div>
    </div>
  );
};


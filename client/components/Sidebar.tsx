"use client";
import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Children, act } from "react";
import { useActiveAccount } from "thirdweb/react";
import CustomTooltip from "./CustomTooltip";

const Sidebar = () => {
  const pathName = usePathname();
  const activeAccount = useActiveAccount();

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-6 bg-gray-900 text-white rounded-md py-4 px-4 shadow-lg">
      
      <ul className="flex flex-col items-center space-y-6 text-4xl">
        
        {navLinks.map((item, index) => {
          if(item.name==='Admin' && !activeAccount ) return null;
          return (
            <li
              key={index}
              className={cn(
                "hover:text-green-500 hover:translate-x-1 hover:-translate-y-1 transition-all",
                { "text-yellow-400": pathName === item.path }
              )}
            >
              <Link href={item.path}>
                <CustomTooltip tooltiptext={item.name}>
                {item.icon}
                </CustomTooltip>
                </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

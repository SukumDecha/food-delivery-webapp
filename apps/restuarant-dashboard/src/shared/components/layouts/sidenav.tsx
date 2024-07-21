"use client";

import React, { useEffect } from "react";
import { sideBarItems } from "../../../app/configs/constants";
import Link from "next/link";
import useRouteChange from "../../../hooks/useRouteChange";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const { activeRoute, setActiveRoute } = useRouteChange();
  const pathName = usePathname();

  useEffect(() => {
    setActiveRoute(pathName);
  }, [pathName, setActiveRoute]);

  return (
    <>
      {sideBarItems.map((item: ISidebarItem) => (
        <Link
          href={item.url}
          key={item.url}
          onClick={() => setActiveRoute(item.url)}
          className={`${item.url === activeRoute && "text-[rgb(_91_111_230)]"} flex items-center text-2xl`}
        >
          <span className="mr-4 text-3xl">{item.icon}</span>
          {item.title}
        </Link>
      ))}
    </>
  );
};

export default SideNav;

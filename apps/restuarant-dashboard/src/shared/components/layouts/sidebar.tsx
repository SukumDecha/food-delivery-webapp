import Image from "next/image";
import SideNav from "./sidenav";
import { Icons } from "../../../utils/Icon";

const Sidebar = () => {
  return (
    <div className="bg-[#111C43] h-screen">
      <div className="p-3 flex flex-col justify-around h-screen">
        <div className="w-[90%] flex flex-col items-center">
          <Image
            src="https://avatars.githubusercontent.com/u/87035691?v=4/"
            alt="profile-pic"
            width={120}
            height={120}
            className="rounded-full border-3 border-[rgb(91_111_230)]"
          />
          <h5 className="pt-3 text-2xl">Pizza Hut</h5>
        </div>
        <SideNav />
        <div className="flex items-center pl-3 cursor-pointer">
          <span className="text-3xl">{Icons.logOut}</span>
          <span className="block text-2xl px-2">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

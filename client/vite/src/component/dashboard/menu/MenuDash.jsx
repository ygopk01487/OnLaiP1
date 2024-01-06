import React from "react";
import { MdLibraryBooks } from "react-icons/md";
import { IoOptionsSharp } from "react-icons/io5";
import { RiBillFill } from "react-icons/ri";

const MenuDash = () => {
  return (
    <div className="bg-blue-900 w-[15%] h-[100%] fixed shadow-md rounded-[3px]">
      <span className="flex  justify-center p-[32px]">
        <img
          src="https://themesbrand.com/velzon/html/master/assets/images/logo-light.png"
          className="w-[100px]"
        />
      </span>
      <div className="w-[100%] ">
        <ul className="text-[16px] font-[400] flex flex-col pl-[20px] text-white">
          <li className="icon-text-menuDash w-[42%] mb-[10px]">
            <span className="pr-[10px]">
              <MdLibraryBooks size="14px" />
            </span>
            <h3>Sách</h3>
          </li>
          <li className="icon-text-menuDash w-[70%] mb-[10px]">
            <span className="pr-[10px]">
              <IoOptionsSharp size="14px" />
            </span>
            <h3>Thể loại sách</h3>
          </li>
          <li className="icon-text-menuDash w-[55%]">
            <span className="pr-[10px]">
              <RiBillFill size="14px" />
            </span>
            <h3>Hóa đơn</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDash;

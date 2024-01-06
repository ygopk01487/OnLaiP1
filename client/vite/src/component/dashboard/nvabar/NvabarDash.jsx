import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

const NvabarDash = ({ openSun, setOpenSun }) => {
  const [openMenuUD, setOpenMenuUD] = useState(false);
  // const [openSun, setOpenSun] = useState(false);

  return (
    <div
      className="fixed top-[0%] w-[85%] bg-white border-b-[2px] border-gray-200 h-[9%]
    right-[0%] shadow-md"
    >
      <div className="flex items-center justify-end">
        <span
          className="nvabar-icon mr-[5px]"
          onClick={() => setOpenSun((i) => !i)}
        >
          {openSun ? <FaSun size="18px" /> : <FaMoon size="18px" />}
        </span>
        <span className="nvabar-icon">
          <IoIosNotifications size="23px" />
        </span>
        <div
          className="flex items-center cursor-pointer p-[10px] bg-gray-100 ml-[20px] mr-[30px]
        relative"
          onClick={() => setOpenMenuUD((i) => !i)}
        >
          <span>
            <img
              src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
              className="w-[30px] rounded-[50%]"
            />
          </span>
          <div>
            <h3 className="text-[14px] font-[500] pl-[10px]">Anna Adame</h3>
            <span className="text-[13px] font-[400] pl-[10px]">Founer</span>
          </div>
        </div>
        {/* menu user mini dash */}
        <div
          className={`bg-white rounded-[3px] shadow-md  absolute
        h-[100%] p-[10px] pb-[10px] right-[2.7%] w-[10%] ${
          openMenuUD
            ? "bottom-[-100%] opacity-100 visible"
            : "bottom-[-105%] opacity-0 invisible"
        } duration-[0.5s]`}
        >
          <h3 className="text-gray-500 font-[500] text-[11px] pb-[10px] text-center">
            Xin chào Anna!
          </h3>
          <div
            className="flex text-[14px] items-center cursor-pointer font-[400] pl-[5px] duration-[0.5s]
          hover:text-gray-600"
          >
            <span className="pr-[5px]">
              <IoLogOutOutline size="14px" />
            </span>
            <button>Đăng xuất</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NvabarDash;

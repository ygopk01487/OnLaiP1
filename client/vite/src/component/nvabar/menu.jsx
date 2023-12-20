import React, { useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";

const Menu = () => {
  const [openMenuU, setOpenMenuU] = useState(false);
  const [openCartMini, setOpenCartMini] = useState(false);

  const openMenuUser = () => {
    setOpenMenuU((i) => !i);
  };

  const openCMini = () => {
    setOpenCartMini((i) => !i);
  };

  return (
    <div className="w-[100%] p-1 h-[100px] flex">
      {/* logo */}
      <div className="cursor-pointer flex  items-center">
        <span>
          <img src="https://htmldemo.net/pustok/pustok/image/logo.png" />
        </span>
      </div>
      {/* tim kiem */}
      <div className="flex items-center w-[700px]  pl-[180px]">
        <form className="w-[100%]">
          <input
            className="p-3 rounded-[4px] outline-none w-[50%] border-t-[2px] border-b-[2px] 
            border-l-[2px] border-gray-300"
            placeholder="Tìm kiếm sách ở đây"
          />
          <button
            className=" border-green-600 border-t-[2px] border-b-[2px] border-r-[2px]
           bg-green-600 text-white p-3 rounded-[4px] text-[16px]
           hover:bg-green-700 duration-[0.5s] hover:border-green-700"
          >
            Tìm kiếm
          </button>
        </form>
      </div>
      {/* giao dien tai khoan */}
      <div
        className="flex  items-center pl-[10px] w-[190px]  cursor-pointer relavite
      duration-[0.6s]"
        onClick={openMenuUser}
      >
        <span>
          <img
            className="w-[45px] rounded-[50%]"
            src="https://media.istockphoto.com/id/1298261537/vi/vec-to/ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-h%E1%BB%93-s%C6%A1-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-tr%E1%BB%91ng.jpg?s=612x612&w=0&k=20&c=Rbi2tNjNA4z86gzSPBhGOefKI-XTKqlqGy-kiPoUvRA="
          />
        </span>
        <div className=" flex flex-col items-center ml-[5px]">
          <span className="text-[16px] font-bold">Xin chào</span>
          <p className="text-[12px] text-medium">Yasuo pro</p>
        </div>
        {/* giao dien menu nguoi dung */}
        <div
          className={`bg-white border-gray-200 border-[1px] absolute p-2
          before:content-[''] before:w-[20px] before:h-[20px]
        before:bg-white before:absolute before:top-[-4%] before:rotate-45
        ${
          openMenuU
            ? `visible opacity-1000 top-[13%]`
            : "invisible opacity-0 top-[15%]"
        }
        before:left-[10%] shadow-md   duration-[0.6s] 
       `}
        >
          <ul className="p-3">
            <a href="#">
              <li className="flex hover:opacity-[0.4] duration-[0.5s]">
                <span className="p-[2px] pr-[6px]">
                  <FaUser size="14px" />
                </span>
                <span
                  className="text-[13px] font-bold border-gray-200 border-b-[2px] pb-[10px]
                "
                >
                  Thông tin tài khoản
                </span>
              </li>
            </a>
            <a href="#">
              <li className="mt-[20px] flex hover:opacity-[0.4] duration-[0.5s]">
                <span className="p-[2px] pr-[6px]">
                  <FaHeart size="14px" />
                </span>
                <span
                  className="text-[13px] font-bold border-gray-200 border-b-[2px] pb-[10px]
                "
                >
                  Danh sách yêu thích
                </span>
              </li>
            </a>
          </ul>
          <button
            className="bg-green-600 p-[12px] text-white font-medium text-[13px] rounded-[3px]
          mt-[10px]  duration-[0.5s] hover:text-black w-[120px] flex items-center justify-center"
          >
            <span>Đăng xuất</span>
            <span className="pl-[4px]">
              <IoLogOutOutline size="14px" />
            </span>
          </button>
        </div>
      </div>
      {/* gio hang */}
      <div
        className=" flex items-center cursor-pointer w-[260px]  ml-[30px] relavite "
        onClick={openCMini}
      >
        <span>
          <BsCartCheck size="50px" className="text-green-600 p-1" />
        </span>
        <div className="p-2">
          <h4 className="text-black text-[22px]">Giỏ hàng</h4>
          <p className="flex text-green-600 font-bold text-[16px] items-center">
            10.000 đ
            <span className="text-black pl-[10px]">
              <FaChevronDown size="12px" />
            </span>
          </p>
        </div>
        <span
          className="w-[30px] h-[30px] flex items-center justify-center
        rounded-[100%] bg-red-600 text-white text-[12px] font-medium"
        >
          1
        </span>
        {/* gio hang mini */}
        <div
          className={`${
            openCartMini
              ? " bg-white visible opacity-100 top-[14%]"
              : "invisible opacity-0 top-[17%]"
          } absolute right-[10%] shadow-md duration-[0.5s]
          after:content-[''] after:h-[20px] after:w-[20px] after:bg-white
          after:absolute after:top-[-4%] after:right-[20%] after:rotate-45`}
        >
          {/* thong tin sach dat */}
          <div className="flex p-6 pb-[10px] border-b-[2px]  border-gray-200">
            <span>
              <a href="#">
                <span>
                  <img
                    src="https://htmldemo.net/pustok/pustok/image/products/cart-product-1.jpg"
                    className="w-[80px]"
                  />
                </span>
              </a>
            </span>
            {/* ten */}
            <div className="flex flex-col">
              <a href="#">
                <p className="text-[14px] font-medium hover:text-green-600 duration-[0.5s] pl-[3%]">
                  Kodak PIXPRO Astro Zoom AZ421 16 MP
                </p>
              </a>
              {/* gia so luong */}
              <div className="pl-[3%] pt-[2%]">
                <span>
                  1 x
                  <span className="text-[20px] text-green-600 font-bold pl-[5px]">
                    10.000 đ
                  </span>
                </span>
              </div>
            </div>
            {/* xoa */}
            <span
              className="w-[20px] h-[20px] bg-gray-400 text-white flex items-center justify-center 
            rounded-[3px] hover:opacity-[0.4] duration-[0.5s] hover:text-black
            mt-[16%]"
            >
              <IoClose size="14px" />
            </span>
          </div>
          {/* xem gio va dat hang */}
          <div className="flex justify-center p-4">
            <span
              className="flex items-center justify-center font-bold pr-[10%]
            hover:text-green-600 duration-[0.5s]"
            >
              Xem giỏ hàng
              <span>
                <MdNavigateNext size="24px" />
              </span>
            </span>
            <span
              className="p-3 w-[140px] flex items-center justify-center
              bg-green-600 text-white text-[16px] font-medium rounded-[5px]
            hover:bg-black duration-[0.5s]"
            >
              Đặt mua
              <span>
                <MdNavigateNext size="24px" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

import React from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";

const AccountDetail = () => {
  return (
    <div className="w-[100%]">
      <div className="w-[1200px] m-auto">
        {/* header */}
        <Menu />
        {/* section */}
        <div className="w-[100%] mt-[30px]">
          {/* tieu de */}
          <div className="flex items-center text-[16px] font-[450]">
            <h3 className="mr-[4px] duration-[0.5s] hover:text-green-600 cursor-pointer">
              Trang chủ
            </h3>
            <span className="pr-[4px]">
              <MdOutlineNavigateNext size="14px" />
            </span>
            <span>Tải khoản của tôi</span>
          </div>
          {/* than */}
          <div className="w-[100%] mt-[30px] flex justify-between">
            {/* menu */}
            <div className="w-[20%]">
              <ul>
                <li
                  className="menu-my-account active
                "
                >
                  <span className="pr-[8px]">
                    <FaUser size="14px" />
                  </span>
                  <span className="">Thông tin tài khoản</span>
                </li>
                <li className="menu-my-account">
                  <span className="pr-[8px]">
                    <RiBillFill size="14px" />
                  </span>
                  <span>Hóa đơn</span>
                </li>
                <li className="menu-my-account">
                  <span className="pr-[8px]">
                    <MdLogout size="14px" />
                  </span>
                  <span>Đăng xuất</span>
                </li>
              </ul>
            </div>
            {/* giao dien */}
            <div className="w-[70%] pb-[3%] border-[2px] border-gray-200 rounded-[3px]">
              <div className="p-[20px]">
                <h1
                  className="border-b-[2px] border-gray-200 p-[10px]
                text-[18px] font-[400]"
                >
                  Thông tin tải khoản
                </h1>
              </div>
              <div className="w-[100%] pl-[20px] pt-[5px]">
                <form className="w-[100%] flex justify-between">
                  <div className="flex flex-col w-[100%]">
                    <div className="flex justify-between">
                      <input
                        className="input-my-account
                    "
                        type="text"
                        placeholder="Họ"
                      />
                      <input
                        className="input-my-account"
                        type="text"
                        placeholder="Tên"
                      />
                    </div>
                    <input
                      className="input-my-account"
                      type="text"
                      placeholder="Email"
                    />
                    <h3
                      className=" p-[10px]
                text-[18px] font-[400] mb-[10px]"
                    >
                      Mật khẩu
                    </h3>
                    <input
                      className="input-my-account"
                      type="password"
                      placeholder="Mật khẩu"
                    />
                    <button
                      className="p-[10px] w-[24%] bg-green-600 text-white duration-[0.5s]
                    uppercase rounded-[3px] mt-[10px] text-[13px] font-[500] hover:bg-black"
                    >
                      Lưu
                    </button>
                  </div>
                  <div className="w-[100%] ml-[200px]">
                    <span>
                      <img
                        className="w-[100px]"
                        src="https://media.istockphoto.com/id/1298261537/vi/vec-to/ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-cho-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-h%E1%BB%93-s%C6%A1-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-tr%E1%BB%91ng.jpg?s=612x612&w=0&k=20&c=Rbi2tNjNA4z86gzSPBhGOefKI-XTKqlqGy-kiPoUvRA="
                      />
                    </span>
                    <input
                      type="file"
                      className="file:rounded-[20px] file:border-[0px] file:p-[9px] file:bg-green-600
                      file:text-white file:w-[40%] file:cursor-pointer file:text-[14px] file:font-[500] file:mt-[20px]
                      file:duration-[0.5s] hover:file:bg-black"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AccountDetail;

import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";

const HomeSection = () => {
  const [openShow, setOpenShow] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const number = [1, 2, 3];

  const openS = () => setOpenShow((i) => !i);
  const openSor = () => setOpenSort((i) => !i);
  return (
    <div className="w-[100%] mt-[20px]">
      {/* tieu de */}
      <div className="flex text-[14px]">
        <span className="flex items-center p-1 cursor-pointer duration-[0.5s] hover:text-green-600">
          Trang chủ <MdNavigateNext size="13px" className="ml-[5px]" />
        </span>
        <span className="p-1">Danh sách sản phẩm</span>
      </div>
      {/* than giao dien */}
      <div className="w-[100%] mt-[20px]">
        {/* thanh cong cu */}
        <div
          className="w-[100%] bg-white border-gray-200 border-[2px] rounded-[2px] p-3
          flex
        "
        >
          {/* hien thi danh sach bao nhieu */}
          <div className="flex items-center ml-[70%] mr-[5%] relative">
            <span className="text-[14px] pr-[10px]">Hiển thị:</span>
            <span
              className="flex items-center cursor-pointer text-[15px] font-[450]"
              onClick={openS}
            >
              3{" "}
              <MdNavigateNext
                size="14px"
                className={`${openShow ? "rotate-[-90deg]" : "rotate-90"} 
              duration-[0.5s] ml-[10px]`}
              />
            </span>
            {/* danh sach hien mini */}
            <div
              className={`absolute bg-white shadow-md z-[10]
              ${
                openShow
                  ? "top-[110%] visible opacity-100"
                  : "top-[100%] invisivle opacity-0"
              } p-2 w-[50px] 
              rounded-[3px] top-[160%] right-[5%]
              duration-[0.5s] `}
            >
              <ul className="p-1 flex flex-col items-center ">
                <li
                  className="cursor-pointer w-[100%] text-[14px] h-[30px]
                flex items-center justify-center rounded-[2px] hover:bg-gray-200 duration-[0.5s]"
                >
                  3
                </li>
                <li
                  className="cursor-pointer w-[100%] text-[14px] h-[30px]
                flex items-center justify-center rounded-[2px] hover:bg-gray-200 duration-[0.5s]"
                >
                  4
                </li>
                <li
                  className="cursor-pointer w-[100%] text-[14px] h-[30px]
                flex items-center justify-center rounded-[2px] hover:bg-gray-200 duration-[0.5s]"
                >
                  5
                </li>
              </ul>
            </div>
          </div>
          {/* sap xep theo.... */}
          <div className="flex items-center relavite">
            <span className="text-[14px] pr-[10px]">Sắp xếp:</span>
            <span
              className="flex items-center cursor-pointer text-[15px] font-[450]"
              onClick={openSor}
            >
              Mặc định
              <MdNavigateNext
                size="14px"
                className={`${openSort ? "rotate-[-90deg]" : "rotate-90"}
              duration-[0.5s]  ml-[10px]`}
              />
            </span>
            {/* sap xep mini */}
            <div
              className={`absolute bg-white border-[2px] z-[10] rounded-[2px] border-gray-200
            p-2 shadow-md ${
              openSort
                ? "visible opacity-100 top-[77%]"
                : "invisible opacity-0 top-[74%]"
            } duration-[0.5s]`}
            >
              <ul className="flex flex-col items-center">
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  Mặc định
                </li>
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  Tên (A-Z)
                </li>
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  Tên (Z-A)
                </li>
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  Giá giảm dần
                </li>
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  Giá tăng dần
                </li>
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  Nhiều đánh giá nhất
                </li>
                <li className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]">
                  ít đánh giá nhất
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* danh sach san pham */}
        <div className="w-[100%] grid grid-cols-3 gap-[10px] p-2 mt-[20px] z-[2]">
          {/* san pham 1 */}
          {number.map((i, ix) => {
            return (
              <>
                <div
                  key={ix}
                  className="w-[70%] shadow-md rounded-[3px] bg-white border-r-[2px] border-gray-200 p-3
          cursor-pointer relative group"
                >
                  <span
                    className="flex justify-center text-[13px] font-[600] cursor-default
            pb-[6px]"
                  >
                    Động vật
                  </span>
                  <h2 className="text-center font-[700] pb-[6px]">
                    Here Is A Quick Cure For Book
                  </h2>
                  <span>
                    <img
                      src="https://htmldemo.net/pustok/pustok/image/products/product-2.jpg"
                      className="w-[100%]"
                    />
                  </span>
                  <div className="flex justify-center items-center">
                    <span className="text-[17px] text-green-600 font-[500] pr-[6px]">
                      15.000 đ
                    </span>
                    <span className="text-gray-400 text-[14px] pr-[6px]">
                      10.000 đ
                    </span>
                    <span
                      className="p-1 bg-red-600 text-white text-[15px] font-[650]
              rounded-[4px]"
                    >
                      20%
                    </span>
                  </div>
                  {/* menu mini san pham*/}
                  <div
                    className="absolute  bg-white shadow-md w-[30%] p-1 top-[53%] left-[35%]
            rounded-[3px] group-hover:opacity-100 duration-[0.5s] group-hover:top-[50%] 
            opacity-0 invisible group-hover:visible"
                  >
                    <ul className="grid grid-cols-2 p-1 w-[100%] items-center">
                      <li className="border-r-[2px] border-gray-200 p-2">
                        <span className="cursor-pointer hover:text-green-600 duration-[0.5s]">
                          <FaCartPlus size="14px" />
                        </span>
                      </li>
                      <li className="flex justify-center">
                        <span className="cursor-pointer hover:text-green-600 duration-[0.5s]">
                          <FaHeartCirclePlus size="14px" />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* phan trang */}
        <div
          className="bg-white border-[2px] border-gray-200 rounded-[2px] w-[100%]  
        mt-[20px] flex items-center justify-center relative"
        >
          <span className="buton-pagin">
            <MdSkipNext size="20px" className="rotate-[180deg]" />
          </span>
          <span className="buton-pagin">
            <MdNavigateNext size="20px" className="rotate-[180deg]" />
          </span>
          {number.map((i, idx) => {
            return (
              <span
                key={idx}
                className={`text-[18px] buton-pagin font-[500]
                ${i === 1 ? "button-active " : ""}`}
              >
                {i}
              </span>
            );
          })}
          <span className="buton-pagin">
            <MdNavigateNext size="20px" />
          </span>
          <span className="buton-pagin">
            <MdSkipNext size="20px" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;

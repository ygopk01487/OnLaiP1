import React from "react";
import { FaCaretDown } from "react-icons/fa";
import MenuDash from "../menu/MenuDash";
import NvabarDash from "../nvabar/NvabarDash";
import { CiSearch } from "react-icons/ci";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";

const ProductsDash = () => {
  const number = [1, 2];
  return (
    <div className="w-[100%]">
      {/* menu */}
      <MenuDash />
      {/* nvabar */}
      <NvabarDash />
      {/* table */}
      <div className=" flex flex-col items-center w-[100%]">
        {/* table */}
        <div
          className="w-[1200px] bg-white shadow-md ml-[15%] mt-[6%] rounded-[3px]
        border-[2px] border-gray-200"
        >
          <div className="w-[100%] border-b-[2px] border-gray-200 p-[16px]">
            <h3 className="text-[17px] font-[550]">Bảng sản phẩm</h3>
          </div>
          <div className="w-[100%] p-[15px] flex justify-between">
            <form className="w-[100%] flex items-center">
              <input
                placeholder="Nhập tên để tìm"
                className="outline-none border-[2px] border-gray-300 p-[7px] w-[20%] pl-[32px] relative
                rounded-[3px] text-[15px] font-[450]"
              />
              <span className="absolute left-[20.2%]">
                <CiSearch size="16px" />
              </span>
            </form>
            <button
              className="p-[6px] bg-green-200 w-[10%] text-[13px] font-[500] rounded-[3px]
            flex items-center justify-center text-green-600
            duration-[0.5s] hover:text-white hover:bg-green-500"
            >
              <span className="mr-[5px]">
                <IoAddCircleOutline size="14px" />
              </span>
              Tạo mới
            </button>
          </div>
          {/* bangr */}
          <div className="w-[100%] p-2">
            <table className="border-collapse w-[100%] border-[2px] border-gray-200">
              <thead className="border-[2px] border-gray-200 bg-slate-100">
                <tr>
                  <th className="th-table-pro-dash cursor-pointer">
                    <div className="flex justify-between">
                      <span className="pr-[7px]">Tên</span>
                      <div className="flex flex-col">
                        <span>
                          <FaCaretDown
                            size="14px"
                            className="rotate-[180deg] opacity-[0.2]"
                          />
                        </span>
                        <span>
                          <FaCaretDown size="14px" className="opacity-[0.2]" />
                        </span>
                      </div>
                    </div>
                  </th>
                  <th className="th-table-pro-dash">
                    <span className="pr-[7px]">Hình</span>
                  </th>
                  <th className="th-table-pro-dash cursor-pointer">
                    <div className="flex justify-between">
                      <span className="pr-[7px]">Giá</span>
                      <div className="flex flex-col">
                        <span>
                          <FaCaretDown
                            size="14px"
                            className="rotate-[180deg] opacity-[0.2]"
                          />
                        </span>
                        <span>
                          <FaCaretDown size="14px" className="opacity-[0.2]" />
                        </span>
                      </div>
                    </div>
                  </th>
                  <th className="th-table-pro-dash cursor-pointer">
                    <div className="flex justify-between">
                      <span className="pr-[7px]">Số lượng</span>
                      <div className="flex flex-col">
                        <span>
                          <FaCaretDown
                            size="14px"
                            className="rotate-[180deg] opacity-[0.2]"
                          />
                        </span>
                        <span>
                          <FaCaretDown size="14px" className="opacity-[0.2]" />
                        </span>
                      </div>
                    </div>
                  </th>
                  <th className="th-table-pro-dash">
                    <span className="pr-[7px]">Thể loại</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-[14px] font-[500]">
                {number.map((i, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="tb-table-pro-dash">
                        <p>Here Is A Quick Cure For Book</p>
                      </td>
                      <td className=" tb-table-pro-dash">
                        <span className="flex justify-center">
                          <img
                            src="https://htmldemo.net/pustok/pustok/image/products/product-2.jpg"
                            className="w-[80px]"
                          />
                        </span>
                      </td>
                      <td className="tb-table-pro-dash">
                        <span className="flex justify-center">10.000 đ</span>
                      </td>
                      <td className="tb-table-pro-dash">
                        <span className="flex justify-center">20</span>
                      </td>
                      <td className="tb-table-pro-dash">
                        <span className="flex justify-center">Thú cưng</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* phan trang */}
          <div className="p-[20px] text-[14px] font-[500] w-[100%]">
            <ul className="flex w-[100%] flex justify-end">
              <li className="pagin-pro-dash w-[6%]">
                <span className=" ">Trước</span>
              </li>
              {number.map((i, idx) => {
                return (
                  <li
                    key={idx}
                    className={`pagin-pro-dash w-[3%] duration-[0.5s] hover:bg-gray-300
                    hover:border-gray-300
                    ${i === 1 ? "bg-blue-800 text-white border-blue-800" : ""}`}
                  >
                    <span>{i}</span>
                  </li>
                );
              })}
              <li className="pagin-pro-dash w-[6%]">
                <span className="">Sau</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDash;

import React from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdNavigateNext } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import BackToTop from "../backToTop/BackToTop";

const Carts = () => {
  const numers = [1, 2, 3];
  return (
    <div className="w-[100%]">
      <div className="w-[1200px] m-auto">
        {/* dau giao dien */}
        <Menu />
        {/* than giao dien */}
        <div className="w-[100%] mt-[30px] mb-[30px] pb-[100px]">
          {/* tieu de */}
          <div className="flex items-center mb-[30px]">
            <span className="cursor-pointer text-[16px] font-[400] pr-[5px]">
              Trang chủ
            </span>
            <span className="mr-[5px]">
              <MdNavigateNext size="14px" />
            </span>
            <span className="text-[16px] font-[400] pr-[5px]">Giỏ hàng</span>
          </div>
          {/* danh sach gio hang */}
          <div className="w-[100%]">
            <table className="border-collapse border-[2px] border-gray-200 shadow-md w-[100%]">
              <thead>
                <tr>
                  <th className="text-th-talble-listLove">Hình</th>
                  <th className="text-th-talble-listLove">Tên sản phẩm</th>
                  <th className="text-th-talble-listLove">Giá</th>
                  <th className="text-th-talble-listLove">Số lượng</th>
                  <th className="text-th-talble-listLove">Tổng tiền</th>
                  <th className="text-th-talble-listLove">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {numers.map((i, idx) => {
                  return (
                    <tr key={idx} className="duration-[0.5s] hover:bg-white">
                      <td className="cursor-pointer">
                        <span className="flex justify-center border-tbody-listLove p-3">
                          <img
                            src="https://htmldemo.net/pustok/pustok/image/products/product-1.jpg"
                            className="w-[100px]"
                          />
                        </span>
                      </td>
                      <td className="border-tbody-listLove p-3">
                        <h3 className="text-hover-listLove cursor-pointer text-center text-[16px] font-[500]">
                          Rinosin Glasses
                        </h3>
                      </td>
                      <td className="border-tbody-listLove p-3">
                        <span className="text-[16px] font-[400] flex items-center justify-center">
                          10.000 đ
                        </span>
                      </td>
                      <td className="border-tbody-listLove p-3">
                        <div className="flex items-center justify-center">
                          <span className="icon-add-remove-carts">
                            <IoIosRemove size="18px" />
                          </span>
                          <span className="text-[16px] font-[700] p-2">1</span>
                          <span className="icon-add-remove-carts">
                            <IoIosAdd size="18px" />
                          </span>
                        </div>
                      </td>
                      <td className="border-tbody-listLove p-3">
                        <span className="text-[16px] font-[400] flex items-center justify-center">
                          10.000 đ
                        </span>
                      </td>
                      <td className="border-tbody-listLove p-3">
                        <span className="cursor-pointer text-hover-listLove p-3 flex items-center justify-center">
                          <FaTrash size="16px" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="p-[30px] w-[100%] border-[2px] border-gray-200">
                  <td colSpan={6} className="w-[100%] p-[22px]">
                    <div className="flex border-[2px] border-gray-200 p-[20px] justify-between">
                      <input
                        className="outline-none p-3 rounded-[3px] bg-gray-300 border-[1px] border-gray-200
                        mr-[30px]"
                        placeholder="Nhập mã giảm giá..."
                      />
                      <button className="button-carts w-[12%]">Áp dụng</button>
                    </div>
                    <div className="flex items-center justify-center pt-[20px]">
                      <button className="button-carts w-[18%]">
                        Cập nhật giỏ hàng
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* giao dien tong tien */}
          <div className="flex flex-col float-right items-end w-[35%]  p-[20px]">
            <div
              className="  w-[100%] rounded-[3px] shadow-md mt-[50px] border-[2px] border-gray-200 p-[20px]
          mb-[50px]"
            >
              <h3 className="text-[18px] font-[500] text-right ">
                Tóm tắt giỏ hàng
              </h3>
              <div className="p-[10px] border-b-[2px] border-gray-200">
                <div className="flex justify-between pb-[10px]">
                  <span className="text-[15px] font-[400]">Tổng tiền</span>
                  <span className="text-green-600 font-[500] text-[16px]">
                    10.000 đ
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[15px] font-[400]">Giá vận chuyển</span>
                  <span className="text-green-600 font-[500] text-[16px]">
                    0 đ
                  </span>
                </div>
              </div>
              <div className="p-[10px] flex justify-between">
                <span className="text-[18px]">Tổng tất cả tiền</span>
                <span className="text-green-600 font-[500] text-[18px]">
                  10.000 đ
                </span>
              </div>
            </div>
            {/* chuyen dat hang */}
            <div className="float-right mb-[40px]">
              <button
                className="bg-green-600 text-white uppercase text-[16px] p-[10px]
            font-[500] duration-[0.5s] hover:bg-black w-[140px] rounded-[30px]"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
        {/* cuoi giao dien */}
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
};

export default Carts;

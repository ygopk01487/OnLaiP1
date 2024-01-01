import React from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdNavigateNext } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import BackToTop from "../backToTop/BackToTop";
import { Navigate, useNavigate } from "react-router-dom";

const ListLove = () => {
  const nagivate = useNavigate();
  const numbers = [1, 2, 3];
  return (
    <div className="w-[100%]">
      <div className="w-[1200px] m-auto">
        {/* dau giao dien */}
        <Menu />
        {/* than giao dien */}
        <div className="w-[100%] mt-[30px] mb-[50px]">
          {/* tieu de */}
          <div className="flex items-center mb-[30px]">
            <span
              className="text-[16px] font-[400] cursor-pointer mr-[5px] hover:text-green-600 duration-[0.5s]"
              onClick={() => nagivate("/trang-chu")}
            >
              Trang chủ
            </span>
            <span className="mr-[5px]">
              <MdNavigateNext size="14px" />
            </span>
            <span>Danh sách yêu thích</span>
          </div>
          {/* bang danh sach yeu thich */}
          <div className="w-[100%] mt-[30px]">
            <table
              className="border-[2px] border-gray-200 shadow-md border-collapse rounded-[3px]
            w-[100%]"
            >
              <thead>
                <tr>
                  <th className="text-th-talble-listLove">Hình</th>
                  <th className="text-th-talble-listLove">Tên sản phẩm</th>
                  <th className="text-th-talble-listLove">Giá</th>
                  <th className="text-th-talble-listLove">Bỏ yêu thích</th>
                </tr>
              </thead>
              <tbody>
                {numbers.map((i, idx) => {
                  return (
                    <tr key={idx} className="duration-[0.5s] hover:bg-white">
                      <td className="img-tbody-listLove cursor-pointer border-tbody-listLove p-3">
                        <span>
                          <img
                            src="https://htmldemo.net/pustok/pustok/image/products/product-1.jpg"
                            className="w-[100px]"
                          />
                        </span>
                      </td>
                      <td className="border-tbody-listLove">
                        <h3
                          className="text-center cursor-pointer text-hover-listLove text-[17px]
                    font-[400]"
                        >
                          Rinosin Glasses
                        </h3>
                      </td>
                      <td className="border-tbody-listLove">
                        <span className="flex items-center justify-center text-[16px]">
                          10.000 đ
                        </span>
                      </td>
                      <td className="border-tbody-listLove">
                        <span className="flex items-center justify-center cursor-pointer text-hover-listLove">
                          <IoMdHeartDislike size="20px" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* cuoi giao dien */}
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
};

export default ListLove;

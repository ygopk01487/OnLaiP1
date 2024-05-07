import React from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdOutlineNavigateNext } from "react-icons/md";

const OrderComplete = () => {
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
            <span>Đặt hành thành công</span>
          </div>
          {/* than */}
          <div className="flex flex-col justify-center pt-[20px] items-center">
            <h1 className="text-[30px] font-[700]">Cảm ơn !</h1>
            <span className="text-[20px] font-[450]">
              Đơn đặt hàng của bạn đã được nhận
            </span>
            <span className="text-[15px] font-[450]">
              ( Vui lòng vào MAIL hoặc vào phần thông tin cá nhân để xem lại )
            </span>
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default OrderComplete;

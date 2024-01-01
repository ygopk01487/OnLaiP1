import React, { useState } from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdNavigateNext } from "react-icons/md";
import BackToTop from "../backToTop/BackToTop";

const CheckOut = () => {
  const numers = [1, 2, 3];
  const [checkBox, setCheckBox] = useState(true);

  const checkOrder = () => {
    setCheckBox((i) => !i);
  };

  return (
    <div className="w-[100%]">
      <div className="w-[1200px] m-auto">
        {/* dau giao dien */}
        <Menu />
        {/* than giao dien */}
        <div className="w-[100%] mt-[30px] mb-[100px]">
          {/* Tieu de */}
          <div className="flex items-center text-[16px] font-[400]">
            <span className="cursor-pointer hover:text-green-600 duarion-[0.5s] pr-[5px]">
              Trang chủ
            </span>
            <span>
              <MdNavigateNext size="14px" />
            </span>
            <span className="pl-[5px]">Thủ tục đặt hàng</span>
          </div>
          {/* giao dien dat hang */}
          <div className="w-[100%] pt-[30px] flex justify-between">
            {/* dia chi thanh toan */}
            <div className="w-[100%]">
              <h2
                className="pt-[20px] pb-[20px] text-[24px] font-[700] uppercase
              border-b-[2px] border-gray-200"
              >
                Địa chỉ thanh toán
              </h2>
              <div className="w-[100%]">
                <form className="w-[100%]">
                  <div className="div-order">
                    <div className="flex flex-col w-[100%]">
                      <span className="text-span-order">Họ</span>
                      <input
                        className="text-input-order "
                        placeholder="Họ của bạn"
                      />
                    </div>
                    <div className="flex flex-col pl-[10px] w-[100%]">
                      <span className="text-span-order">Tên</span>
                      <input
                        className="text-input-order"
                        placeholder="Tên của bạn"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-span-order">Tên nước</span>
                    <input
                      placeholder="Tên nước bạn đang sống"
                      className="text-input-order"
                    />
                  </div>
                  <div className="div-order">
                    <div className="flex flex-col w-[100%]">
                      <span className="text-span-order">Địa chỉ mail</span>
                      <input
                        className="text-input-order"
                        placeholder="Nhập mail của bạn"
                      />
                    </div>
                    <div className="flex flex-col w-[100%] pl-[10px]">
                      <span className="text-span-order">Số điện thoại</span>
                      <input
                        className="text-input-order"
                        placeholder="Số điện thoại của bạn"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col  pb-[10px]">
                    <span className="text-span-order">Địa chỉ</span>
                    <input
                      className="text-input-order"
                      placeholder="Địa chỉ hiện tại bạn đang sống"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-span-order">Ghi chú đặt hàng</span>
                    <textarea
                      className="text-input-order"
                      placeholder="Ghi chú những gì cần chú ý khi đặt hàng"
                    />
                  </div>
                </form>
              </div>
            </div>
            {/* san pham da dat */}
            <div className="w-[60%] p-[40px] ml-[40px] bg-white shadow-md rounded-[3px]">
              <h3
                className="pt-[20px] pb-[20px] text-[24px] font-[700] uppercase
              border-b-[2px] border-gray-200"
              >
                Đơn hàng đã đặt
              </h3>
              {/* thong tin chi teit */}
              <div className="w-[100%]">
                <div className="flex justify-between pt-[10px] pb-[10px]">
                  <span className="text-title-order">Sản phẩm</span>
                  <span className="text-title-order">Tổng cộng</span>
                </div>
                {/* san pham */}
                <div className="w-[100%] border-b-[2px] border-gray-200">
                  {numers.map((i, idx) => {
                    return (
                      <div className="flex justify-between pt-[5px] pb-[10px]">
                        <span className="text-pro-order">
                          Cillum dolore tortor nisl X 01
                        </span>
                        <span className="text-pro-order">20.000 đ</span>
                      </div>
                    );
                  })}
                </div>
                <div className="div-price-order">
                  <span>Tổng phụ</span>
                  <span> 30.000 đ</span>
                </div>
                <div className="div-price-order">
                  <span>Phí síp</span>
                  <span>0 đ</span>
                </div>
                <div
                  className="flex justify-between pt-[10px] pb-[10px] text-[19px] font-[500]
                border-b-[3px] border-green-600"
                >
                  <span>Tổng phải trả</span>
                  <span>30.000 đ</span>
                </div>
                <div className="flex pt-[10px] pb-[10px]">
                  <input type="checkbox" onClick={checkOrder} />
                  <span className="text-[14px] font-[500] pl-[7px]">
                    Tôi đã đọc và chấp nhận điều khoản ở trên
                  </span>
                </div>
                <button
                  className={`${
                    checkBox
                      ? "cursor-not-allowed opacity-[0.4]"
                      : "hover:bg-red-800 opacity-100"
                  } w-[100%] bg-green-600 text-white font-[600] uppercase
                rounded-[3px] p-[14px] duration-[0.5s]  mt-[20px]`}
                >
                  Đặt hàng
                </button>
              </div>
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

export default CheckOut;

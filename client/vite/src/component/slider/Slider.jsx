import React from "react";

const Slider = () => {
  return (
    <div className="w-[100%] p-[15px] bg-gray-200 mt-[30px] flex">
      <span>
        <img
          src="https://htmldemo.net/pustok/pustok/image/bg-images/home-slider-1-ai.png"
          className="w-[400px] "
        />
      </span>
      <div className="w-[290px] ml-[10%]">
        <p className="text-[39px] font-bold pt-[10%] pb-[10%] cursor-default">
          J.D. Kurtness De Vengeance
        </p>
        <button
          className="p-3 bg-white border-[2px] border-green-600 text-green-600 text-[16px] font-medium
      rounded-[3px] hover:text-white duration-[0.5s] hover:bg-green-600"
        >
          10.000 đ - Đặt hàng ngay
        </button>
      </div>
    </div>
  );
};

export default Slider;

import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div
        className="w-[100%] mt-[40px] pt-[20px] border-t-[2px] border-gray-200
     grid grid-cols-4"
      >
        {/* logo */}
        <div className="pb-[80px]">
          <ul>
            <li className="mb-[20px]">
              <span>
                <img src="https://htmldemo.net/pustok/pustok/image/logo--footer.png" />
              </span>
            </li>
            <li className="flex pb-[10px]">
              <span className="text-ul-li-footer w-[28%]">Địa chỉ:</span>
              <p className="text-[15px]">
                Example Street 98, HH2 BacHa, New York, USA
              </p>
            </li>
            <li className="flex pb-[10px]">
              <span className="text-ul-li-footer w-[37%]">Số điện thoại:</span>
              <p className="text-[15px]">+18088 234 5678</p>
            </li>
            <li className="flex">
              <span className="text-ul-li-footer w-[18%]">Email:</span>
              <p className="text-[15px]">suport@hastech.com</p>
            </li>
          </ul>
        </div>
        {/* thong tin */}
        <div className="pb-[80px]">
          <ul>
            <li className="uppercase text-[18px] font-[500] pb-[30px]">
              <span>Thông tin</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Giảm giá</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Sản phẩm mới</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Hàng bán chạy</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Liên hệ chúng tôi</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Sơ đồ trang web</span>
            </li>
          </ul>
        </div>
        {/* bo sung */}
        <div className="pb-[80px]">
          <ul>
            <li className="uppercase text-[18px] font-[500] pb-[30px]">
              <span>Bổ sung</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Vận chuyển</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Về chúng tôi</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Cửa hàng</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Liên hệ chúng tôi</span>
            </li>
            <li className="text-ul-li-2-footer">
              <span>Sơ đồ trang web</span>
            </li>
          </ul>
        </div>
        {/* dang ky ban tin */}
        <div>
          <h3 className="uppercase text-[18px] font-[500] pb-[30px]">
            Đăng ký bản tin
          </h3>
          <div>
            <form className="flex flex-col">
              <input
                className="outline-none p-3 border-[2px] border-gray-200 rounded-[2px] text-[15px]
              mb-[10px]"
                placeholder="Nhập địa chỉ email tại đây"
              />
              <button
                className="bg-green-600 p-3 flex items-center
            text-white uppercase justify-center rounded-[2px] text-[14px] font-[500]
            mb-[13px] hover:bg-black duration-[0.5s]"
              >
                Đăng ký
              </button>
            </form>
          </div>
          <div>
            <span className="uppercase text-[18px] font-[500]">
              giữ liên lạc
            </span>
            <ul className="flex mt-[10px]">
              <li className="bg-blue-700 text-icon-ul-li-footer mr-[10px] ">
                <span>
                  <FaFacebookF size="14px" />
                </span>
              </li>
              <li className="bg-orange-600 text-icon-ul-li-footer mr-[10px]">
                <span>
                  <FaGoogle size="14px" />
                </span>
              </li>
              <li className="bg-blue-500 text-icon-ul-li-footer mr-[10px]">
                <span>
                  <FaTwitter size="14px" />
                </span>
              </li>
              <li className="bg-red-700 text-icon-ul-li-footer">
                <span>
                  <FaYoutube size="14px" />
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* copy right */}
      <div
        className="w-[100%] flex flex-col justify-center items-center text-black 
      text-[14px] font-[500]  p-2 border-t-[2px] border-gray-200"
      >
        <span>
          Copyright © 2022{" "}
          <span className="text-green-600 cursor-pointer">Pustok</span>. All
          Right Reserved.
        </span>
        <span>Design By Pustok</span>
      </div>
    </>
  );
};

export default Footer;

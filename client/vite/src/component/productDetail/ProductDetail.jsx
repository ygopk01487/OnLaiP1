import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Menu from "../nvabar/menu";
import { MdNavigateNext } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { backToReview } from "../jsAnimation/animation";
import BackToTop from "../backToTop/BackToTop";

const ProductDetail = () => {
  const stars = [1, 2, 3, 4, 5];
  const [ac, setAc] = useState(true);
  const number = [1, 2, 3, 4];

  const activeF = () => {
    setAc(false);
    backToReview();
  };
  const activeT = () => setAc(true);

  return (
    <div className="w-[100%]">
      <div className="w-[1200px] m-auto">
        {/* dau giao dien */}
        <Menu />
        {/* than giao dien */}
        <div className="w-[100%] mt-[30px]">
          {/* ten tieu de */}
          <div className="flex items-center">
            <span className="text-[16px] font-[400] hover:text-green-600 duration-[0.5s] pr-[5px] cursor-pointer">
              Trang chủ
            </span>
            <span>
              <MdNavigateNext size="14px" />
            </span>
            <span className="text-[16px] font-[400] pl-[5px]">
              chi tiết sản phẩm
            </span>
          </div>
          {/* giao dien chi tiet */}
          <div className="w-[100%] mt-[40px]">
            {/* san pham */}
            <div className="w-[100%] flex justify-between">
              {/* hinh anh */}
              <div className="w-[70%]">
                <img
                  src="https://htmldemo.net/pustok/pustok/image/products/product-details-1.jpg"
                  className="w-[450px]"
                />
              </div>
              {/* tohng tin */}
              <div className="w-[100%]">
                <div className="text-[14px] font-[400] pb-[10px] flex">
                  <span className="pr-[5px]">Thể loại:</span>
                  <span className=" hover:text-green-600 duration-[0.5s] cursor-pointer">
                    lịch sử
                  </span>
                </div>
                <h1 className="text-[18px] font-[550] pb-[10px]">
                  Beats EP Wired On-Ear Headphone-Black
                </h1>
                <div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Giá cũ:
                    </span>
                    <span className="text-[16px] text-green-600 font-[400] ">
                      9.000 đ
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Tác giả:
                    </span>
                    <span className="text-[16px] text-green-600 font-[500] cursor-pointer">
                      Cannon
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Mã sản phẩm:
                    </span>
                    <span className="text-[16px] text-green-600 font-[400]">
                      model1
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Số lượng:
                    </span>
                    <span className="text-[16px] text-green-600 font-[400] ">
                      Còn
                    </span>
                  </div>
                  <div className="flex items-center pt-[10px]">
                    <span className="text-[19px] font-[500] text-green-600 pr-[8px]">
                      10.000 đ
                    </span>
                    <del className="text-gray-400">20.000 đ</del>
                  </div>
                  <div className="flex mt-[10px] pb-[10px]">
                    {stars.map((i, idx) => {
                      return (
                        <span className="" key={idx}>
                          <IoIosStar
                            size="22px"
                            className="text-yellow-400 rounded-[2px] pr-[2px]"
                          />
                        </span>
                      );
                    })}
                    <span
                      className="text-[15px] font-[400] border-r-[2px] border-gray-300 pl-[8px] pr-[8px]
                    "
                    >
                      (1 đánh giá)
                    </span>
                    <span
                      className="cursor-pointer text-[15px] font-[400] pl-[8px]"
                      onClick={activeF}
                    >
                      Viết đánh giá
                    </span>
                  </div>
                  <p className="text-[15px] font-400 pb-[10px]">
                    Long printed dress with thin adjustable straps. V-neckline
                    and wiring under the Dust with ruffles at the bottom of the
                    dress.
                  </p>
                  <div className="flex items-center pb-[10px]">
                    <span className="icon-add-remove-carts">
                      <IoIosRemove size="18px" />
                    </span>
                    <span className="text-[16px] font-[700] p-2">1</span>
                    <span className="icon-add-remove-carts">
                      <IoIosAdd size="18px" />
                    </span>
                    <button
                      className="p-[13px] bg-white w-[23%] border-[2px] border-green-600 text-[16px] font-[500]
                    rounded-[3px] duration-[0.5s] hover:text-white hover:bg-green-600 ml-[20px]"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                  <div className="flex items-center cursor-pointer duration-[0.5s] hover:text-green-600">
                    <span className="mr-[5px]">
                      <FaHeartCirclePlus size="20px" />
                    </span>
                    <span className="text-[16px] font-[400] ">Yêu thích</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex p-[26px] text-[20px] uppercase font-[500] justify-center  pt-[6%] border-b-[2px]
            border-gray-200 before:content-[''] relative"
            >
              <h3
                className={`duration-[0.5s]
             hover:text-green-600 cursor-pointer pr-[6%] 
             ${ac ? "active before:left-[37.5%]" : ""}
             `}
                onClick={activeT}
              >
                Mô tả thêm
              </h3>
              <h3
                className={`duration-[0.5s]
             hover:text-green-600 cursor-pointer
             ${!ac ? "active before:left-[53.5%]" : ""}`}
                onClick={activeF}
              >
                Đánh giá (1)
              </h3>
            </div>
            {/* mo ta them */}
            <div className={`${ac ? "block" : "hidden"} p-[40px]`}>
              <p className="text-[16px] font-[400]">
                Thời trang đã tạo ra các bộ sưu tập được thiết kế đẹp mắt kể từ
                năm 2010. Thương hiệu này cung cấp các thiết kế nữ tính mang đến
                những chiếc váy tách biệt và nổi bật đầy phong cách, từ đó đã
                phát triển thành một bộ sưu tập quần áo may sẵn đầy đủ, trong đó
                mỗi món đồ đều là một phần quan trọng trong tủ quần áo của phụ
                nữ. Kết quả? Vẻ ngoài mát mẻ, dễ dàng, sang trọng với sự thanh
                lịch trẻ trung và phong cách đặc trưng không thể nhầm lẫn. Tất
                cả những món đồ đẹp đẽ đều được sản xuất tại Ý và được sản xuất
                với sự chú ý lớn nhất. Giờ đây, Thời trang mở rộng sang nhiều
                loại phụ kiện bao gồm giày, mũ, thắt lưng và nhiều thứ khác!
              </p>
            </div>
            {/* binh luan */}
            <div className={`${!ac ? "block" : "hidden"} w-[100%]`}>
              <h3 className="text-[18px] font-[500] pt-[20px] pb-[9px]">
                Thêm đánh giá
              </h3>
              <div className="w-[100%]">
                <span className="text-[16px] font-[400] ">
                  Đánh giá của bạn
                </span>
                <div className="flex pt-[10px] pb-[20px] flex-row-reverse justify-end">
                  {stars.map((i, idx) => {
                    return (
                      <span
                        key={idx}
                        className="pr-[15px] cursor-pointer duration-[0.5s]
                        peer peer-hover:text-yellow-400 hover:text-yellow-400
                        "
                      >
                        <IoIosStar size="22px" />
                      </span>
                    );
                  })}
                </div>
                <div className="w-[100%]">
                  <form className="w-[100%] flex flex-col">
                    <label className="text-[16px] font-[400] pb-[8px]">
                      Bình luận
                    </label>
                    <textarea
                      className="p-[20px] rounded-[3px] outline-none border-[2px] border-gray-400"
                      placeholder="Nhập bình luận ở đây"
                    />
                    <button
                      className="p-[16px] bg-black text-white uppercase text-[14px] font-[500]
                    duration-[0.5s] hover:bg-green-600 rounded-[3px] w-[14%] mt-[20px]"
                    >
                      Đăng bình luận
                    </button>
                  </form>
                </div>
              </div>
              {/* sau khi dang binh luan */}
              <div className="w-[100%] mt-[30px] border-t-[2px] border-gray-200">
                <div className="flex mt-[30px]">
                  <span>
                    <img
                      src="https://htmldemo.net/pustok/pustok/image/icon/author-logo.png"
                      className="w-[60px] rounded-[30px] "
                    />
                  </span>
                  <div
                    className="bg-white border-[2px] border-gray-200 rounded-[3px] p-[10px]
                  before:content-[''] before:absolute relative before: ml-[20px] before:p-[6px]
                  before:bg-white before:top-[10%] before:left-[-0.6%] before:rotate-[45deg]
                  before:border-l-[2px] before:border-b-[2px] before:border-gray-200 w-[100%]
                  "
                  >
                    <div className="flex">
                      {stars.map((i, idx) => {
                        return (
                          <span key={idx} className="pr-[10px] ">
                            <IoIosStar
                              size="14px"
                              className="text-yellow-400"
                            />
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex text-[14px] font-[500] pt-[10px]">
                      <span className="uppercase">Admin -</span>
                      <span className="pl-[5px]">March 23, 2015</span>
                    </div>
                    <p>
                      Lorem et placerat vestibulum, metus nisi posuere nisl, in
                      accumsan elit odio quis mi
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* san pham lien quan */}
            <div className="w-[100%] pt-[50px]">
              <div
                className="w-[100%] border-b-[2px] border-gray-200 pb-[14px]
              before:content-[''] relative before:absolute before:h-[2px] before:w-[18%]
              before:bg-green-500 before:bottom-[0%] before:left-[41%]"
              >
                <h3 className="text-[20px] uppercase font-[500] text-center">
                  Sản phẩm liên quan
                </h3>
              </div>
              {/* ds san pham lien quan */}
              <div className="grid grid-cols-4 gap-[5px] mt-[30px] pb-[20px]">
                {number.map((i, idx) => {
                  return (
                    <>
                      <div
                        key={idx}
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
              <div className="w-[100%] flex justify-center pt-[30px] pb-[20px]">
                <button
                  className=" p-[13px] uppercase w-[12%] border-[2px] border-green-600 bg-white text-[14px] font-[500]
               duration-[0.5s] hover:bg-green-600 rounded-[3px] hover:text-white"
                >
                  Xem thêm
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

export default ProductDetail;

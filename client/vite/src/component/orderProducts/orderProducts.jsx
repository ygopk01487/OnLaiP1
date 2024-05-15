import React, { useEffect, useState } from "react";
import MenuAccountDetail from "../accountDetail/menuAccountDetail";
import Menu from "../nvabar/menu";
import { MdOutlineNavigateNext } from "react-icons/md";
import Footer from "../footer/Footer";
import { getByUser, refreshTK } from "../../action/users";
import { getByIdUserOther } from "../../action/usersOther";
import { getOrderByUser } from "../../action/order";
import { numberFormat } from "../productDetail/ProductDetail";
import { useNavigate } from "react-router-dom";

const OrderProducts = () => {
  const navigate = useNavigate();

  const [idUser, setIdUser] = useState("");
  const [idUserOther, setIdUserOther] = useState("");

  const [orderPro, setOrderPro] = useState([]);

  //rf token
  const fcRefreshToken = async () => {
    const rfTK = JSON.parse(window.sessionStorage.getItem("refresh_token"));

    if (rfTK) {
      const token = await refreshTK(rfTK);
      if (token) {
        window.sessionStorage.setItem("access_token", JSON.stringify(token));
      }
    }
  };

  //get userOne
  const fcUser = async () => {
    const user = await getByUser();
    if (user) {
      setIdUser(user._id);
    }
  };

  //get id userOther
  const getByIdUSerOthers = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    const data = await getByIdUserOther(userOther.localId);
    if (data) {
      setIdUserOther(data._id);
    }
  };

  //get order
  const getOrders = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;

    if (!userOther) {
      data = await getOrderByUser(idUser, "");
    } else {
      data = await getOrderByUser("", idUserOther);
    }

    if (data) {
      setOrderPro(data);
    }
  };

  //date format
  const dateFormat = (date) => {
    const dates = new Date(date);
    return dates.toLocaleString();
  };

  useEffect(() => {
    const checkUserOther = JSON.parse(window.sessionStorage.getItem("user"));
    if (!checkUserOther) {
      fcUser();
      setInterval(() => {
        fcRefreshToken();
      }, 10000);
    }

    getByIdUSerOthers();
  }, []);

  useEffect(() => {
    if (idUser || idUserOther) {
      getOrders();
    }
  }, [idUser, idUserOther]);

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
            <span>Danh sách đặt hàng</span>
          </div>
          {/* than */}
          <div className="w-[100%] mt-[30px] flex ">
            {/* menu thong tin */}
            <MenuAccountDetail />
            {/* giao dien than */}
            <div className="w-[100%] grid grid-cols-2 gap-[30px]">
              {orderPro.length > 0 ? (
                <>
                  {orderPro.map((i) => {
                    return (
                      <div
                        className="w-[100%]  border-gray-200 border-[2px] rounded-[3px] ml-[5%]"
                        key={i._id}
                      >
                        <div className=" p-[20px]">
                          <h3 className="pb-[10px] text-[18px] font-[400] border-gray-200 border-b-[2px]">
                            Đặt hàng
                          </h3>
                        </div>
                        {/* khung thong tin */}
                        <div className="p-[20px]">
                          <ul>
                            <li className="text-[15px]">
                              Ngày:
                              <span className="font-[700] ml-[4px]">
                                {dateFormat(i.createDate)}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              SDT:
                              <span className="font-[700] ml-[4px]">
                                {i.details.phone}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Đất nước:
                              <span className="font-[700] ml-[4px]">
                                {i.details.country}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Địa chỉ:
                              <span className="font-[700] ml-[4px]">
                                {i.details.address}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Chú ý:
                              <span className="font-[700] ml-[4px]">
                                {i.details.notes}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Tổng tiền:
                              <span className="font-[700] ml-[4px]">
                                {numberFormat.format(i.totalPrice)}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Áp dụng mã giả giá:
                              <span className="font-[700] ml-[4px]">
                                {i.codeSale.length === 0
                                  ? "Không"
                                  : `Có. Tổng giảm giá:  ${i.codeSale
                                      .map((i) => i.value)
                                      .reduce((a, b) => a + b, 0)} %`}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Tổng tiền phải trả:
                              <span className="font-[700] ml-[4px]">
                                {numberFormat.format(i.totalPriceSale)}
                              </span>
                            </li>
                            <li className="text-[15px]">
                              Trạng thái:
                              <span className="font-[700]"> đang duyệt</span>
                            </li>
                            <li className="text-[15px]">
                              thanh toán:
                              <span className="font-[700]">
                                chưa thanh toán
                              </span>
                            </li>
                          </ul>
                        </div>
                        {/* khung san pham */}
                        <div className="w-[100%] pb-[20px]">
                          <div className="p-[20px] ">
                            <h3 className="text-[16px] font-[450] pt-[10px] border-gray-200 border-t-[2px]">
                              Chi tiết sản phẩm
                            </h3>
                          </div>
                          <div className="w-[100%] p-[10px]">
                            <table className="w-[100%] border-collapse border-gray-200 border-[2px] ">
                              <thead className="text-[16px] w-[100%]">
                                <tr>
                                  <td
                                    className="font-[500] border-gray-200 border-b-[2px]
            border-r-[2px] p-[10px]"
                                  >
                                    Sản phẩm
                                  </td>
                                  <td className="font-[500]  border-r-[2px]  border-gray-200 border-b-[2px] p-[10px]">
                                    Tổng tiền
                                  </td>
                                </tr>
                              </thead>
                              <tbody>
                                {i.products.map((ix) => {
                                  return (
                                    <tr
                                      key={ix.productId._id}
                                      className="text-[15px] border-gray-200 border-b-[2px] border-r-[2px]"
                                    >
                                      <td className="p-[10px] font-[450] border-gray-200 border-r-[2px] flex">
                                        <h3 className="cursor-pointer pr-[10px] hover:text-gray-400 duration-[0.5s]">
                                          {ix.productId.name}
                                        </h3>
                                        <span className="font-[550]">
                                          x {ix.quantity}
                                        </span>
                                      </td>
                                      <td className="p-[10px]">
                                        {numberFormat.format(
                                          ix.quantity *
                                            ((ix.productId.price *
                                              (100 - ix.productId.discount)) /
                                              100)
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                                <tr className="text-[15px] border-gray-200 border-b-[2px] border-r-[2px]">
                                  <td className="font-[450] p-[10px] border-gray-200 border-r-[2px]">
                                    Tổng tiền:
                                  </td>
                                  <td className="font-[450] p-[10px]">
                                    {numberFormat.format(i.totalPrice)}
                                  </td>
                                </tr>
                                <tr className="text-[15px] border-gray-200 border-b-[2px] border-r-[2px]">
                                  <td className="font-[450] p-[10px] border-gray-200 border-r-[2px]">
                                    Áp dụng mã giảm giá:
                                  </td>
                                  <td className="font-[450] p-[10px]">
                                    {i.codeSale
                                      .map((i) => i.value)
                                      .reduce((a, b) => a + b, 0)}
                                    <span className="pl-[3px]">%</span>
                                  </td>
                                </tr>
                                <tr className="text-[15px] border-gray-200 border-b-[2px] border-r-[2px]">
                                  <td className="font-[450] p-[10px] border-gray-200 border-r-[2px]">
                                    Tổng phải trả:
                                  </td>
                                  <td className="font-[450] p-[10px]">
                                    {numberFormat.format(i.totalPrice)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center">
                    <span className="text-[15px] font-[450] mr-[5px]">
                      Không có hóa đơn nào
                    </span>
                    <button
                      className="bg-green-600 duration-[0.5s] font-[500]
                    hover:text-white uppercase text-[12px] p-[10px] w-[25%] rounded-[3px]"
                      onClick={() => navigate("/trang-chu")}
                    >
                      Trang chủ
                    </button>
                  </div>
                </>
              )}
            </div>
            ;
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default OrderProducts;

import React, { useEffect, useState } from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdNavigateNext } from "react-icons/md";
import BackToTop from "../backToTop/BackToTop";
import { getByUser, refreshTK } from "../../action/users";
import {
  addSaleCarts,
  deleteAllProCartss,
  getListCartByUser,
} from "../../action/listCart";
import { getByIdUserOther } from "../../action/usersOther";
import { numberFormat, socket } from "../productDetail/ProductDetail";
import { CiStickyNote } from "react-icons/ci";
import { addOrderPro } from "../../action/order";
import { useNavigate } from "react-router-dom";
import TextValidateForm from "../login/textValidateForm";

const CheckOut = () => {
  const [checkBox, setCheckBox] = useState(true);

  const navigate = useNavigate();

  const [dataCart, setDataCart] = useState({
    products: [],
    total: "",
    idCart: "",
    sale: [],
  });

  const [dataUser, setDataUser] = useState({ name: "", email: "" });

  const [idUSer, setIdUser] = useState("");

  const [idUserOther, setIdUserOther] = useState("");

  const [openCode, setOpenCode] = useState(false);

  const [data, setData] = useState({
    nameSale: "",
    country: "",
    address: "",
    notes: "",
    phone: "",
  });

  const [checkValueOrder, setCheckValueOrder] = useState(false);

  const [pCountry, setPCountry] = useState("");
  const [pNotes, setPNotes] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pAddress, setPAddress] = useState("");

  const [nameSale, setNameSale] = useState("");

  //function
  const checkOrder = () => {
    setCheckBox((i) => !i);
  };

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
      setDataUser({ ...dataUser, name: user.name, email: user.email });
    }
  };

  //get bys userOther
  const getByIdUSerOthers = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    if (userOther) {
      const data = await getByIdUserOther(userOther.localId);
      if (data) {
        setIdUserOther(data._id);
        setDataUser({ ...dataUser, name: data.name, email: data.email });
      }
    }
  };

  //get cart by user
  const getByCarUser = async () => {
    const checkUserOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    if (!checkUserOther) {
      data = await getListCartByUser(null, idUSer);
    } else {
      data = await getListCartByUser(idUserOther, null);
    }

    if (data) {
      setDataCart({
        ...dataCart,
        total: data.cartUser.totalPrice,
        products: data.cartUser.products,
        idCart: data.cartUser._id,
        sale: data.cartUser.sale,
      });
    }
  };

  //open code
  const clickOpenCode = () => {
    setOpenCode((e) => !e);
  };

  //add order
  const addOrders = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));

    let check = checkOrderPro();

    if (check) {
      clearTextCheck();
      setCheckValueOrder(true);
      let datas;

      if (!userOther) {
        datas = await addOrderPro(
          idUSer,
          "",
          dataCart.sale,
          data.address,
          data.country,
          data.phone,
          data.notes,
          dataCart.products,
          dataCart.total
        );
      } else {
        datas = await addOrderPro(
          "",
          idUserOther,
          dataCart.sale,
          data.address,
          data.country,
          data.phone,
          data.notes,
          dataCart.products,
          dataCart.total
        );
      }

      if (datas) {
        await deleteAllProCartss(dataCart.idCart);
        navigate("/dat-hang-thanh-cong");
      }
    }
  };

  //delete cart
  const deleteCarts = async () => {
    await deleteCartss(dataCart.idCart);
  };

  //on chang add detail
  const onChangeAddOrder = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //chekc add order
  const checkOrderPro = () => {
    let check = true;

    if (data.country.trim() === "") {
      setPCountry("Không được bỏ trống !");
      check = false;
    } else if (data.country !== "") {
      setPCountry("");
      check = true;
    }

    if (data.address.trim() === "") {
      setPAddress("Không được bỏ trống !");
      check = false;
    } else if (data.address.length < 5) {
      setPAddress("Địa chỉ không chi tiết!");
      check = false;
    } else if (data.address !== "") {
      setPAddress("");
      check = true;
    }

    if (data.phone.trim() === "") {
      setPPhone("Không được bỏ trống !");
      check = false;
    } else if (data.phone !== "") {
      setPPhone("");
      check = true;
    }

    if (data.notes.trim() === "") {
      setPNotes("Không được bỏ trống !");
      check = false;
    } else if (data.notes.length < 5) {
      setPNotes("Quá ngắn !");
      check = false;
    } else if (data.notes !== "") {
      setPNotes("");
      check = true;
    }

    return check;
  };

  //clear text check
  const clearTextCheck = () => {
    setPAddress("");
    setPCountry("");
    setPNotes("");
    setPPhone("");
    setData({
      ...data,
      country: "",
      address: "",
      phone: "",
      notes: "",
    });
  };

  //add sale
  const addSaleC = async () => {
    let check = "";
    if (dataCart.sale.map((i) => i.nameSale).includes(nameSale)) {
      check = false;
    } else {
      check = true;
    }

    if (nameSale !== "ADMIN") {
      return alert("Mã này không tồn tại");
    }

    if (check === true) {
      const data = await addSaleCarts(nameSale, 10, dataCart.idCart);
      if (data) {
        setData({ nameSale: nameSale });
        // setNameSale("");
        getByCarUser();
      }
    } else if (check === false) {
      alert("Mã này bạn đã sử dụng");
    }
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
    socket.on("load", (data) => {
      setDataCart({
        ...dataCart,
        totalPrice: data.totalPrice,
        sale: data.sale,
        idCart: data._id,
        products: data.products,
      });
    });
  }, [socket]);

  useEffect(() => {
    if (idUSer || idUserOther) {
      getByCarUser();
    }
  }, [idUSer, idUserOther]);

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
          {/* giao dien ma code */}
          {dataCart.products.length > 0 ? (
            <>
              <div
                className="w-[100%] border-t-[4px] border-green-600 bg-gray-200
          flex items-center  p-[15px] mt-[50px]"
              >
                <span className="flex items-center mr-[5px]">
                  <CiStickyNote size="18px" />
                </span>
                <span className="text-[14px] font-[450] mr-[5px]">
                  Bạn có mã?
                </span>
                <span
                  className="text-[14px] font-[450] text-red-800 cursor-pointer"
                  onClick={clickOpenCode}
                >
                  Bấm vào đây nhập mã ADMIN để giảm giá
                </span>
              </div>
              {/* giao dien nhap code */}
              <div
                className={`w-[100%] border-[2px] border-gray-200 rounded-[3px]
          p-[20px] flex mt-[20px] duration-[0.8s] ${
            openCode ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
              >
                <input
                  className="w-[15%] p-[15px] bg-gray-200 outline-none text-[14px] mr-[20px]"
                  placeholder="Nhập mã ở đây"
                  type="text"
                  value={nameSale}
                  onChange={(e) => setNameSale(e.target.value)}
                />
                <button
                  className="text-[14px] font-[500] uppercase
            border-[2px] border-gray-200 rounded-[3px] p-[10px] hover:bg-green-600 hover:border-green-600
            duration-[0.5s] hover:text-white w-[10%]"
                  onClick={addSaleC}
                >
                  Áp dụng
                </button>
              </div>
              {/* giao dien dat hang */}
              <div
                className={`w-[100%] flex justify-between ${
                  openCode ? "pt-[30px]" : "mt-[-8%]"
                }
          duration-[0.5s]`}
              >
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
                            disabled="disabled"
                            value={dataUser.name.split(" ")[0]}
                          />
                        </div>
                        <div className="flex flex-col pl-[10px] w-[100%]">
                          <span className="text-span-order">Tên</span>
                          <input
                            className="text-input-order"
                            placeholder="Tên của bạn"
                            disabled="disabled"
                            value={dataUser.name
                              .split(" ")
                              .slice(1, dataUser.name.split(" ").length)
                              .join(" ")}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-span-order">Tên nước</span>
                        <input
                          placeholder="Tên nước bạn đang sống"
                          className="text-input-order"
                          name="country"
                          value={data.country}
                          onChange={onChangeAddOrder}
                          type="text"
                        />
                      </div>
                      <TextValidateForm textCheck={pCountry} />
                      <div className="div-order">
                        <div className="flex flex-col w-[100%]">
                          <span className="text-span-order">Địa chỉ mail</span>
                          <input
                            className="text-input-order"
                            placeholder="Nhập mail của bạn"
                            disabled="disabled"
                            value={dataUser.email}
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col w-[100%] pl-[10px]">
                          <span className="text-span-order">Số điện thoại</span>
                          <input
                            className="text-input-order input-inner-outer-type-number"
                            placeholder="Số điện thoại của bạn"
                            name="phone"
                            value={data.phone}
                            type="number"
                            onChange={onChangeAddOrder}
                          />
                        </div>
                      </div>
                      <TextValidateForm textCheck={pPhone} styles="ml-[51%]" />
                      <div className="flex flex-col  pb-[10px]">
                        <span className="text-span-order">Địa chỉ</span>
                        <input
                          className="text-input-order"
                          placeholder="Địa chỉ hiện tại bạn đang sống"
                          name="address"
                          value={data.address}
                          onChange={onChangeAddOrder}
                          type="text"
                        />
                      </div>
                      <TextValidateForm textCheck={pAddress} />
                      <div className="flex flex-col">
                        <span className="text-span-order">
                          Ghi chú đặt hàng
                        </span>
                        <textarea
                          className="text-input-order"
                          placeholder="Ghi chú những gì cần chú ý khi đặt hàng"
                          name="notes"
                          value={data.notes}
                          onChange={onChangeAddOrder}
                          type="text"
                        />
                      </div>
                      <TextValidateForm textCheck={pNotes} />
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
                      {dataCart.products.map((i) => {
                        return (
                          <div
                            className="flex justify-between pt-[5px] pb-[10px]"
                            key={i.productId._id}
                          >
                            <span className="text-pro-order">
                              {i.productId.name + " X " + i.quantity}
                            </span>
                            <span className="text-pro-order">
                              {numberFormat.format(
                                (i.productId.price *
                                  (100 - i.productId.discount)) /
                                  100
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="div-price-order">
                      <span>Tổng phụ</span>
                      <span>{numberFormat.format(dataCart.total)}</span>
                    </div>
                    <div className="div-price-order">
                      <span>Giảm giá</span>
                      <span>
                        {dataCart.sale
                          .map((i) => i.value)
                          .reduce((a, b) => a + b, 0)}
                        %
                      </span>
                    </div>
                    <div className="div-price-order">
                      <span>Phí síp</span>
                      <span>{numberFormat.format(0)}</span>
                    </div>
                    <div
                      className="flex justify-between pt-[10px] pb-[10px] text-[19px] font-[500]
                border-b-[3px] border-green-600"
                    >
                      <span>Tổng phải trả</span>
                      <span>
                        {numberFormat.format(
                          (dataCart.total *
                            (100 -
                              dataCart.sale
                                .map((i) => i.value)
                                .reduce((a, b) => a + b, 0))) /
                            100
                        )}
                      </span>
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
                      onClick={addOrders}
                      type="submit"
                    >
                      Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center mt-[30px]">
                <span className="text-[16px] font-[500] mr-[5px]">
                  Không có sản phẩm nào trong giỏ hàng !
                </span>
                <button
                  className="p-[10px] w-[10%] text-[14px] uppercase
                font-[500] duration-[0.5s] text-white hover:text-black bg-green-600 rounded-[3px]"
                  onClick={() => navigate("/trang-chu")}
                >
                  Trang chủ
                </button>
              </div>
            </>
          )}
        </div>
        {/* cuoi giao dien */}
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
};

export default CheckOut;

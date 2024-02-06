import React, { useEffect, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { ScrollMenu } from "../jsAnimation/animation";
import { useNavigate } from "react-router-dom";
import LogOutGoogle from "../login/logOutOther/logOutGoogle";
import LogOutFacebook from "../login/logOutOther/logOutFacebook";
import { Cookies } from "react-cookie";
import { getByUser, logOUT, refreshTK } from "../../action/users";
import { getByIdUserOther } from "../../action/usersOther";

const Menu = () => {
  const [openMenuU, setOpenMenuU] = useState(false);
  const [openCartMini, setOpenCartMini] = useState(false);
  const [search, setSearch] = useState(
    "" || window.localStorage.getItem("search")
  );
  const nagivate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user")) || ""
  );
  const check = window.sessionStorage.getItem("lg");

  const cookie = new Cookies();
  const navigate = useNavigate();

  const [idUserOther, setIdUserOther] = useState("");

  const images =
    "https://banner2.cleanpng.com/20180811/oy/kisspng-computer-icons-clip-art-user-profile-image-member-svg-png-icon-free-download-288552-onli-5b6f6bc83d0489.8542259415340287442499.jpg";

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // ham
  const openMenuUser = () => {
    setOpenMenuU((i) => !i);
  };

  const openCMini = () => {
    setOpenCartMini((i) => !i);
  };

  const fcSearch = () => {
    window.localStorage.setItem("search", search);
  };

  //get userOne
  const fcUser = async () => {
    const user = await getByUser();
    if (user) {
      setName(user.name);
      if (user.image === "") setImage(images);
    }
  };

  //rf token
  const fcRefreshToken = async () => {
    const rfTK = cookie.get("refresh_token");

    if (rfTK) {
      const token = await refreshTK({ rfTK });
      if (token) {
        cookie.set("access_token", token);
      }
    }
  };

  //lgOut;
  const logOuts = async () => {
    const refreshTks = cookie.get("refresh_token");
    await logOUT({ refreshTks });
    cookie.remove("refresh_token");
    cookie.remove("access_token");
    window.localStorage.removeItem("lg");
    navigate("/dang-nhap");
  };

  //user other
  const getIdUserOther = async () => {
    const localId = user.localId;
    const data = await getByIdUserOther(localId);

    if (data) setIdUserOther(data._id);
  };

  useEffect(() => {
    //menu scroll
    ScrollMenu();

    const token = cookie.get("access_token");

    if (token) {
      fcUser();
      setInterval(() => {
        fcRefreshToken();
      }, 10000);
    }

    getIdUserOther();
  }, []);

  return (
    <div className="w-[100%] p-1 h-[100px] flex" id="menu">
      {/* logo */}
      <div className="cursor-pointer flex  items-center">
        <span onClick={() => nagivate("/trang-chu")}>
          <img src="https://htmldemo.net/pustok/pustok/image/logo.png" />
        </span>
      </div>
      {/* tim kiem */}
      <div className="flex items-center w-[700px]  pl-[180px]">
        <form className="w-[100%]">
          <input
            className="p-3 rounded-[4px] outline-none w-[50%] border-t-[2px] border-b-[2px] 
            border-l-[2px] border-gray-300"
            placeholder="Tìm kiếm sách ở đây"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className=" border-green-600 border-t-[2px] border-b-[2px] border-r-[2px]
           bg-green-600 text-white p-3 rounded-[4px] text-[16px]
           hover:bg-green-700 duration-[0.5s] hover:border-green-700"
            onClick={fcSearch}
          >
            Tìm kiếm
          </button>
        </form>
      </div>
      {/* giao dien tai khoan */}
      <div
        className="flex  items-center pl-[10px] w-[190px]  cursor-pointer relavite
      duration-[0.6s]"
        onClick={openMenuUser}
      >
        <span>
          <img
            className="w-[45px] rounded-[50%] color-white"
            src={user.photoUrl || image}
          />
        </span>
        <div className=" flex flex-col items-center ml-[5px]">
          <span className="text-[16px] font-bold">Xin chào</span>
          <p className="text-[12px] text-medium">{user.displayName || name}</p>
        </div>
        {/* giao dien menu nguoi dung */}
        <div
          className={`bg-white border-gray-200 border-[1px] absolute p-2
          before:content-[''] before:w-[20px] before:h-[20px]
        before:bg-white before:absolute before:top-[-6.3%] before:rotate-45
        before:border-gray-200 before:border-t-[2px] before:border-l-[2px] 
        top-[13%]
        ${
          openMenuU
            ? `visible opacity-100  animate-menuMiniTop`
            : "invisible opacity-0 animate-menuMiniDown duration-[0.5s]"
        }
        before:left-[10%] shadow-md  
       `}
          id="menuMiniUser"
        >
          <ul className="p-3">
            <li className="flex hover:opacity-[0.4] duration-[0.5s] cursor-pointer">
              <span className="p-[2px] pr-[6px]">
                <FaUser size="14px" />
              </span>
              <span
                className="text-[13px] font-bold border-gray-200 border-b-[2px] pb-[10px]
                "
              >
                Thông tin tài khoản
              </span>
            </li>
            <li className="mt-[20px] flex hover:opacity-[0.4] duration-[0.5s] cursor-pointer">
              <span className="p-[2px] pr-[6px]">
                <FaHeart size="14px" />
              </span>
              <span
                className="text-[13px] font-bold border-gray-200 border-b-[2px] pb-[10px]
                "
                onClick={() =>
                  nagivate("/danh-sach-yeu-thich", { state: { idUserOther } })
                }
              >
                Danh sách yêu thích
              </span>
            </li>
          </ul>
          {check === "LoginFB" ? (
            <div>
              <LogOutFacebook />
            </div>
          ) : check === "LoginGG" ? (
            <div>
              <LogOutGoogle />
            </div>
          ) : (
            <button
              className="bg-green-600 p-[12px] text-white font-medium text-[13px] rounded-[3px]
          mt-[10px]  duration-[0.5s] hover:text-black w-[120px] flex items-center justify-center"
              onClick={logOuts}
            >
              <span>Đăng xuất</span>
              <span className="pl-[4px]">
                <IoLogOutOutline size="14px" />
              </span>
            </button>
          )}
        </div>
      </div>
      {/* gio hang */}
      <div
        className=" flex items-center cursor-pointer w-[260px]  ml-[30px] relavite "
        onClick={openCMini}
      >
        <span>
          <BsCartCheck size="50px" className="text-green-600 p-1" />
        </span>
        <div className="p-2">
          <h4 className="text-black text-[22px]">Giỏ hàng</h4>
          <p className="flex text-green-600 font-bold text-[16px] items-center">
            10.000 đ
            <span className="text-black pl-[10px]">
              <FaChevronDown size="12px" />
            </span>
          </p>
        </div>
        <span
          className="w-[30px] h-[30px] flex items-center justify-center
        rounded-[100%] bg-red-600 text-white text-[12px] font-medium"
        >
          1
        </span>
        {/* gio hang mini */}
        <div
          className={`${
            openCartMini
              ? " bg-white visible opacity-100 animate-menuMiniTop"
              : "invisible opacity-0 animate-menuMiniDown duration-[0.5s]"
          } top-[14%] absolute right-[10%] shadow-md 
          after:content-[''] after:h-[20px] after:w-[20px] after:bg-white
          after:absolute after:top-[-6%] after:right-[20%] after:rotate-45
          after:border-gray-200 after:border-l-[2px] after:border-t-[2px]
          border-gray-200 border-[2px] `}
          id="cartMini"
        >
          {/* thong tin sach dat */}
          <div className="flex p-6 pb-[10px] border-b-[2px]  border-gray-200">
            <span>
              <a href="#">
                <span>
                  <img
                    src="https://htmldemo.net/pustok/pustok/image/products/cart-product-1.jpg"
                    className="w-[80px]"
                  />
                </span>
              </a>
            </span>
            {/* ten */}
            <div className="flex flex-col">
              <a href="#">
                <p className="text-[14px] font-medium hover:text-green-600 duration-[0.5s] pl-[3%]">
                  Kodak PIXPRO Astro Zoom AZ421 16 MP
                </p>
              </a>
              {/* gia so luong */}
              <div className="pl-[3%] pt-[2%]">
                <span>
                  1 x
                  <span className="text-[20px] text-green-600 font-bold pl-[5px]">
                    10.000 đ
                  </span>
                </span>
              </div>
            </div>
            {/* xoa */}
            <span
              className="w-[20px] h-[20px] bg-gray-400 text-white flex items-center justify-center 
            rounded-[3px] hover:opacity-[0.4] duration-[0.5s] hover:text-black
            mt-[16%]"
            >
              <IoClose size="14px" />
            </span>
          </div>
          {/* xem gio va dat hang */}
          <div className="flex justify-center p-4">
            <span
              className="flex items-center justify-center font-bold pr-[10%]
            hover:text-green-600 duration-[0.5s]"
              onClick={() => nagivate("/gio-hang")}
            >
              Xem giỏ hàng
              <span>
                <MdNavigateNext size="24px" />
              </span>
            </span>
            <span
              className="p-3 w-[140px] flex items-center justify-center
              bg-green-600 text-white text-[16px] font-medium rounded-[5px]
            hover:bg-black duration-[0.5s]"
              onClick={() => nagivate("/thu-tuc-dat-hang")}
            >
              Đặt mua
              <span>
                <MdNavigateNext size="24px" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

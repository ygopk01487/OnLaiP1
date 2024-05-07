import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const MenuAccountDetail = () => {
  const navigate = useNavigate();

  const [check, setCheck] = useState(window.localStorage.getItem("active"));

  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user")) || ""
  );

  //function
  const getAcount = (name) => {
    navigate("/tai-khoan-cua-toi", { state: { localId: user.localId } }),
      JSON.stringify(window.localStorage.setItem("active", name));
    setCheck(window.localStorage.getItem("active"));
  };

  const getOrder = (name) => {
    navigate("/danh-sach-dat-hang"),
      JSON.stringify(window.localStorage.setItem("active", name));
    setCheck(window.localStorage.getItem("active"));
  };

  return (
    <div className="w-[20%]">
      <ul>
        <li
          className={`menu-my-account ${
            check === window.location.pathname.replace("/", "") &&
            window.location.pathname.replace("/", "") === "tai-khoan-cua-toi"
              ? "active"
              : ""
          }
          
      `}
          onClick={() => getAcount("tai-khoan-cua-toi")}
        >
          <span className="pr-[8px]">
            <FaUser size="14px" />
          </span>
          <span className="">Thông tin tài khoản</span>
        </li>
        <li
          className={`menu-my-account ${
            window.localStorage.getItem("active") ===
              window.location.pathname.replace("/", "") &&
            window.location.pathname.replace("/", "") === "danh-sach-dat-hang"
              ? "active"
              : ""
          }
             `}
          onClick={() => getOrder("danh-sach-dat-hang")}
        >
          <span className="pr-[8px]">
            <RiBillFill size="14px" />
          </span>
          <span>Đơn đã đặt</span>
        </li>
        <li className="menu-my-account">
          <span className="pr-[8px]">
            <MdLogout size="14px" />
          </span>
          <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
};

export default MenuAccountDetail;

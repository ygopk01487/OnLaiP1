import React, { useEffect, useState } from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdOutlineNavigateNext } from "react-icons/md";
import MenuAccountDetail from "./menuAccountDetail";
import { useLocation } from "react-router-dom";
import { getByUser } from "../../action/users";
import { getByIdUserOther } from "../../action/usersOther";

const AccountDetail = () => {
  const location = useLocation();

  const { localId } = location.state;

  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  //function
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

  //get user detail

  const getUserDetails = async () => {
    let data;

    const checkUserOther = JSON.parse(window.sessionStorage.getItem("user"));

    if (!checkUserOther) {
      data = await getByUser();
      if (data) {
        setDataUser({
          ...dataUser,
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ")[data.name.split(" ").length - 1],
          email: data.email,
          image: data.image,
        });
      }
    } else {
      data = await getByIdUserOther(localId);
      if (data) {
        setDataUser({
          ...dataUser,
          firstName: data.name.split(" ")[0],
          lastName: data.name.split(" ")[data.name.split(" ").length - 1],
          email: data.email,
          image: data.image,
        });
      }
    }
  };

  useEffect(() => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));

    if (!userOther) {
      setInterval(() => {
        fcRefreshToken();
      }, 10000);
    }

    getUserDetails();
  }, []);

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
            <span>Tải khoản của tôi</span>
          </div>
          {/* than */}
          <div className="w-[100%] mt-[30px] flex justify-between">
            {/* menu */}
            <MenuAccountDetail />
            {/* giao dien */}
            <div className="w-[70%] pb-[3%] border-[2px] border-gray-200 rounded-[3px]">
              <div className="p-[20px]">
                <h1
                  className="border-b-[2px] border-gray-200 p-[10px]
                text-[18px] font-[400]"
                >
                  Thông tin tải khoản
                </h1>
              </div>
              <div className="w-[100%] pl-[20px] pt-[5px]">
                <form className="w-[100%] flex justify-between">
                  <div className="flex flex-col w-[100%]">
                    <div className="flex justify-between">
                      <input
                        className="input-my-account
                    "
                        type="text"
                        value={dataUser.firstName}
                        disabled="disabled"
                      />
                      <input
                        className="input-my-account"
                        type="text"
                        value={dataUser.lastName}
                        disabled="disabled"
                      />
                    </div>
                    <input
                      className="input-my-account"
                      type="text"
                      value={dataUser.email}
                      disabled="disabled"
                    />
                    {/* <h3
                      className=" p-[10px]
                text-[18px] font-[400] mb-[10px]"
                    >
                      Mật khẩu
                    </h3>
                    <input
                      className="input-my-account"
                      type="password"
                      placeholder="Mật khẩu"
                    /> */}
                    <button
                      className="p-[10px] w-[24%] bg-green-600 text-white duration-[0.5s]
                    uppercase rounded-[3px] mt-[10px] text-[13px] font-[500] hover:bg-black pointer-events-none"
                    >
                      Lưu
                    </button>
                  </div>
                  <div className="w-[100%] ml-[200px]">
                    <span>
                      <img className="w-[100px]" src={dataUser.image} />
                    </span>
                    <input
                      type="file"
                      className="file:rounded-[20px] file:border-[0px] file:p-[9px] file:bg-green-600
                      file:text-white file:w-[40%] file:cursor-pointer file:text-[14px] file:font-[500] file:mt-[20px]
                      file:duration-[0.5s] hover:file:bg-black"
                      disabled="disabled"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AccountDetail;

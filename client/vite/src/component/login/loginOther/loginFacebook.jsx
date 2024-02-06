import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, providerFB } from "../../../firebase/firebaseConfig";
import { Cookies } from "react-cookie";
import { addUserOthers } from "../../../action/usersOther";

const LoginFacebook = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const responseFacebook = async () => {
    try {
      const res = await signInWithPopup(auth, providerFB);
      if (res) {
        cookies.set("fb_access_token", res.user.accessToken);
        window.sessionStorage.setItem("lg", "LoginFB");
        window.sessionStorage.setItem(
          "user",
          JSON.stringify(res.user.reloadUserInfo)
        );
        await addUserOthers(res.user.reloadUserInfo);
        navigate("/trang-chu");
      }
    } catch (error) {
      console.log("login facebook fail");
    }
  };

  return (
    <div
      className="text-[14px] text-gray-300 
    w-[280px] h-[50px] bg-blue-800 mt-[10px] shadow-2xl
    rounded-[30px] flex justify-center items-center cursor-pointer"
      onClick={responseFacebook}
    >
      <span>
        <FaFacebookF size="18px" />
      </span>
      <h3 className="pl-[8px]">Đăng nhập bằng Facebook</h3>
    </div>
  );
};

export default LoginFacebook;

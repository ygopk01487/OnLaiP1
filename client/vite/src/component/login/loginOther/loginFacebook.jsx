import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, providerFB } from "../../../firebase/firebaseConfig";
import { Cookies } from "react-cookie";

const LoginFacebook = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [loginFB, setLoginFB] = useState("LoginFB");

  const responseFacebook = async () => {
    try {
      const res = await signInWithPopup(auth, providerFB);
      cookies.set("fb_access_token", res.user.accessToken);
      navigate("/trang-chu", {
        state: { name: res.user.displayName, login: loginFB },
      });
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

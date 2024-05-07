import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { auth, providerGG } from "../../../firebase/firebaseConfig";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { Cookies } from "react-cookie";
import { addUserOthers } from "../../../action/usersOther";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const [loginGG, setLoginGG] = useState("LoginGG");
  const cookies = new Cookies();

  const responseGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, providerGG);

      if (res) {
        cookies.set("gg_access_token", res.user.accessToken);
        window.sessionStorage.setItem("lg", "LoginGG");
        window.sessionStorage.setItem(
          "user",
          JSON.stringify(res.user.reloadUserInfo)
        );
        await addUserOthers(res.user.reloadUserInfo);
        navigate("/trang-chu");
        window.location.reload();
      }
    } catch (error) {
      console.log("login google fail");
    }
  };

  return (
    <div
      className="text-[14px] text-gray-300 
  w-[280px] h-[50px] bg-gray-500 mt-[10px] shadow-2xl
  rounded-[30px] flex justify-center items-center cursor-pointer"
      onClick={responseGoogle}
    >
      <span>
        <FaGoogle size="18px" />
      </span>
      <h3 className="pl-[8px]">Đăng nhập bằng Google</h3>
    </div>
  );
};

export default LoginGoogle;

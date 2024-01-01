import React, { useEffect, useState } from "react";
import { getByUser, logOUT, refreshTK } from "../../action/users";
import { Cookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LogOutGoogle from "../login/logOutOther/logOutGoogle";
import LogOutFacebook from "../login/logOutOther/logOutFacebook";
import Menu from "../nvabar/menu";
import HomeSection from "../HomeSection/HomeSection";
import Slider from "../slider/Slider";
import Footer from "../footer/Footer";
import BackToTop from "../backToTop/BackToTop";

const Home = () => {
  // const [name, setName] = useState("");

  // const navigate = useNavigate();

  // const location = useLocation();

  // const checkLogin = location.state.login;

  // const cookies = new Cookies();

  // let check = false;

  // const users = async () => {
  //   const user = await getByUser();
  //   setName(user.name);
  // };

  // const refresh = async () => {
  //   const rfToken = cookies.get("refresh_token");
  //   if (rfToken) {
  //     const token = await refreshTK({ rfToken });
  //     if (token) {
  //       cookies.set("access_token", token);
  //     }
  //   }
  // };

  // const logOut = async () => {
  //   const refreshTks = cookies.get("refresh_token");
  //   await logOUT({ refreshTks });
  //   cookies.remove("refresh_token");
  //   cookies.remove("access_token");
  //   navigate("/dang-nhap");
  // };

  // useEffect(() => {
  //   const token = cookies.get("access_token");

  //   if (location.state) {
  //     const user = location.state;
  //     setName(user.name);
  //   }

  //   if (token) {
  //     users();
  //     setInterval(() => {
  //       if (!check) {
  //         refresh();
  //       }
  //     }, 10000);
  //   }
  // }, []);

  return (
    <>
      <div className="w-full ">
        {/* dau` giao dien */}
        <div className="w-[1200px] m-auto ">
          {/* menu */}
          <Menu />
          <Slider />
          {/* Than giao dien */}
          <HomeSection />
          {/* cuoi giao dien */}
          <Footer />
          <BackToTop />
        </div>
      </div>
      {/* <div>Hello {name}</div>
      {checkLogin === "Login" && <button onClick={logOut}>dang xuat</button>}
      {checkLogin === "LoginGG" && (
        <div>
          <LogOutGoogle />
        </div>
      )}
      {checkLogin === "LoginFB" && (
        <div>
          <LogOutFacebook />
        </div>
      )} */}
    </>
  );
};

export default Home;

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
import Loading from "../loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

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

  //   if (token) {
  //     users();
  //     setInterval(() => {
  //       if (!check) {
  //         refresh();
  //       }
  //     }, 10000);
  //   }
  // }, []);
  const loadingPage = () => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };
  useEffect(() => {
    loadingPage();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
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

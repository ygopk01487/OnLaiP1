import React, { useEffect, useState } from "react";
import Menu from "../nvabar/menu";
import HomeSection from "../HomeSection/HomeSection";
import Slider from "../slider/Slider";
import Footer from "../footer/Footer";
import BackToTop from "../backToTop/BackToTop";
import Loading from "../loading/Loading";

const Home = () => {
  const [loading, setLoading] = useState(true);

  const [test, setTest] = useState(
    "" || JSON.stringify(window.localStorage.getItem("IdPC"))
  );

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
            <Menu test={test} />
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

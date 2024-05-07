import SingIn from "./component/login/singIn";
import "./App.css";
import SignUpOne from "./component/login/signUpOne";
import SingUpTwo from "./component/login/singUpTwo";
import Otp from "./component/otp/Otp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ForgetPass from "./component/login/forgetPass";
import { useEffect, useState } from "react";
import Home from "./component/Home/Home";
import Loading from "./component/loading/Loading";
import ListLove from "./component/listLove/ListLove";
import Carts from "./component/cart/Carts";
import CheckOut from "./component/checkOut/CheckOut";
import ProductDetail from "./component/productDetail/ProductDetail";
import HomeDash from "./component/dashboard/home/homeDash";
import ProductsDash from "./component/dashboard/productsDash/ProductsDash";
import AccountDetail from "./component/accountDetail/AccountDetail";
import ProtectRouters from "./component/protectRouters/protectRouters";
import OrderProducts from "./component/orderProducts/orderProducts";
import OrderComplete from "./component/orderComplete/orderComplete";

function App() {
  const [checkLogin, setCheckLogin] = useState(
    "" || window.sessionStorage.getItem("lg")
  );

  useEffect(() => {
    setCheckLogin(window.sessionStorage.getItem("lg"));
  }, [window.location.pathname]);

  return (
    <BrowserRouter>
      {/* <ProtectRouters> */}
      <Routes>
        <Route
          exact
          path="/dang-nhap"
          element={!checkLogin ? <SingIn /> : <Navigate to="/" />}
        />
        <Route path="/" element={<Navigate to="/trang-chu" />} />
        <Route path="/dang-ky-tai-khoan" element={<SignUpOne />} />
        <Route path="/xac-minh" element={<Otp />} />
        <Route path="/dang-ky-mat-khau" element={<SingUpTwo />} />
        <Route path="/doi-mat-khau" element={<SingUpTwo />} />
        <Route path="/quen-mat-khau" element={<ForgetPass />} />
        <Route
          path="/trang-chu"
          element={checkLogin ? <Home /> : <Navigate to="/dang-nhap" />}
        />
        <Route
          path="/danh-sach-yeu-thich"
          element={checkLogin ? <ListLove /> : <Navigate to="/dang-nhap" />}
        />
        <Route path="/gio-hang" element={<Carts />} />
        <Route
          path="/thu-tuc-dat-hang"
          element={checkLogin ? <CheckOut /> : <Navigate to="/dang-nhap" />}
        />
        <Route
          path="/san-pham-chi-tiet"
          element={
            checkLogin ? <ProductDetail /> : <Navigate to="/dang-nhap" />
          }
        />
        {/* <Route path="/trang-chu-admin" element={<HomeDash />} />
        <Route path="/bang-san-pham" element={<ProductsDash />} /> */}
        <Route
          path="/tai-khoan-cua-toi"
          element={
            checkLogin ? <AccountDetail /> : <Navigate to="/dang-nhap" />
          }
        />
        <Route
          path="/danh-sach-dat-hang"
          element={
            checkLogin ? <OrderProducts /> : <Navigate to="/dang-nhap" />
          }
        />
          <Route
          path="/dat-hang-thanh-cong"
          element={
            checkLogin ? <OrderComplete /> : <Navigate to="/dang-nhap" />
          }
        />
      </Routes>
      {/* </ProtectRouters> */}
    </BrowserRouter>
  );
}

export default App;

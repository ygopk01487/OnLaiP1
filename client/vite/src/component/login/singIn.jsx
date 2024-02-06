import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillLock } from "react-icons/ai";
import { BsKeyFill } from "react-icons/bs";
import InputForm from "../inputForm/InputForm";
import IconEyes from "./IconEyes";
import { useNavigate } from "react-router-dom";
import { singIns } from "../../action/users";
import { Cookies } from "react-cookie";
import LoginGoogle from "./loginOther/loginGoogle";
import LoginFacebook from "./loginOther/loginFacebook";
import TextValidateForm from "./textValidateForm";
import Loading from "../loading/Loading";
import Toast from "../toast/Toast";
import { closeToast, showToast } from "../toast/ShowToast";

const SingIn = () => {
  const [showPass, setShowPass] = useState(false);

  const [data, setData] = useState({ email: "", password: "" });

  const [login, setLogin] = useState("Login");

  const [textCheck, setTextCheck] = useState("");
  const [passCheck, setPassCheck] = useState("");

  const [loading, setLoading] = useState(true);

  const [showToasts, setShowToasts] = useState(false);
  const [mess, setMess] = useState("");
  const [checkToast, setCheckToast] = useState(false);

  const navigate = useNavigate();

  const cookies = new Cookies();

  //function
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let checkVali = false;
    const { emailVali, passVali } = checkInput();

    if (emailVali === false) clearTextCheck({ emailVali });

    if (passVali === false) clearTextCheck({ passVali });

    if (emailVali === false && passVali === false) checkVali = true;

    if (checkVali === true) {
      const datas = await singIns({ data });
      if (datas) {
        cookies.set("access_token", datas.accessToken);
        cookies.set("refresh_token", datas.refreshToken);
        window.sessionStorage.setItem("lg", "Login");
        navigate("/trang-chu", { state: { login } });
        alert("Thanh cong");
      } else {
        setCheckToast(false);
        setShowToasts(true);
        setMess("Tài khoản không đúng");
      }
    }
    loadingPage();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const goToSignUp = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    setLoading(false);
    if (loading === false) {
      navigate("/dang-ky-tai-khoan");
    }
  };

  const goToForgetPass = () => {
    setLoading(true);
    navigate("/quen-mat-khau");
    // setLoading(false);
  };

  const showPasswords = () => {
    setShowPass((e) => !e);
  };

  const checkInput = () => {
    let passVali = false;
    let emailVali = false;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //email
    if (data.email.trim() === "") {
      setTextCheck("Ten ko duoc de trong");
      emailVali = true;
    } else if (data.email.trim().length < 5) {
      setTextCheck("Ten qua ngan");
      emailVali = true;
    } else if (!regexEmail.test(data.email.trim())) {
      setTextCheck("Ko dung dinh dang email");
      emailVali = true;
    }

    //pass
    if (data.password.trim() === "") {
      setPassCheck("mat khau ko dc de trong");
      passVali = true;
    } else if (data.password.trim().length < 3) {
      setPassCheck("Mat khau qua ngan");
      passVali = true;
    }

    return { passVali, emailVali };
  };

  //clear text validate
  const clearTextCheck = ({ emailVali, passVali }) => {
    if (passVali === false) {
      setPassCheck("");
    }
    if (emailVali === false) {
      setTextCheck("");
    }
  };

  //loading
  const loadingPage = () => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (loading === false) {
      if (showToasts === true) {
        showToast();
        setTimeout(() => {
          closeToast();
        }, 2000);
        setShowToasts(false);
      }
    }
  }, [submit]);

  useEffect(() => {
    loadingPage();
  }, []);

  return (
    <>
      <Toast mess={mess} checkToast={checkToast} />
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white w-[700px] h-[500px] m-auto rounded-md mt-[50px] shadow-lg">
          <div className="grid grid-cols-2 h-[100%] w-[100%]">
            <div className="flex items-center justify-center h-[100%]">
              <span className="bg-slate-200 rounded-[100px] p-10">
                <FaUserAlt size="130px" className="text-white" />
              </span>
            </div>
            <div className="flex justify-center flex-col">
              <h1 className="text-[20px] font-bold uppercase text-center p-2">
                Đăng nhập
              </h1>
              <div className="w-[100%] flex flex-col">
                <form className="w-[100%]  flex flex-col items-center">
                  <div className="w-[85%] p-3 relative">
                    <InputForm
                      type="text"
                      pla="Email"
                      name="email"
                      onChang={handleChange}
                    />
                    <span className="icon-input-login">
                      <AiOutlineMail size="15px" />
                    </span>
                  </div>
                  <TextValidateForm textCheck={textCheck} />
                  <div className="w-[85%] p-3 relative">
                    <InputForm
                      type={`${!showPass ? "password" : "text"}`}
                      pla="Mật khẩu"
                      name="password"
                      onChang={handleChange}
                    />
                    <span className="icon-input-login">
                      <AiFillLock size="15px" />
                    </span>
                    <IconEyes
                      showPass={showPass}
                      showPassword={showPasswords}
                      styles="absolute right-[8%] bottom-[37%] cursor-pointer"
                    />
                  </div>
                  <TextValidateForm textCheck={passCheck} />
                  <button
                    className="bg-green-600 text-[16px] w-[80%] p-3 rounded-[30px] uppercase text-white mt-[15px]
              hover:bg-green-700 hover:text-black font-medium duration-300"
                    type="submit"
                    onClick={submit}
                  >
                    Đăng nhập
                  </button>
                  <span className="text-[12px] p-2 font-medium">Hoặc</span>
                  <div>
                    <LoginGoogle />
                    <LoginFacebook />
                  </div>
                </form>
                {/* quen mat khau */}
                <div className="p-2">
                  <h4 className="text-forget-pass" onClick={goToForgetPass}>
                    Quên mật khẩu?
                  </h4>
                  <div className="p-0 flex justify-center items-center group">
                    <h4 className="text-forget-pass " onClick={goToSignUp}>
                      Tạo tài khoản mới
                    </h4>
                    <span>
                      <BsKeyFill
                        className="text-slate-400 group-hover:text-slate-600"
                        size="13px"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingIn;

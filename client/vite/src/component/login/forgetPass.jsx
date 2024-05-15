import React, { useEffect, useState } from "react";
import InputForm from "../inputForm/InputForm";
import { AiOutlineMail } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { GrFormPreviousLink } from "react-icons/gr";
import { sendMailss } from "../../action/sendMail";
import Loading from "../loading/Loading";
import TextValidateForm from "./textValidateForm";
import { checkEmailsss } from "../../action/users";
import Toast from "../toast/Toast";
import { closeToast, showToast } from "../toast/ShowToast";

const ForgetPass = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [email, setEmail] = useState({ email: "" });

  const [loading, setLoading] = useState(true);

  const [textVali, setTextVali] = useState("");

  const [showToasts, setShowToasts] = useState(false);
  const [mess, setMess] = useState("");
  const [checkToast, setCheckToast] = useState(false);

  //function
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let valiForm = false;
    let { emailV } = validateForm();

    if (emailV === false) {
      valiForm = true;
      clearTextVali({ emailV });
    } else {
      valiForm = false;
      clearTextVali({ emailV });
    }

    if (valiForm === true) {
      //check mail
      const emails = await checkEmailsss({ email: email.email });
      if (emails.success === false) {
        setCheckToast(false);
        setShowToasts(true);
        setMess("Mail không đúng");
      } else {
        const send = await sendMailss(email);
        if (send) {
          goToOTP({ email });
          setLoading(false);
        }
      }
    }
    loadingPage();
  };

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };
  console.log(email);

  const toBackSignIn = () => navigate("/dang-nhap");

  const goToOTP = ({ email }) => {
    if (localStorage.getItem("counts")) {
      localStorage.removeItem("counts");
    }
    localStorage.setItem("counts", 2);
    navigate("/xac-minh", {
      state: { url: location.pathname, email },
    });
  };

  const validateForm = () => {
    let emailV = "";
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (email.email.trim() === "") {
      setTextVali("Email ko được bỏ trống");
      emailV = true;
    } else if (!regexEmail.test(email.email)) {
      setTextVali("Không đúng định dạng mail");
      emailV = true;
    } else {
      setTextVali("");
      emailV = false;
    }
    return { emailV };
  };

  const clearTextVali = ({ emailV }) => {
    if (emailV === false) {
      setTextVali("");
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
      <Toast checkToast={checkToast} mess={mess} />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-[400px] shadow-2xl m-auto flex flex-col  items-center mt-[50px] p-2">
          <h1 className="text-center text-[20px] font-bold uppercase pb-[5px]">
            Quên mật khẩu
          </h1>
          <h3 className="text-[12px] font-semibold pb-[10px]">
            ( Bước 1: nhập email)
          </h3>
          <div className="w-[100%]  flex justify-center items-center">
            <form className="w-[100%] flex flex-col items-center">
              <div className="w-[80%] relative">
                <InputForm
                  type="text"
                  pla="Email"
                  name="email"
                  onChang={handleChange}
                />
                <span className="absolute left-[15px] top-[18px]">
                  <AiOutlineMail size="15px" />
                </span>
              </div>
              <TextValidateForm textCheck={textVali} />
              <div className="flex justify-center items-center group">
                <span>
                  <GrFormPreviousLink className="text-red cursor-pointer text-scale-400 group-hover:text-scale-600 duration-500" />
                </span>
                <h4 className="text-forget-pass " onClick={toBackSignIn}>
                  Quay lại đăng nhập ?
                </h4>
              </div>
              <button
                className="w-[150px] bg-green-500 p-3 mt-[5px] text-[16px] font-medium hover:bg-green-700
          duration-300 hover:text-white rounded-[10px]"
                onClick={submit}
                type="submit"
              >
                Gửi
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPass;

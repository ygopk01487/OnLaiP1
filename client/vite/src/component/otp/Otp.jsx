import React, { useEffect, useRef, useState } from "react";
import { closeToast, showToast } from "../toast/ShowToast";
import Toast from "../toast/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import { checkOtp, deleteOtp, getOneUserOtp } from "../../action/otp";
import { sendMailss } from "../../action/sendMail";
import Loading from "../loading/Loading";

let numberOTP = 0;

const Otp = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [activeOTP, setActiveOTP] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state;

  const [datas, setDatas] = useState({ name: "", email: "" });
  const [count, setCount] = useState(localStorage.getItem("counts"));

  const inputRef = useRef(null);

  const [showToasts, setShowToasts] = useState(false);

  const [checkCount, setCheckCount] = useState(false);

  const [loading, setLoading] = useState(true);

  const [mess, setMess] = useState("");
  const [checkToast, setCheckToast] = useState(false);

  //function
  const handleChange = (e, i) => {
    const { value } = e.target;

    if (isNaN(value)) return false;

    const newOTP = [...otp];
    newOTP[numberOTP] = value.substring(value.length - 1);

    if (!value) setActiveOTP(numberOTP - 1);
    else setActiveOTP(numberOTP + 1);

    setOtp(newOTP);
    setDatas({
      name: user.name,
      email: user.email,
    });
  };

  const handleKeyDown = (e, i) => {
    numberOTP = i;
    if (e.key === "Backspace") {
      setActiveOTP(numberOTP - 1);
    }
  };

  //deleteOTP
  const deleteOTP = async () => {
    const id = await getOneUserOtp(
      user.url === "/quen-mat-khau" ? user.email.email : user.email
    );

    const mess = await deleteOtp(id);
    return mess;
  };

  const checkOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await checkOtp({
      otp: otp.join(""),
      email: user.url === "/quen-mat-khau" ? user.email.email : user.email,
    });

    if (data.OTP === false) {
      setShowToasts(true);
      setCheckToast(false);
      if (count > 0) {
        setCount(count - 1);
        setMess(`Nhập sai quá ${count} lần. Mã sẽ hết hạn !`);
      } else if (count === 0) {
        deleteOTP();

        if (mess) {
          setCount(0);
          localStorage.setItem("counts", count);
          setMess(mess);
        }
      }
    } else {
      if (user.url === "/quen-mat-khau") {
        deleteOTP()
        navigate("/doi-mat-khau", { state: user.email.email });
      } else {
        deleteOTP()
        navigate("/dang-ky-mat-khau", { state: datas });
      }
    }
    loadingPage();
  };

  const sendMails = async () => {
    await sendMailss(user.email);
    setLoading(true);
    setShowToasts(true);
    setCheckToast(true);
    setMess("Vui lòng vào mail để nhận mã");
    localStorage.setItem("counts", 2);
    setCheckCount(true);
    clearInputOPT();
    loadingPage();
  };

  useEffect(() => {
    //input next focus
    inputRef.current?.focus();
  }, [activeOTP]);

  useEffect(() => {
    if (loading === false) {
      if (showToasts === true) {
        showToast();
        setTimeout(() => {
          closeToast();
          if (checkCount === true) {
            localStorage.setItem("counts", 2);
            setCount(localStorage.getItem("counts"));
            setCheckCount(false);
          } else {
            localStorage.setItem("counts", count);
          }
          setShowToasts(false);
        }, 2000);
      }
    }
  }, [checkOTP]);

  //clear input otp
  const clearInputOPT = () => {
    setOtp(new Array(4).fill(""));
  };

  //loading
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
      <Toast mess={mess} checkToast={checkToast} style="top-[10%]" />
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white w-[400px]  m-auto mt-[40px] rounded-[10px] shadow-2xl pb-[10px]">
          <h1 className="text-[20px] uppercase font-bold text-center pt-[20px]">
            Xác minh Otp
          </h1>
          <h3 className="text-center text-[12px] font-normal">
            ( Vui lòng vào gmail hoặc email để lấy mã )
          </h3>
          {/* form input otp */}
          <div className="w-[100%]">
            <form className="w-[100%] flex items-center p-2 flex-col">
              <div className="w-[100%] flex flex-row items-center justify-around gap-[20px] p-2">
                {otp.map((data, i) => {
                  return (
                    <input
                      ref={activeOTP === i ? inputRef : null}
                      key={i}
                      value={otp[i]}
                      type="number"
                      onChange={(e) => handleChange(e, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className="w-[20%] p-4 outline-none text-center uppercase text-black font-bold
            text-[19px]
          input-inner-outer-type-number rounded-[5px] bg-slate-200 border-[2px] focus:border-black "
                    />
                  );
                })}
              </div>
              <h3
                className="cursor-pointer text-[12px] font-semibold p-[8px] underline"
                onClick={sendMails}
              >
                Gửi lại mã?
              </h3>
              <button
                className={`hover:bg-green-600 duration-300 text-[16px] uppercase w-[60%] p-4 mt-[10px]
        rounded-[20px] font-bold hover:text-white 
        ${
          otp[3] != ""
            ? "pointer-events-auto bg-green-400"
            : "bg-green-100 pointer-events-none text-slate-300"
        } `}
                type="submit"
                onClick={checkOTP}
              >
                Xác minh
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Otp;

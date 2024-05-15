import React, { useEffect, useState } from "react";
import Footer from "../footer/Footer";
import Menu from "../nvabar/menu";
import { MdNavigateNext } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { backToReview } from "../jsAnimation/animation";
import BackToTop from "../backToTop/BackToTop";
import { useLocation } from "react-router-dom";
import { getById } from "../../action/products";
import { getByUser, refreshTK } from "../../action/users";
import { getByIdUserOther } from "../../action/usersOther";
import { addListCart } from "../../action/listCart";
import io from "socket.io-client";

export const socket = io.connect("https://storebook-api.onrender.com");

export const numberFormat = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "VND",
});

import {
  addListLove,
  getByUserLove,
  removeProLove,
} from "../../action/listLove";
import {
  addReview,
  deleteCm,
  editReview,
  getReviewById,
} from "../../action/reviews";
import { FaEllipsisV } from "react-icons/fa";

const ProductDetail = () => {
  const stars = [5, 4, 3, 2, 1];
  const [ac, setAc] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    discount: "",
    category: "",
    describe: "",
    _id: "",
  });
  const number = [1, 2, 3, 4];
  const location = useLocation();
  const id = location.state.id;

  const [numberPro, setNumberPro] = useState(1);

  const [listLoveUser, setListLoveUser] = useState([]);

  const [star, setStar] = useState("");

  const [idListLove, setIdListLove] = useState("");

  const [reviewData, setReviewData] = useState([]);

  const [reviewDataRealTime, setReviewDataRealTime] = useState([]);

  const [openMenuRv, setOpenMenuRv] = useState(false);

  const [comment, setComment] = useState("");

  const [textRv, setTextRv] = useState(false);

  const [idRv, setIdRv] = useState("");

  const [idCm, setIdCm] = useState("");

  const [idUser, setIdUser] = useState("");

  const [idUserOther, setIdUserOther] = useState("");

  const [numberStar, setNumberStar] = useState(0);

  const [placeholder, setPlaceholder] = useState("");

  //check open menu editCm
  const [check, setCheck] = useState("");

  const relativeTime = [
    { second: 1, name: "second", val: 60 },
    { second: 60, name: "minute", val: 60 },
    { second: 60 * 60, name: "hour", val: 24 },
    { second: 60 * 60 * 24, name: "day", val: 7 },
    { second: 60 * 60 * 24 * (365 / 12), name: "month", val: 30 },
    { second: 60 * 60 * 24 * 365, name: "year", val: 12 },
  ];

  const getRelativeTime = (toDate) => {
    const realTime = new Intl.RelativeTimeFormat(undefined, { style: "long" });

    const seconds = Math.floor((new Date() - new Date(toDate)) / 1000);

    for (let i = 0; i < relativeTime.length; i++) {
      const { second, name, val } = relativeTime[i];
      const duration = Math.abs(seconds) / second;

      if (Math.abs(duration) < val || i === relativeTime.length - 1) {
        return realTime.format(-Math.floor(seconds / second), name);
      }
    }
  };

  //function
  const activeF = () => {
    setAc(false);
    backToReview();
  };
  const activeT = () => setAc(true);

  const getProductById = async () => {
    const data = await getById(id);
    setProduct({
      ...product,
      name: data.name,
      price: data.price,
      discount: data.discount,
      image: data.image,
      describe: data.describe,
      _id: data._id,
    });
  };

  //rf token
  const fcRefreshToken = async () => {
    const rfTK = JSON.parse(window.sessionStorage.getItem("refresh_token"));

    if (rfTK) {
      const token = await refreshTK(rfTK);
      if (token) {
        window.sessionStorage.setItem("access_token", JSON.stringify(token));
      }
    }
  };

  //add cart
  const addCartProDetail = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    let datas;
    const total = (product.price * (100 - product.discount)) / 100;
    const totalPrice = total * numberPro;
    if (!userOther) {
      data = await getByUser();
      if (data) {
        datas = await addListCart(
          data._id,
          null,
          product._id,
          total,
          numberPro,
          totalPrice
        );
      }
    } else {
      data = await getByIdUserOther(userOther.localId);
      datas = await addListCart(
        null,
        data._id,
        product._id,
        total,
        numberPro,
        totalPrice
      );
    }

    if (datas) {
      setNumberPro(1);
      alert("thêm vào giỏ hàng thành công");
      socket.emit("loadCart", data._id);
    } else {
      alert("thêm vào giỏ hành thất bại");
    }
  };

  //check list love
  const getByUserListLoves = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));

    let data;
    let datas;
    if (!userOther) {
      data = await getByUser();
      if (data) {
        setIdUser(data._id);

        datas = await getByUserLove(null, data._id);
      }
    } else {
      data = await getByIdUserOther(userOther.localId);
      if (data) {
        setIdUserOther(data._id);

        datas = await getByUserLove(data._id, null);
      }
    }

    if (datas) {
      setListLoveUser(datas.products);
      setIdListLove(datas._id);
    } else {
      console.log("lay danh sach yeu thich theo user false");
    }
  };

  //add list love
  const addListLoves = async () => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    let datas;
    if (!userOther) {
      data = await getByUser();
      if (data) {
        datas = await addListLove(null, product._id, data._id);
      }
    } else {
      data = await getByIdUserOther(userOther.localId);
      if (data) {
        datas = await addListLove(data._id, product._id, null);
      }
    }

    if (datas) {
      getByUserListLoves();
      alert("thêm danh sách yêu thích thành công");
    } else {
      alert("thêm dánh sách yêu thích thất bại");
    }
  };

  //delete listLove
  const deleteListLoves = async () => {
    const data = await removeProLove(idListLove, product._id);
    if (data) {
      getByUserListLoves();
      alert("Xóa thành công sản phẩm yêu thích");
    } else {
      alert("Xóa thất bại sản phẩm yêu thích");
    }
  };

  //add review
  const addRv = async () => {
    if (star > 0 || comment !== "") {
      const userOther = JSON.parse(window.sessionStorage.getItem("user"));
      let data;
      let datas;
      if (!userOther) {
        data = await getByUser();
        if (data) {
          datas = await addReview(data._id, null, star, comment, product._id);
        }
      } else {
        data = await getByIdUserOther(userOther.localId);
        if (data) {
          datas = await addReview(null, data._id, star, comment, product._id);
        }
      }

      if (datas) {
        setComment("");
        setStar(0);
        setOpenMenuRv(false);
        //comment real time
        socket.emit("comment", datas.review);
      }
    } else {
      alert("Thêm đánh giá sao");
    }
  };

  //edit review
  const editRv = async () => {
    if (star > 0) {
      const data = await editReview(star, comment, idRv, idCm);

      if (data) {
        // getRvById();
        setComment("");
        setStar(0);
        setTextRv(false);
        setOpenMenuRv(false);
        //edit real time
        socket.emit("comment", data.review);
      }
    } else {
      alert("Thêm đánh giá sao hoặc viết bình luận");
    }
  };

  //delete review
  const deleteComment = async (idComment) => {
    const data = await deleteCm(idRv, idComment);
    if (data) {
      // getRvById();

      //delete real time
      socket.emit("comment", data.review);
    }
  };

  //get review by id
  const getRvById = async () => {
    const data = await getReviewById(product._id);
    if (data.reviews !== null) {
      console.log("hello");
      setReviewData(data.reviews.review);
      setIdRv(data.reviews._id);
      setNumberStar(data.numberStar);
    }
  };

  //set edit review
  const setEditRv = (comment, star, idComment) => {
    setTextRv(true);
    setComment(comment);
    setStar(star);
    setIdCm(idComment);
  };

  //set open menu rv
  const setOpenMenuRvs = (idComment) => {
    if (check !== idComment) {
      setCheck(idComment);
      setOpenMenuRv(true);
    } else {
      setOpenMenuRv((e) => !e);
    }
    setIdCm(idComment);
  };

  //typing placeholder comment
  // const typingPlaceholder = () => {
  //   const text = "Nhập bình luận ở đây";
  //   //lay thu tu chu
  //   let i = 0;

  //   // 1 thi viet, -1 thi xoa
  //   let direction = 1;

  //   const run = setInterval(() => {
  //     //tang i de lay tung ky tu 1 lay, -1 xoa
  //     i += direction;
  //     //gan gia tri
  //     setPlaceholder(text.slice(0, i));
  //     //kiem tra neu i + 1 >= so thu tu ky tu cuoi cua chu hoac i <= so thu tu ki tu dau cua chu thi se dao nguoc
  //     if (i + 1 >= text.length || i <= 0) {
  //       direction *= -1;
  //       //neu i + 1 == ky tu cuoi thi se dung khaong 1s
  //       if (direction === -1) {
  //         setTimeout(() => {
  //           direction *= -1;
  //         }, 1000);
  //         //qua 1s thi chay lai
  //         direction *= -1;
  //       }
  //     }
  //   }, 100);

  //   //dung lai khi ngat noi ket voi component
  //   return () => clearInterval(run);
  // };

  //
  useEffect(() => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    if (!userOther) {
      setInterval(() => {
        fcRefreshToken();
      }, 10000);
    }

    getProductById();

    getByUserListLoves();

    // typingPlaceholder();
  }, []);

  useEffect(() => {
    if (product._id) {
      getRvById();
    }
  }, [product]);

  useEffect(() => {
    socket.on("new_comment", (data) => {
      setReviewDataRealTime(data);
    });
  }, [socket]);

  useEffect(() => {
    if (reviewDataRealTime.length > 0) {
      getRvById();
    }
  }, [reviewDataRealTime.length]);

  let uiComment =
    reviewDataRealTime.length > 0 ? reviewDataRealTime : reviewData;

  return (
    <div className="w-[100%]">
      <div className="w-[1200px] m-auto">
        {/* dau giao dien */}
        <Menu />
        {/* than giao dien */}
        <div className="w-[100%] mt-[30px]">
          {/* ten tieu de */}
          <div className="flex items-center">
            <span className="text-[16px] font-[400] hover:text-green-600 duration-[0.5s] pr-[5px] cursor-pointer">
              Trang chủ
            </span>
            <span>
              <MdNavigateNext size="14px" />
            </span>
            <span className="text-[16px] font-[400] pl-[5px]">
              chi tiết sản phẩm
            </span>
          </div>
          {/* giao dien chi tiet */}
          <div className="w-[100%] mt-[40px]">
            {/* san pham */}
            <div className="w-[100%] flex justify-between">
              {/* hinh anh */}
              <div className="w-[70%]">
                <img src={product.image} className="w-[450px]" />
              </div>
              {/* tohng tin */}
              <div className="w-[100%]">
                <div className="text-[14px] font-[400] pb-[10px] flex">
                  <span className="pr-[5px]">Thể loại:</span>
                  <span className=" hover:text-green-600 duration-[0.5s] cursor-pointer">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-[18px] font-[550] pb-[10px]">
                  {product.name}
                </h1>
                <div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Giá cũ:
                    </span>
                    <span className="text-[16px] text-green-600 font-[400] ">
                      9.000 đ
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Tác giả:
                    </span>
                    <span className="text-[16px] text-green-600 font-[500] cursor-pointer">
                      Cannon
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Mã sản phẩm:
                    </span>
                    <span className="text-[16px] text-green-600 font-[400]">
                      model1
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-[16px] font-[400] pr-[5px]">
                      Số lượng:
                    </span>
                    <span className="text-[16px] text-green-600 font-[400] ">
                      Còn
                    </span>
                  </div>
                  <div className="flex items-center pt-[10px]">
                    <span className="text-[19px] font-[500] text-green-600 pr-[8px]">
                      {numberFormat.format(
                        (product.price * (100 - product.discount)) / 100
                      )}
                    </span>
                    <del className="text-gray-400">
                      {numberFormat.format(product.price)}
                    </del>
                  </div>
                  <div className="flex mt-[10px] pb-[10px] ">
                    <div className="flex justify-end flex-row-reverse">
                      {stars.map((i, idx) => {
                        return (
                          <span className="" key={idx}>
                            <IoIosStar
                              size="22px"
                              className={`${
                                i <= numberStar ? "text-yellow-400 " : ""
                              }  rounded-[2px] pr-[2px]`}
                            />
                          </span>
                        );
                      })}
                    </div>
                    <span
                      className="text-[15px] font-[400] border-r-[2px] border-gray-300 pl-[8px] pr-[8px]
                    "
                    >
                      ({uiComment.length || 0} đánh giá)
                    </span>
                    <span
                      className="cursor-pointer text-[15px] font-[400] pl-[8px] duration-[0.5s] hover:text-green-600"
                      onClick={activeF}
                    >
                      Viết đánh giá
                    </span>
                  </div>
                  <p className="text-[15px] font-400 pb-[10px]">
                    Long printed dress with thin adjustable straps. V-neckline
                    and wiring under the Dust with ruffles at the bottom of the
                    dress.
                  </p>
                  <div className="flex items-center pb-[10px]">
                    <span
                      className={`icon-add-remove-carts ${
                        numberPro <= 1
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      } `}
                      onClick={() => setNumberPro(numberPro - 1)}
                    >
                      <IoIosRemove size="18px" />
                    </span>
                    <span className="text-[16px] font-[700] p-2">
                      {numberPro}
                    </span>
                    <span
                      className={`icon-add-remove-carts ${
                        numberPro >= 10
                          ? "pointer-envets-none"
                          : "pointer-events-auto"
                      }`}
                      onClick={() => setNumberPro(numberPro + 1)}
                    >
                      <IoIosAdd size="18px" />
                    </span>
                    <button
                      className="p-[13px] bg-white w-[23%] border-[2px] border-green-600 text-[16px] font-[500]
                    rounded-[3px] duration-[0.5s] hover:text-white hover:bg-green-600 ml-[20px]"
                      onClick={addCartProDetail}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                  <div className="flex items-center cursor-pointer duration-[0.5s] hover:text-green-600">
                    <span
                      className={`mr-[5px] ${
                        listLoveUser.some((i) => i._id === product._id)
                          ? "text-green-700"
                          : ""
                      } `}
                    >
                      <FaHeartCirclePlus size="20px" />
                    </span>
                    <span
                      className="text-[16px] font-[400] "
                      onClick={
                        listLoveUser.some((i) => i._id === product._id)
                          ? deleteListLoves
                          : addListLoves
                      }
                    >
                      Yêu thích
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex p-[26px] text-[20px] uppercase font-[500] justify-center  pt-[6%] border-b-[2px]
            border-gray-200 before:content-[''] relative"
            >
              <h3
                className={`duration-[0.5s]
             hover:text-green-600 cursor-pointer pr-[6%] 
             ${ac ? "active before:left-[37.5%]" : ""}
             `}
                onClick={activeT}
              >
                Mô tả thêm
              </h3>
              <h3
                className={`duration-[0.5s]
             hover:text-green-600 cursor-pointer
             ${!ac ? "active before:left-[53.5%]" : ""}`}
                onClick={activeF}
              >
                Đánh giá ({uiComment.length})
              </h3>
            </div>
            {/* mo ta them */}
            <div className={`${ac ? "block" : "hidden"} p-[40px]`}>
              <p className="text-[16px] font-[400]">{product.describe}</p>
            </div>
            {/* binh luan */}
            <div className={`${!ac ? "block" : "hidden"} w-[100%]`}>
              <h3 className="text-[18px] font-[500] pt-[20px] pb-[9px]">
                {textRv ? "Sửa" : "Thêm"} đánh giá
              </h3>
              <div className="w-[100%]">
                <span className="text-[16px] font-[400] ">
                  Đánh giá của bạn
                </span>
                <div className="flex pt-[10px] pb-[20px] flex-row-reverse justify-end">
                  {stars.map((i, idx) => {
                    return (
                      <span
                        key={idx}
                        className={`${
                          i <= star ? "text-yellow-400" : ""
                        } pr-[15px] cursor-pointer duration-[0.5s]
                        peer peer-hover:text-yellow-400 hover:text-yellow-400
                    `}
                        onClick={() => setStar(i)}
                      >
                        <IoIosStar size="22px" />
                      </span>
                    );
                  })}
                </div>
                <div className="w-[100%]">
                  <div className="w-[100%] flex flex-col">
                    <label className="text-[16px] font-[400] pb-[8px]">
                      Bình luận
                    </label>
                    <textarea
                      onChange={(e) => setComment(e.target.value)}
                      className="p-[20px] rounded-[3px] outline-none border-[2px] border-gray-400"
                      placeholder="Nhập bình luận ở đây"
                      value={comment}
                    />
                    <button
                      className="p-[16px] bg-black text-white uppercase text-[14px] font-[500]
                    duration-[0.5s] hover:bg-green-600 rounded-[3px] w-[14%] mt-[20px]"
                      onClick={textRv ? editRv : addRv}
                    >
                      {textRv ? "Sửa" : "Đăng"} bình luận
                    </button>
                  </div>
                </div>
              </div>
              {/* sau khi dang binh luan */}
              <div className="w-[100%] mt-[30px] border-t-[2px] border-gray-200">
                {uiComment.length === 0 ? (
                  <>
                    <p className="text-[17px] font-[500] text-center p-[13px]">
                      Không có bình luận nào !
                    </p>
                  </>
                ) : (
                  <>
                    {uiComment.map((i) => {
                      return (
                        <>
                          <div className="flex mt-[30px]">
                            <span>
                              <img
                                src={i?.userOther?.image || i?.user?.image}
                                className="w-[60px] rounded-[30px] "
                              />
                            </span>
                            <div
                              className="bg-white border-[2px] border-gray-200 rounded-[3px] p-[10px]
                    before:content-[''] before:absolute relative before: ml-[20px] before:p-[6px]
                    before:bg-white before:top-[10%] before:left-[-0.6%] before:rotate-[45deg]
                    before:border-l-[2px] before:border-b-[2px] before:border-gray-200 w-[100%]
                    group
                    "
                            >
                              <div className="flex flex-row-reverse justify-end">
                                {stars.map((ix, idx) => {
                                  return (
                                    <span key={idx} className="pr-[10px] ">
                                      <IoIosStar
                                        size="14px"
                                        className={`${
                                          ix <= i.star ? "text-yellow-400" : ""
                                        }  `}
                                      />
                                    </span>
                                  );
                                })}
                              </div>
                              <div className="flex text-[14px] font-[500] pt-[10px]">
                                <span className="uppercase">
                                  {i?.user?.name || i?.userOther?.name} -
                                </span>
                                <span className="pl-[5px]">
                                  {getRelativeTime(i.createDate.toString())}
                                </span>
                                <span className="text-[13px] text-gray-400 font-[500] pl-[5px]">
                                  {i.textEdit === ""
                                    ? ""
                                    : "- " + "( " + i.textEdit + " )"}
                                </span>
                              </div>
                              <p>{i.comment}</p>
                              {idUserOther === i?.userOther?._id ||
                              idUser === i?.user?._id ? (
                                <span
                                  className=" absolute right-[1%] top-[50%] cursor-pointer
                              group-hover:opacity-100
                              duration-[0.5s] group-hover:visible opacity-0 invisible
                              "
                                  onClick={() => setOpenMenuRvs(i._id)}
                                >
                                  <FaEllipsisV size="14px" />
                                </span>
                              ) : (
                                ""
                              )}
                              {/* menu edit, delete comment */}
                              <div
                                className={`${
                                  i._id === idCm && openMenuRv
                                    ? "opacity-100 visible z-[9999]"
                                    : "opacity-0 invisible"
                                } absolute border-[1px] right-[0] top-[67%]
                              border-gray-300 bg-white rounded-[2px] duration-[0.5s] `}
                              >
                                <ul className="flex flex-col">
                                  <li
                                    className="cursor-pointer text-[15px] p-[17px] font-[500]
                                  duration-[0.5s] hover:bg-gray-200"
                                    onClick={() =>
                                      setEditRv(i.comment, i.star, i._id)
                                    }
                                  >
                                    Sửa
                                  </li>
                                  <li
                                    className="p-[17px] cursor-pointer text-[15px] font-[500] 
                                  duration-[0.5s] hover:bg-gray-200"
                                    onClick={() => deleteComment(i._id)}
                                  >
                                    Xóa
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {/* san pham lien quan */}
            <div className="w-[100%] pt-[50px]">
              <div
                className="w-[100%] border-b-[2px] border-gray-200 pb-[14px]
              before:content-[''] relative before:absolute before:h-[2px] before:w-[18%]
              before:bg-green-500 before:bottom-[0%] before:left-[41%]"
              >
                <h3 className="text-[20px] uppercase font-[500] text-center">
                  Sản phẩm liên quan
                </h3>
              </div>
              {/* ds san pham lien quan */}
              <div className="grid grid-cols-4 gap-[5px] mt-[30px] pb-[20px]">
                {number.map((i, idx) => {
                  return (
                    <>
                      <div
                        key={idx}
                        className="w-[70%] shadow-md rounded-[3px] bg-white border-r-[2px] border-gray-200 p-3
          cursor-pointer relative group"
                      >
                        <span
                          className="flex justify-center text-[13px] font-[600] cursor-default
            pb-[6px]"
                        >
                          Động vật
                        </span>
                        <h2 className="text-center font-[700] pb-[6px]">
                          Here Is A Quick Cure For Book
                        </h2>
                        <span>
                          <img
                            src="https://htmldemo.net/pustok/pustok/image/products/product-2.jpg"
                            className="w-[100%]"
                          />
                        </span>
                        <div className="flex justify-center items-center">
                          <span className="text-[17px] text-green-600 font-[500] pr-[6px]">
                            15.000 đ
                          </span>
                          <span className="text-gray-400 text-[14px] pr-[6px]">
                            10.000 đ
                          </span>
                          <span
                            className="p-1 bg-red-600 text-white text-[15px] font-[650]
              rounded-[4px]"
                          >
                            20%
                          </span>
                        </div>
                        {/* menu mini san pham*/}
                        <div
                          className="absolute  bg-white shadow-md w-[30%] p-1 top-[53%] left-[35%]
            rounded-[3px] group-hover:opacity-100 duration-[0.5s] group-hover:top-[50%] 
            opacity-0 invisible group-hover:visible"
                        >
                          <ul className="grid grid-cols-2 p-1 w-[100%] items-center">
                            <li className="border-r-[2px] border-gray-200 p-2">
                              <span className="cursor-pointer hover:text-green-600 duration-[0.5s]">
                                <FaCartPlus size="14px" />
                              </span>
                            </li>
                            <li className="flex justify-center">
                              <span className="cursor-pointer hover:text-green-600 duration-[0.5s]">
                                <FaHeartCirclePlus size="14px" />
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
              <div className="w-[100%] flex justify-center pt-[30px] pb-[20px]">
                <button
                  className=" p-[13px] uppercase w-[12%] border-[2px] border-green-600 bg-white text-[14px] font-[500]
               duration-[0.5s] hover:bg-green-600 rounded-[3px] hover:text-white"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* cuoi giao dien */}
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
};

export default ProductDetail;

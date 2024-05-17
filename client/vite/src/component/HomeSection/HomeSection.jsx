import React, { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { MdSkipNext } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../action/products";
import Loading from "../loading/Loading";
import LoadingProducts from "../loading/loadingProducts";
import {
  addListLove,
  getByUserLove,
  removeProLove,
} from "../../action/listLove";
import { getByIdUserOther } from "../../action/usersOther";
import Toast from "../toast/Toast";
import { closeToast, showToast } from "../toast/ShowToast";
import { getByUser, refreshTK } from "../../action/users";
import { addListCart } from "../../action/listCart";
import { numberFormat, socket } from "../productDetail/ProductDetail";

const HomeSection = () => {
  const [openShow, setOpenShow] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [number, setNumber] = useState(
    "" || window.localStorage.getItem("numberPage")
  );
  const [name, setName] = useState("" || window.localStorage.getItem("search"));

  let sorts = "";
  let type = "";
  if (!JSON.parse(window.localStorage.getItem("sort"))) {
    sorts = "";
    type = "";
  } else {
    sorts = JSON.parse(window.localStorage.getItem("sort")).sort;
    type = JSON.parse(window.localStorage.getItem("sort")).type;
  }

  const [sort, setSort] = useState({
    sort: sorts,
    type: type,
  });
  const [miniSort, setMiniSort] = useState([
    { name: "Mặc định", type: "", value: "", param: "" },
    { name: "Tên (A-Z)", type: "increase", value: "name", param: "TenA-Z" },
    { name: "Tên (Z-A)", type: "reduce", value: "name", param: "TenZ-A" },
    {
      name: "Giá tăng dần",
      type: "increase",
      value: "price",
      param: "GiaTangDan",
    },
    {
      name: "Giá giảm dần",
      type: "reduce",
      value: "price",
      param: "GiaGiamDan",
    },
    // {name:"Nhiều đánh giá nhất" , type:'reduce', value:'name'},
    // {name:"Ít đánh giá nhất" , type:'reduce', value:'name'},
  ]);
  const [nameSort, setNameSort] = useState("Mặc định");

  const [pageSize, setPageSize] = useState([3, 4, 5]);
  const [pageS, setPageS] = useState(
    "" || window.localStorage.getItem("pageSize")
  );

  const nagivate = useNavigate();
  let pages = [];

  const [search, setSearch] = useSearchParams({});

  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [userOther, setUserOther] = useState(
    "" || JSON.parse(window.sessionStorage.getItem("user"))
  );

  const [listLove, setListLove] = useState([]);

  const [countAddCart, setCountAddCart] = useState(0);

  // const [loadToast, setLoadToast] = useState(false);
  // const [checkToast, setCheckToast] = useState(false);
  // const [mess, setMess] = useState("");

  //ham
  const openS = () => setOpenShow((i) => !i);
  const openSor = () => setOpenSort((i) => !i);

  const getProductAll = async (number, sort, name, pageSs) => {
    setLoadingProducts(true);

    const data = await getAllProducts(number, sort, name, pageSs);

    if (data) {
      setTotalPage(data.totalPage);
      setProducts(data.products);
      setOpenShow(false);
      setOpenSort(false);

      setLoadingProducts(false);
    }
  };

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }

  const fcSetSort = (value, type, nameSort, param) => {
    setSort({ sort: value, type: type });
    setSearch({ sort: param });
    window.localStorage.setItem("nameSort", nameSort);

    window.localStorage.setItem(
      "sort",
      JSON.stringify({ sort: value, type: type })
    );
  };

  const fcSetPageSize = (i) => {
    setPageS(i);
    setSearch({ pageSize: i });
    window.localStorage.setItem("pageSize", i);
  };

  const fcSetNumber = (i) => {
    setNumber(i);
    setSearch({ page: i });
    window.localStorage.setItem("numberPage", i);
  };

  const fcBtNextPage = () => fcSetNumber(number + 1);

  const fcBtLastPage = () => fcSetNumber(number - 1);

  const fcLastPage = () => {
    let n = number + 3 > totalPage ? totalPage : number + 3;
    fcSetNumber(n);
  };

  const fcFirstPage = () => {
    let n = number - 3 < 1 ? 1 : number - 3;
    fcSetNumber(n);
  };

  //add list love
  const addListLoves = async (idProduct) => {
    //get userOne
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let user;
    if (!userOther) {
      user = await getByUser();
    }
    //get id user
    let datas;
    if (!user) {
      datas = await getByIdUserOther(userOther.localId);
    }
    let data;
    if (datas) {
      data = await addListLove(datas._id, idProduct, null);
    } else {
      data = await addListLove(null, idProduct, user._id);
    }

    if (data) {
      getListUserLove();
      alert("Thêm vào danh sách yêu thích thành công");
    } else {
      alert("thêm vào danh sách yêu thích thất bại");
    }
  };

  //delete love
  const deleteLove = async (idProduct) => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let user;
    if (!userOther) {
      user = await getByUser();
    }
    let datas;
    if (!user) {
      //get id userOther
      datas = await getByIdUserOther(userOther.localId, null);
    }

    //get by id list love
    if (datas || user) {
      let idUser;
      if (!datas) {
        idUser = await getByUserLove(null, user._id);
      } else {
        idUser = await getByUserLove(datas._id, null);
      }

      if (idUser) {
        const data = await removeProLove(idUser._id, idProduct);
        if (data) {
          getListUserLove();
          alert("xóa sản phẩm khỏi danh sách yêu thích thành công");
        } else {
          alert("xóa sản phẩm khỏi danh sách yêu thích thất bại");
        }
      }
    }
  };

  //get user list love
  const getListUserLove = async () => {
    //get userOne
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));

    let user;
    let datas;
    let data;
    if (!userOther) {
      user = await getByUser();
      if (user) {
        data = await getByUserLove(null, user._id);
      }
    } else {
      datas = await getByIdUserOther(userOther.localId);
      if (datas) {
        data = await getByUserLove(datas._id, null);
      }
    }

    if (data) {
      setListLove(data.products);
    }
  };

  //get cart by user
  //add cart
  const addListCarts = async (product, total, quanitty, totalPrice) => {
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let user;
    let datas;
    let data;

    if (!userOther) {
      user = await getByUser();
      if (user) {
        data = await addListCart(
          user._id,
          null,
          product,
          total,
          quanitty,
          totalPrice
        );
      }
    } else {
      datas = await getByIdUserOther(userOther.localId);
      if (datas) {
        data = await addListCart(
          null,
          datas._id,
          product,
          total,
          quanitty,
          totalPrice
        );
      }
    }

    if (data) {
      alert("them vao gio hang thanh cong");
      setCountAddCart(countAddCart + 1);
      socket.emit("loadCart", countAddCart);
    } else {
      alert("them vao gio hang that bai");
    }
  };
  //edit cart
  //delete list pro cart

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

  useEffect(() => {
    if (number === null || number === "") setNumber(1);

    getListUserLove();

    const userOther = JSON.parse(window.sessionStorage.getItem("user"));

    if (!userOther) {
      setInterval(() => {
        fcRefreshToken();
      }, 10000);
    }
  }, []);

  // useEffect(() => {
  //   //set loading toast
  //   if (loadToast === true) {
  //     showToast();
  //     setTimeout(() => {
  //       setLoadToast(false);
  //       closeToast();
  //     }, 2000);
  //   }
  // }, [addListLoves, deleteLove]);

  useEffect(() => {
    // if (name) {
    //   setSearch({ name });
    //   setNumber(1);
    //   window.localStorage.setItem("numberPage", 1);
    // }

    getProductAll(number, sort, name, pageS);

    let nameSorts = window.localStorage.getItem("nameSort");

    if (nameSorts) setNameSort(nameSorts);
  }, [number, sort, name, pageS, totalPage]);

  console.log("Number: ", number);

  return (
    <>
      {/* <Toast checkToast={checkToast} mess={mess} /> */}
      <div className="w-[100%] mt-[20px]">
        {/* tieu de */}
        <div className="flex text-[14px]">
          <span className="flex items-center p-1 cursor-pointer duration-[0.5s] hover:text-green-600">
            Trang chủ <MdNavigateNext size="13px" className="ml-[5px]" />
          </span>
          <span className="p-1">Danh sách sản phẩm</span>
        </div>
        {/* than giao dien */}
        <div className="w-[100%] mt-[20px] relative">
          {/* thanh cong cu */}
          <div
            className="w-[100%] bg-white border-gray-200 border-[2px] rounded-[2px] p-3 
          flex mb-[5px]
        "
          >
            {/* hien thi danh sach bao nhieu */}
            <div className="flex items-center ml-[70%] mr-[5%] relative">
              <span className="text-[14px] pr-[10px]">Hiển thị:</span>
              <span
                className="flex items-center cursor-pointer text-[15px] font-[450]"
                onClick={openS}
              >
                {pageS || 3}
                <MdNavigateNext
                  size="14px"
                  className={`${openShow ? "rotate-[-90deg]" : "rotate-90"} 
              duration-[0.5s] ml-[10px]`}
                />
              </span>
              {/* danh sach hien mini */}
              <div
                className={`absolute bg-white shadow-md z-[10]
              ${
                openShow
                  ? "top-[110%] visible opacity-100"
                  : "top-[100%] invisivle opacity-0"
              } p-2 w-[50px] 
              rounded-[3px] top-[160%] right-[5%]
              duration-[0.5s] `}
              >
                <ul className="p-1 flex flex-col items-center ">
                  {pageSize.map((i, idx) => {
                    return (
                      <li
                        key={idx}
                        className="cursor-pointer w-[100%] text-[14px] h-[30px]
                flex items-center justify-center rounded-[2px] hover:bg-gray-200 duration-[0.5s]"
                        onClick={() => fcSetPageSize(i)}
                      >
                        {i}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* sap xep theo.... */}
            <div className="flex items-center relative">
              <span className="text-[14px] pr-[10px]">Sắp xếp:</span>
              <span
                className="flex items-center cursor-pointer text-[15px] font-[450]"
                onClick={openSor}
              >
                {nameSort}
                <MdNavigateNext
                  size="14px"
                  className={`${openSort ? "rotate-[-90deg]" : "rotate-90"}
              duration-[0.5s]  ml-[10px]`}
                />
              </span>
              {/* sap xep mini */}
              <div
                className={`absolute bg-white border-[2px] z-[10] rounded-[2px] border-gray-200
            p-2 shadow-md ${
              openSort
                ? "visible opacity-100 top-[150%]"
                : "invisible opacity-0 top-[155%]"
            } duration-[0.5s]`}
              >
                <ul className="flex flex-col items-center">
                  {miniSort.map((i, idx) => {
                    return (
                      <li
                        key={idx}
                        className="p-2 cursor-pointer text-[14px] hover:bg-gray-200 duration-[0.5s]"
                        onClick={() =>
                          fcSetSort(i.value, i.type, i.name, i.param)
                        }
                      >
                        {i.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {/* danh sach san pham */}
          {loadingProducts ? (
            <LoadingProducts top="40%" />
          ) : (
            <>
              {products.length > 0 ? (
                <>
                  <div className="w-[100%] grid grid-cols-3 gap-[20px] p-2 mt-[20px] z-[2]">
                    {/* san pham 1 */}
                    {products.map((product, i) => {
                      return (
                        <>
                          <div
                            key={product._id}
                            className="w-[70%] shadow-md rounded-[3px] bg-white border-r-[2px] border-gray-200 p-3
          cursor-pointer relative group"
                          >
                            <span
                              className="flex justify-center text-[13px] font-[600] cursor-default
            pb-[6px]"
                            >
                              {product.category}
                            </span>
                            <h2 className="text-center font-[700] pb-[6px]">
                              {product.name}
                            </h2>
                            <span>
                              <img
                                src={product.image}
                                className="w-[100%]"
                                onClick={() =>
                                  nagivate(
                                    `/san-pham-chi-tiet?name=${product.name}`,
                                    {
                                      state: { id: product._id },
                                    }
                                  )
                                }
                              />
                            </span>
                            <div className="flex justify-center items-center">
                              <span className="text-[17px] text-green-600 font-[500] pr-[6px]">
                                {numberFormat.format(
                                  (product.price * (100 - product.discount)) /
                                    100
                                )}
                              </span>
                              <span className="text-gray-400 text-[14px] pr-[6px]">
                                {numberFormat.format(product.price)}
                              </span>
                              <span
                                className="p-1 bg-red-600 text-white text-[15px] font-[650]
              rounded-[4px]"
                              >
                                {product.discount}%
                              </span>
                            </div>
                            {/* menu mini san pham*/}
                            <div
                              className="absolute  bg-white shadow-md w-[30%] p-1 top-[53%] left-[35%]
            rounded-[3px] group-hover:opacity-100 duration-[0.5s] group-hover:top-[50%] 
            opacity-0 invisible group-hover:visible "
                            >
                              <ul className="grid grid-cols-2 p-1 w-[100%] items-center">
                                <li className="border-r-[2px] border-gray-200 p-2">
                                  <span
                                    className="cursor-pointer hover:text-green-600 duration-[0.5s]"
                                    onClick={() =>
                                      addListCarts(
                                        product._id,
                                        (product.price *
                                          (100 - product.discount)) /
                                          100,
                                        1,
                                        ((product.price *
                                          (100 - product.discount)) /
                                          100) *
                                          1
                                      )
                                    }
                                  >
                                    <FaCartPlus size="14px" />
                                  </span>
                                </li>
                                <li className="flex justify-center">
                                  <span
                                    className={` ${
                                      listLove.some(
                                        (i) => i._id === product._id
                                      )
                                        ? "text-green-500"
                                        : ""
                                    } hover:text-green-600 duration-[0.5s]`}
                                    onClick={() =>
                                      listLove.some(
                                        (i) => i._id === product._id
                                      )
                                        ? deleteLove(product._id)
                                        : addListLoves(product._id)
                                    }
                                  >
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
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center p-[20px]">
                    <h3 className="text-[22px] font-[600] uppercase ">
                      Không có sản phẩm nào !
                    </h3>
                  </div>
                </>
              )}
            </>
          )}

          {/* phan trang */}
          {products.length > 0 ? (
            <>
              <div
                className="bg-white border-[2px] border-gray-200 rounded-[2px] w-[100%]  
        mt-[40px] flex items-center justify-center relative"
              >
                <span
                  className={`buton-pagin ${
                    parseInt(number) === 1
                      ? "opacity-0 invisible"
                      : "opcity-100 visible"
                  }`}
                  onClick={fcFirstPage}
                >
                  <MdSkipNext size="20px" className="rotate-[180deg]" />
                </span>
                <span
                  className={`buton-pagin ${
                    parseInt(number) === 1
                      ? "opacity-0 invisible"
                      : "opcity-100 visible"
                  }`}
                  onClick={fcBtLastPage}
                >
                  <MdNavigateNext size="20px" className="rotate-[180deg]" />
                </span>
                {pages.map((i, idx) => {
                  return (
                    <span
                      key={idx}
                      className={`text-[18px] buton-pagin font-[500]
                ${i === parseInt(number) ? "button-active " : ""}`}
                      onClick={() => fcSetNumber(i)}
                    >
                      {i}
                    </span>
                  );
                })}
                <span
                  className={`buton-pagin ${
                    parseInt(number) === totalPage
                      ? "opacity-0 invisible"
                      : "opcity-100 visible"
                  }`}
                  onClick={fcBtNextPage}
                >
                  <MdNavigateNext size="20px" />
                </span>
                <span
                  className={`buton-pagin ${
                    parseInt(number) === totalPage
                      ? "opacity-0 invisible"
                      : "opcity-100 visible"
                  }`}
                  onClick={fcLastPage}
                >
                  <MdSkipNext size="20px" />
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeSection;

import React, { useEffect, useState } from "react";
import Menu from "../nvabar/menu";
import Footer from "../footer/Footer";
import { MdNavigateNext } from "react-icons/md";
import { IoMdHeartDislike } from "react-icons/io";
import BackToTop from "../backToTop/BackToTop";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getALl, getByUserLove, removeProLove } from "../../action/listLove";
import { getByUser, refreshTK } from "../../action/users";
import LoadingProducts from "../loading/loadingProducts";

const ListLove = () => {
  const nagivate = useNavigate();
  const location = useLocation();
  const { idUserOther } = location.state;

  const [listLove, setListLove] = useState("");
  const [idList, setIdList] = useState("");

  const [loadingPro, setLoadingPro] = useState(false);

  const navigate = useNavigate();

  //ham
  const getUserListLove = async () => {
    setLoadingPro(true);
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    let datas;
    if (!userOther) {
      data = await getByUser();
      if (data) {
        datas = await getByUserLove(null, data._id);
      }
    } else {
      datas = await getByUserLove(idUserOther, null);
    }

    if (datas) {
      setListLove(datas.products);
      setIdList(datas._id);
      setLoadingPro(false);
    }
  };

  const deleleProductListLove = async (id) => {
    await removeProLove(idList, id);
    getUserListLove();
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

  useEffect(() => {
    getUserListLove();

    //user
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));

    if (!userOther) {
      setInterval(() => {
        fcRefreshToken();
      }, 10000);
    }
  }, []);

  return (
    <>
      <div className="w-[100%]">
        <div className="w-[1200px] m-auto">
          {/* dau giao dien */}
          <Menu />
          {/* than giao dien */}
          <div className="w-[100%] mt-[30px] mb-[50px]">
            {/* tieu de */}
            <div className="flex items-center mb-[30px]">
              <span
                className="text-[16px] font-[400] cursor-pointer mr-[5px] hover:text-green-600 duration-[0.5s]"
                onClick={() => nagivate("/trang-chu")}
              >
                Trang chủ
              </span>
              <span className="mr-[5px]">
                <MdNavigateNext size="14px" />
              </span>
              <span>Danh sách yêu thích</span>
            </div>
            {loadingPro ? (
              <LoadingProducts top="10%" />
            ) : (
              <>
                {/* bang danh sach yeu thich */}
                {listLove.length === 0 ? (
                  <>
                    <div className="flex  justify-center items-center">
                      <h3 className="text-[16px] font-[500] text-center pr-[10px]">
                        Không có danh sách sản phẩm yêu thích nào !
                      </h3>
                      <button
                        className="p-[11px] text-white bg-green-600 duration-[0.5s] 
                hover:bg-green-700 text-[15px] font-[500] rounded-[3px]"
                        onClick={() => nagivate("/trang-chu")}
                      >
                        Quay lại trang chủ
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-[100%] mt-[30px]">
                    <table
                      className="border-[2px] border-gray-200 shadow-md border-collapse rounded-[3px]
            w-[100%]"
                    >
                      <thead>
                        <tr>
                          <th className="text-th-talble-listLove">Hình</th>
                          <th className="text-th-talble-listLove">
                            Tên sản phẩm
                          </th>
                          <th className="text-th-talble-listLove">Giá</th>
                          <th className="text-th-talble-listLove">
                            Bỏ yêu thích
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {listLove.map((i) => {
                          return (
                            <tr
                              key={i._id}
                              className="duration-[0.5s] hover:bg-white"
                            >
                              <td className="img-tbody-listLove cursor-pointer border-tbody-listLove p-3">
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/san-pham-chi-tiet?name=${i.name}`,
                                      {
                                        state: { id: i._id },
                                      }
                                    )
                                  }
                                >
                                  <img src={i.image} className="w-[100px]" />
                                </span>
                              </td>
                              <td className="border-tbody-listLove">
                                <h3
                                  className="text-center cursor-pointer text-hover-listLove text-[17px]
                    font-[400]"
                                >
                                  {i.name}
                                </h3>
                              </td>
                              <td className="border-tbody-listLove">
                                <span className="flex items-center justify-center text-[16px]">
                                  {(i.price * (100 - i.discount)) / 100}
                                </span>
                              </td>
                              <td className="border-tbody-listLove">
                                <span
                                  className="flex items-center justify-center cursor-pointer text-hover-listLove"
                                  onClick={() => deleleProductListLove(i._id)}
                                >
                                  <IoMdHeartDislike size="20px" />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
          {/* cuoi giao dien */}
          <Footer />
          <BackToTop />
        </div>
      </div>
    </>
  );
};

export default ListLove;

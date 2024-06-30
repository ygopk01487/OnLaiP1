import React, { useEffect, useRef, useState } from "react";
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
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export const socket = io.connect("http://localhost:5000");

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
  addDisLikes,
  addLikes,
  addReview,
  deleteCm,
  editReview,
  getReviewById,
  removeDislikes,
  removeLikes,
} from "../../action/reviews";
import { FaEllipsisV } from "react-icons/fa";
import {
  addDislikeReplys,
  addLikeReplys,
  addReplys,
  editReplys,
  getReplysAlls,
  getReplysByComment,
  removeDislikeReplys,
  removeLikeReplys,
  removeReplys,
} from "../../action/reply";
import { backToComment, inputFocus } from "./jsProductDetail";
import { MdEmojiEmotions } from "react-icons/md";

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

  const [openSortCm, setOpenSortCm] = useState(false);

  const [openReply, setOpenReply] = useState(false);

  const [openReplyTwo, setOpentReplyTwo] = useState(false);

  const [notSpam, setNotSpam] = useState(false);

  const [dataRePly, setDataReply] = useState([]);

  const [idCmReply, setIdCommentReply] = useState("");
  const [openMenuReply, setOpenMenuReply] = useState(false);

  const [commentReplyOne, setCommentReplyOne] = useState("");
  const [commentReplyTwo, setCommentReplyTwo] = useState("");
  const [editReply, setEditReply] = useState(false);
  const [idReply, setIdReply] = useState("");
  const [openInputRlOnes, setOpenInputRlOnes] = useState(false);
  const [inputIdRlOne, setInputIdRlOne] = useState("");
  const [inputIdRlTwo, setInputIdRlTwo] = useState("");
  const [idReplyss, setIdReplysss] = useState("");
  const [nameReply, setNameReply] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [emoji, setEmoji] = useState(null);
  const [idRvEmoji, setIdRvEmoji] = useState("");
  const [showEmojiRlRl, setShowEmojiRlRl] = useState(false);

  const [idCmReplyOne, setIdCmReplyOne] = useState("");

  const inputRef = useRef(null);

  const [commentRl, setCommentRl] = useState("");

  const [userImage, setUserImage] = useState("");

  const [userOtherImage, setUserOtherImage] = useState("");

  //check open menu editCm
  const [check, setCheck] = useState("");

  const [checkReplyCm, setCheckReplyCm] = useState("");
  const [checkReplyRl, setCheckReplyRl] = useState("");
  const [checkEditRl, setCheckEditRl] = useState("");
  const [checkOpenRl, setCheckOpenRl] = useState("");
  const [checkEmojiRlRl, setCheckEmojiRlRl] = useState("");
  const [checkOpenMenuRl, setCheckOpenMenuRl] = useState("");
  const [checkOpenEmojiEditRl, setCheckOpenEmojiEditRl] = useState("");

  const [openEmojiEditRl, setOpenEmojiEditRl] = useState(false);

  const [checkOmojibyRl, setCheckOmojiByRl] = useState("");
  const [showEmojiRl, setShowEmojiRl] = useState(false);
  const [idRLEmoji, setIdRLEmoji] = useState("");
  const [idRlByEmoji, setIdRlByEmoji] = useState("");

  const [nameSortRv, setNameSortRv] = useState("Mặc định");

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
    setNotSpam(true);
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
      setNotSpam(false);
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
        setUserImage(data._mage);
        datas = await getByUserLove(null, data._id);
      }
    } else {
      data = await getByIdUserOther(userOther.localId);
      if (data) {
        setIdUserOther(data._id);
        setUserOtherImage(data.image);
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
    setNotSpam(true);
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
      setNotSpam(false);
    } else {
      alert("thêm dánh sách yêu thích thất bại");
    }
  };

  //delete listLove
  const deleteListLoves = async () => {
    setNotSpam(true);
    const data = await removeProLove(idListLove, product._id);
    if (data) {
      getByUserListLoves();
      setNotSpam(false);
      alert("Xóa thành công sản phẩm yêu thích");
    } else {
      alert("Xóa thất bại sản phẩm yêu thích");
    }
  };

  //add review
  const addRv = async () => {
    setNotSpam(true);
    if (star > 0 || comment === "") {
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
        setNotSpam(false);
        //comment real time
        socket.emit("comment", datas.review);
      }
    } else {
      alert("Thêm đánh giá sao");
    }
  };

  //edit review
  const editRv = async () => {
    setNotSpam(true);
    if (star > 0) {
      const data = await editReview(star, comment, idRv, idCm);

      if (data) {
        // getRvById();
        setComment("");
        setStar(0);
        setTextRv(false);
        setOpenMenuRv(false);
        setNotSpam(false);
        //edit real time
        socket.emit("comment", data.review);
      }
    } else {
      alert("Thêm đánh giá sao hoặc viết bình luận");
    }
  };

  //delete review
  const deleteComment = async (idComment) => {
    setNotSpam(true);
    const data = await deleteCm(idRv, idComment);
    if (data) {
      // getRvById();
      setNotSpam(false);
      //delete real time
      socket.emit("comment", data.review);
    }
  };

  //get review by id
  const getRvById = async () => {
    const data = await getReviewById(product._id);
    if (data.reviews !== null) {
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
    setOpenMenuRv(false);

    backToComment();
  };

  //exit comment
  const exitComment = () => {
    setComment("");
    setStar(0);
    setTextRv(false);
    setShowPicker(false);
  };

  //setOpenReply
  const setOpenReplys = (idCm) => {
    if (checkOpenRl !== idCm) {
      setOpenReply(true);
      setCheckOpenRl(idCm);
    } else {
      setOpenReply((e) => !e);
    }

    setIdCmReplyOne(idCm);
  };

  //set open menu rv
  const setOpenMenuRvs = (idComment) => {
    setOpenMenuReply(false);
    if (check !== idComment) {
      setCheck(idComment);
      setOpenMenuRv(true);
    } else {
      setOpenMenuRv((e) => !e);
    }
    setIdCm(idComment);
  };

  //set open menu reply
  const setOpenMenuReplys = (idCommentReply) => {
    setOpenMenuRv(false);

    //dong edit reply
    if (editReply) {
      setEditReply(false);
    }

    if (checkOpenMenuRl !== idCommentReply) {
      setCheckOpenMenuRl(idCommentReply);
      setOpenMenuReply(true);
    } else {
      setOpenMenuReply((e) => !e);
    }
    setIdCommentReply(idCommentReply);
  };

  //set input reply one
  const setInputReplyOne = (idCm) => {
    //input focus
    // inputFocus();

    //hidden emoji
    setShowEmojiRl(false);

    //ve trong
    setCommentReplyOne("");

    //dong menu revie
    setOpenMenuRv(false);

    //dong menu reply
    setOpenMenuReply(false);

    //menu rply two
    setOpentReplyTwo(false);

    if (checkReplyCm !== idCm) {
      setCheckReplyCm(idCm);
      setOpenInputRlOnes(true);
    } else {
      setOpenInputRlOnes((e) => !e);
    }
    setInputIdRlOne(idCm);
  };

  //exit reply one
  const exitReplyOne = () => {
    setOpentReplyTwo(false);
    setOpenInputRlOnes(false);
    setOpenMenuRv(false);
    setCommentReplyOne("");
    setShowEmojiRl(false);
  };

  //set input open input two
  const setInputReplyTwos = (idCm, name, idUsers) => {
    //set ve trong
    setNameReply("");

    //dat ve trong
    setCommentReplyOne("");
    //dong menu revie
    setOpenMenuRv(false);

    //dong menu reply
    setOpenMenuReply(false);

    //dong reply one
    setOpenInputRlOnes(false);

    if (checkReplyRl !== idCm) {
      setCheckReplyRl(idCm);
      setOpentReplyTwo(true);
    } else {
      setOpentReplyTwo((e) => !e);
    }
    setInputIdRlTwo(idCm);

    //neu ma = id user thi ko them
    if (idUsers !== idUser && idUsers !== idUserOther) {
      setNameReply(name);
    }
  };

  //exit input reply two
  const exitReplyTwo = () => {
    setOpentReplyTwo(false);
    setOpenInputRlOnes(false);
    setCommentReplyTwo("");
    setOpenMenuRv(false);
    setNameReply("");
    setCommentReplyOne("");
    setShowEmojiRlRl(false);
  };

  //add like
  const addlikess = async (idCm) => {
    setNotSpam(true);
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    if (!userOther) {
      //lay idDisLike user
      const indexDisLike = reviewData.findIndex((i) => i._id === idCm);

      const userDisLike = reviewData[indexDisLike].dislike.filter(
        (i) => i.user?._id === idUser
      );

      let idDisLike = userDisLike.map((i) => i._id).toString();

      //kiem tra neu user da dislike thi xoa di
      if (idDisLike) {
        const removeDisLikeUser = await removeDislikes(idCm, idDisLike);
      }

      data = await addLikes(idUser, null, idRv, idCm, 1);
    } else {
      //lay idDisLike userOther
      const indexDisLike = reviewData.findIndex((i) => i._id === idCm);

      const userOtherLike = reviewData[indexDisLike].dislike.filter(
        (i) => i.userOther?._id === idUserOther
      );

      let idDisLike = userOtherLike.map((i) => i._id).toString();

      //kiem tra neu userOther da dislike thi xoa di
      if (idDisLike) {
        const removeDisLikeUserOther = await removeDislikes(idCm, idDisLike);
      }

      data = await addLikes(null, idUserOther, idRv, idCm, 1);
    }

    if (data) {
      getRvById();
      setNotSpam(false);
      socket.emit("comment", data.review);
    }
  };

  //add dis like
  const addDislikess = async (idCm) => {
    setNotSpam(true);
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    if (!userOther) {
      //lay idDisLike user
      const indexLike = reviewData.findIndex((i) => i._id === idCm);

      const userLike = reviewData[indexLike].like.filter(
        (i) => i.user?._id === idUser
      );

      let idLike = userLike.map((i) => i._id).toString();

      //kiem tra neu user da like thi xoa di
      if (idLike) {
        const removeLikeUser = await removeLikes(idCm, idLike);
      }

      data = await addDisLikes(idUser, null, idRv, idCm, 1);
    } else {
      //lay idDisLike userOther
      const indexLike = reviewData.findIndex((i) => i._id === idCm);

      const userOtherLike = reviewData[indexLike].like.filter(
        (i) => i.userOther?._id === idUserOther
      );

      let idLike = userOtherLike.map((i) => i._id).toString();

      //kiem tra neu userOther da like thi xoa di
      if (idLike) {
        const removeLikeUserOther = await removeLikes(idCm, idLike);
      }

      data = await addDisLikes(null, idUserOther, idRv, idCm, 1);
    }

    if (data) {
      getRvById();
      setNotSpam(false);
      socket.emit("comment", data.review);
    }
  };

  //get replys by comment
  const getReplysByComments = async () => {
    const data = await getReplysByComment(idRv);
    if (data) {
      setDataReply(data);
      setIdReply(data[0]._id);
    }
  };

  //add reply

  const addReplysssss = async (
    users,
    userOthers,
    idReviewProduct,
    idReviewUser,
    checkReply
  ) => {
    // setNotSpam(true);
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;

    if (!userOther) {
      data = await addReplys(
        idUser,
        null,
        users,
        userOthers,
        commentReplyOne || commentReplyTwo,
        idReviewProduct,
        idReviewUser,
        checkReply
      );
    } else {
      data = await addReplys(
        null,
        idUserOther,
        users,
        userOthers,
        commentReplyOne || commentReplyTwo,
        idReviewProduct,
        idReviewUser,
        checkReply
      );
    }

    if (data) {
      getReplysByComments();
      setOpentReplyTwo(false);
      setNotSpam(false);
      exitReplyOne();
      exitReplyTwo();
      socket.emit("loadReply", data, idRv);
    }
  };

  //edit reply
  const setEditReplyTextValue = (value, id) => {
    setCommentRl(value);
    setOpenMenuReply(false);
    setEditReply(true);
    setIdReplysss(id);
    setOpentReplyTwo(false);
  };

  const exitReplyTextValue = () => {
    setEditReply(false);
    setIdReplysss("");
    setIdCommentReply("");
  };
  const editCommentRelyss = async (idRl, idRvs) => {
    setNotSpam(true);
    const data = await editReplys(
      idReply,
      idRl,
      commentRl,
      "Đã chỉnh sửa",
      idRvs,
      idRv
    );
    if (data) {
      getReplysByComments();
      setNotSpam(false);
      setEditReply(false);
      socket.emit("loadReply", data, idRv);
    }
  };

  //remove reply
  const removeReplyss = async (idRl, idRvs) => {
    setNotSpam(true);

    //get id reply by comment
    const dataByCm = dataRePly.filter(
      (i) => i.idComment.idReviewUser === idRvs
    );

    const idReplyByCm = dataByCm[0]._id;

    const data = await removeReplys(idReplyByCm, idRl);
    if (data) {
      setNotSpam(false);
      getReplysByComments();
      setOpenMenuReply(false);
      setCommentReplyOne("");
      setCommentReplyTwo("");
      socket.emit("loadReply", data, idRv);
    }
  };

  //add like reply
  const addLikeReplysss = async (idRl, idCm) => {
    setNotSpam(true);
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    //get data theo comment
    const dataByCm = dataRePly.filter((i) => i.idComment.idReviewUser === idCm);
    if (!userOther) {
      //kiem tra neu user da dislike khi bam like thi xoa di
      const datas = dataByCm[0].replyss
        .map((i) => i.dislike)[0]
        .filter((i) => i.userOther.toString() === idUserOther);

      if (datas.length > 0) {
        const idDislike = datas[0]._id;
        if (idDislike) {
          await removeDislikeReplys(idRl, idDislike);
        }
      }

      const id = dataByCm[0]._id;

      data = await addLikeReplys(idUser, null, id, idRl, 1, idRv);
    } else {
      //kiem tra neu user da dislike khi bam like thi xoa di
      const datas = dataByCm[0].replyss
        .map((i) => i.dislike)[0]
        .filter((i) => i.userOther === idUserOther);

      if (datas.length > 0) {
        const idDislike = datas[0]._id;
        if (idDislike) {
          await removeDislikeReplys(idRl, idDislike);
        }
      }

      const id = dataByCm[0]._id;

      data = await addLikeReplys(null, idUserOther, id, idRl, 1, idRv);
    }

    if (data) {
      setNotSpam(false);
      getReplysByComments();
      socket.emit("loadReply", data, idRv);
    }
  };

  //add dislike reply
  const addDisikeReplysss = async (idRl, idCm) => {
    setNotSpam(true);
    const userOther = JSON.parse(window.sessionStorage.getItem("user"));
    let data;
    const dataByCm = dataRePly.filter((i) => i.idComment.idReviewUser === idCm);
    if (!userOther) {
      //kiem tra neu user da like khi bam like thi xoa di
      const datas = dataByCm[0].replyss
        .map((i) => i.like)[0]
        .filter((i) => i.userOther.toString() === idUserOther);

      if (datas.length > 0) {
        const idLike = datas[0]._id;
        if (idLike) {
          await removeLikeReplys(idRl, idLike);
        }
      }

      const id = dataByCm[0]._id;

      data = await addDislikeReplys(idUser, null, id, idRl, 1, idRv);
    } else {
      //kiem tra neu user da like khi bam like thi xoa di
      const datas = dataByCm[0].replyss
        .map((i) => i.like)[0]
        .filter((i) => i.userOther.toString() === idUserOther);

      if (datas.length > 0) {
        const idLike = datas[0]._id;
        if (idLike) {
          await removeLikeReplys(idRl, idLike);
        }
      }
      const id = dataByCm[0]._id;
      data = await addDislikeReplys(null, idUserOther, id, idRl, 1, idRv);
    }

    if (data) {
      setNotSpam(false);
      getReplysByComments();
      socket.emit("loadReply", data, idRv);
    }
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

  //show emoji review
  const showEmojiRv = () => {
    setShowPicker((e) => !e);
  };

  //show emoji reply cm
  const showEmojiRlCm = (idCm) => {
    if (checkOmojibyRl !== idCm) {
      setShowEmojiRl(true);
      setCheckOmojiByRl(idCm);
    } else {
      setShowEmojiRl((e) => !e);
    }
    setIdRlByEmoji(idCm);
  };

  //emoji click reply by cm
  const onEmojiClickByCm = (emojiObject) => {
    setShowEmojiRl(false);
    setCommentReplyOne((e) => e + emojiObject.emoji);
  };

  //emoji click
  const onEmojiClick = (emojiObject) => {
    setShowPicker(false);
    setComment((e) => e + emojiObject.emoji);
  };

  //show emojo rlrl
  const showEmojiRlrl = (idRl) => {
    if (checkEmojiRlRl !== idRl) {
      setShowEmojiRlRl(true);
      setCheckEmojiRlRl(idRl);
    } else {
      setShowEmojiRlRl((e) => !e);
    }
    setIdRLEmoji(idRl);
  };

  //on click emoji rlrl
  const onEmojiClickRlRl = (emojiObject) => {
    setShowEmojiRlRl(false);
    setCommentReplyOne((e) => e + emojiObject.emoji);
  };

  //show emoji edit rl
  const showEmojiEditRlrl = (idRl) => {
    if (checkOpenEmojiEditRl !== idRl) {
      setOpenEmojiEditRl(true);
      setCheckOpenEmojiEditRl(idRl);
    } else {
      setOpenEmojiEditRl((e) => !e);
    }
  };

  //on emoji edit rl
  const onClickEmojiEditRl = (emojiObject) => {
    setOpenEmojiEditRl(false);
    setCommentRl((e) => e + emojiObject.emoji);
  };

  //sap xep theo tich cuc
  const sortPositiveRv = async () => {
    const data = reviewData.filter((i) => i.star >= 3);
    if (data.length > 0) {
      setReviewData(data);
      setNameSortRv("Tích cực");
      setOpenSortCm(false);
    } else {
      alert("Không có bình luận tích cực nào!");
    }
  };

  //sap xep theo tieu cuc
  const sortNegative = async () => {
    const data = reviewData.filter((i) => i.star < 3);
    if (data.length > 0) {
      setReviewData(data);
      setNameSortRv("Tiêu cực");
      setOpenSortCm(false);
    } else {
      alert("Không có bình luận tiêu cực nào!");
    }
  };

  //mac dinh
  const sortDefault = async () => {
    const data = await getReviewById(product._id);
    if (data.reviews !== null) {
      setReviewData(data.reviews.review);
      setNameSortRv("Mặc định");
      setOpenSortCm(false);
    }
  };

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
    if (idRv) {
      getReplysByComments();
    }
  }, [idRv]);

  useEffect(() => {
    //review
    socket.on("new_comment", (data) => {
      setReviewData(data);
    });

    //reply
    socket.on("load_Reply", (data, idRvs) => {
      setDataReply(data.filter((i) => i.idComment.idReviewProduct === idRvs));
    });
  }, [socket]);

  // let uiComment =
  //   reviewDataRealTime.length > 0 ? reviewDataRealTime : reviewData;

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
                      ({reviewData.length || 0} đánh giá)
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
                Đánh giá ({reviewData.length})
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
                      ref={(w) =>
                        (comment && w?.focus()) || (textRv && w?.focus())
                      }
                    />
                    <div className="flex flex-col relative">
                      {/* emmoji */}

                      <span
                        className="cursor-pointer
                       mt-[20px]  duration-[0.5s] hover:bg-gray-300 w-[4%] p-[10px] flex items-center justify-center
                       rounded-[30px] "
                        onClick={showEmojiRv}
                      >
                        <MdEmojiEmotions
                          size="26px"
                          className="cursor-pointer"
                        />
                      </span>

                      {showPicker && (
                        <EmojiPicker
                          style={{
                            position: " absolute",
                            zIndex: "9999",
                            top: "50%",
                            width: "30%",
                          }}
                          onEmojiClick={onEmojiClick}
                        />
                      )}
                      <div className="flex">
                        {comment.length > 0 && (
                          <>
                            <button
                              className="p-[16px] bg-black text-white uppercase text-[14px] font-[500]
                    duration-[0.5s] hover:bg-green-600 rounded-[3px] w-[7%] mt-[20px] mr-[2%]"
                              onClick={exitComment}
                            >
                              Hủy
                            </button>
                          </>
                        )}
                        <button
                          className={`p-[16px] bg-black text-white uppercase text-[14px] font-[500]
                    duration-[0.5s] hover:bg-green-600 rounded-[3px] w-[14%] mt-[20px]
                    ${notSpam ? "pointer-events-none" : "pointer-events-auto"}`}
                          onClick={textRv ? editRv : addRv}
                        >
                          {textRv ? "Sửa" : "Đăng"} bình luận
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* sau khi dang binh luan */}
              <div className="w-[100%] mt-[30px] border-t-[2px] border-gray-200">
                {reviewData.length === 0 ? (
                  <>
                    <p className="text-[17px] font-[500] text-center p-[13px]">
                      Không có bình luận nào !
                    </p>
                  </>
                ) : (
                  <>
                    {/* sap xep comment */}
                    <div className="flex justify-end p-[10px] pt-[20px] items-center relative">
                      <span className="text-[14px] font-[500] pr-[5px]">
                        Sắp xếp:
                      </span>
                      <span
                        className="text-[14px] font-[500] cursor-pointer flex items-center"
                        onClick={() => setOpenSortCm((e) => !e)}
                      >
                        {nameSortRv}
                        <span>
                          <FaAngleDown
                            size="15px"
                            className={`ml-[5px] font-[450] ${
                              openSortCm ? "rotate-[180deg]" : "rotate-[0deg]"
                            } duration-[0.5s] `}
                          />
                        </span>
                      </span>
                    </div>
                    {/* menu sap xep comment */}
                    <div
                      className={`flex flex-col bg-white shadow-md rounded-[3px] absolute w-[8%] right-[10%] z-[10]
                      ${
                        !openSortCm
                          ? "opacity-[0] invisible"
                          : "opacity-[100] visible"
                      } duration-[0.5s]`}
                    >
                      <span
                        className="flex justify-center cursor-pointer text-[14px] font-[500] p-[10px] hover:bg-gray-200"
                        onClick={sortDefault}
                      >
                        Mặc định
                      </span>
                      <span
                        className="cursor-pointer flex justify-center text-[14px] font-[500]  p-[10px] hover:bg-gray-200"
                        onClick={sortPositiveRv}
                      >
                        Tích cực
                      </span>
                      <span
                        className="cursor-pointer flex justify-center text-[14px] font-[500]  p-[10px] hover:bg-gray-200"
                        onClick={sortNegative}
                      >
                        Tiêu cực
                      </span>
                    </div>

                    {reviewData.map((i) => {
                      return (
                        <>
                          <div className="">
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
                                            ix <= i.star
                                              ? "text-yellow-400"
                                              : ""
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
                                {(idUserOther === i?.userOther?._id ||
                                  idUser === i?.user?._id) &&
                                !comment ? (
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
                                {/* like, dislike, reply */}
                                <div className="flex absolute items-center bottom-[-32%]">
                                  <span
                                    className={`flex items-center pr-[12px]
                                 `}
                                  >
                                    <BiSolidLike
                                      size="18px"
                                      className={`cursor-pointer  ${
                                        notSpam
                                          ? "pointer-events-none"
                                          : "pointer-events-auto"
                                      } ${
                                        i.like.some(
                                          (y) =>
                                            y.user?._id.toString() === idUser
                                        ) ||
                                        i.like.some(
                                          (y) =>
                                            y.userOther?._id.toString() ===
                                            idUserOther
                                        )
                                          ? "text-blue-600"
                                          : ""
                                      } `}
                                      onClick={() => addlikess(i._id)}
                                    />
                                    <span className="text-[14px] font-[500] pl-[5px]">
                                      {i.like
                                        .map((i) => i.countLike)
                                        .reduce((a, b) => a + b, 0) || ""}
                                    </span>
                                  </span>
                                  <span className="pr-[8px]">
                                    <BiSolidDislike
                                      size="18px"
                                      className={`cursor-pointer ${
                                        notSpam
                                          ? "pointer-events-none"
                                          : "pointer-events-auto"
                                      } ${
                                        i.dislike.some(
                                          (y) =>
                                            y.user?._id.toString() === idUser
                                        ) ||
                                        i.dislike.some(
                                          (y) =>
                                            y.userOther?._id.toString() ===
                                            idUserOther
                                        )
                                          ? "text-blue-600"
                                          : ""
                                      }`}
                                      onClick={() => addDislikess(i._id)}
                                    />
                                  </span>
                                  <span className="text-[14px] font-[500] mr-[12px]">
                                    {i.dislike
                                      .map((i) => i.countDislike)
                                      .reduce((a, b) => a + b, 0) || ""}
                                  </span>
                                  <span
                                    className={`p-[5px] text-[11px] bg-gray-600 text-white font-[450]
                                rounded-[5px] cursor-pointer ${
                                  notSpam
                                    ? "pointer-events-none"
                                    : "pointer-events-auto"
                                }`}
                                    onClick={() => setInputReplyOne(i._id)}
                                  >
                                    Trả lời
                                  </span>
                                </div>

                                {/* menu edit, delete comment */}
                                <div
                                  className={`${
                                    i._id === idCm && openMenuRv
                                      ? "opacity-100 visible"
                                      : "opacity-0 invisible"
                                  } z-[9999] absolute border-[1px] right-[0] top-[67%]
                              border-gray-300 bg-white rounded-[2px] duration-[0.5s] `}
                                >
                                  <ul className="flex flex-col">
                                    <li
                                      className="cursor-pointer text-[15px] p-[17px] font-[500]
                                  duration-[0.5s] hover:bg-gray-200"
                                      onClick={() =>
                                        setEditRv(i.comment, i.star, i._id)
                                      }
                                      id="editCm"
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
                            {/* input tra loi */}
                            <div
                              className={`duration-[0.1s] ${
                                i._id === inputIdRlOne && openInputRlOnes
                                  ? "opacity-100 visivle mt-[0]"
                                  : "opacity-0  mt-[-10%] invisible"
                              } `}
                            >
                              <div className="flex ml-[7%]  mt-[3%] w-[93%] items-center">
                                <div className="mr-[10px]">
                                  <img
                                    src={userImage || userOtherImage}
                                    className="w-[30px] rounded-[30px] "
                                  />
                                </div>
                                <div
                                  className={`w-[100%] after:content-[''] after:border-gray-600
                                   after:absolute after:border-b-[2px] after:bottom-0 after:left-[0%]
                                   relative after:w-[100%]  after:duration-[0.5s]
                                  ${
                                    openInputRlOnes
                                      ? setTimeout(() => {
                                          "after:scale-x-100 after:scale-y-100 ";
                                        }, 100)
                                      : "after:scale-x-0 after:scale-y-100"
                                  } `}
                                  id="borderInputRl"
                                >
                                  <input
                                    type="text"
                                    placeholder="Trả lời..."
                                    className={`pt-[10px] pr-[10px] bg-slate-100
                                   w-[100%] outline-none  duration-[0.5s] 
                                 border-b-[3px] border-gray-300 
                                   `}
                                    value={commentReplyOne}
                                    onChange={(e) =>
                                      setCommentReplyOne(e.target.value)
                                    }
                                    ref={(inputRef) =>
                                      commentReplyOne
                                        ? commentReplyOne &&
                                          openInputRlOnes &&
                                          inputIdRlOne === i._id &&
                                          inputRef &&
                                          inputRef.focus()
                                        : openInputRlOnes &&
                                          inputIdRlOne === i._id &&
                                          inputRef &&
                                          setTimeout(() => {
                                            inputRef.focus();
                                          }, 100)
                                    }
                                    id="inputFocus"
                                  />
                                </div>
                              </div>
                              <div className=" relative">
                                {/* emoji input tl */}
                                <span className="">
                                  <MdEmojiEmotions
                                    size="22px"
                                    className="cursor-pointer w-[3%] h-[3%] p-[5px] 
                                      duration-[0.5s] hover:bg-gray-300 rounded-[30px] ml-[10%] mt-[1%]"
                                    onClick={() => showEmojiRlCm(i._id)}
                                  />
                                </span>
                                {showEmojiRl && (
                                  <EmojiPicker
                                    style={{
                                      position: " absolute",
                                      zIndex: "9999",
                                      top: "50%",
                                      width: "25%",
                                      marginLeft: "10%",
                                    }}
                                    onEmojiClick={onEmojiClickByCm}
                                  />
                                )}
                                <div className="flex items-center justify-end ml-[7%]">
                                  <span
                                    className="pt-[10px] pb-[10px] pl-[20px] pr-[20px] 
                                  bg-gray-200 text-[15px] font-[550]  cursor-pointer
                                  rounded-[10px] mr-[30px]
                                  duration-[0.5s] hover:bg-gray-400"
                                    onClick={exitReplyOne}
                                  >
                                    Hủy
                                  </span>
                                  <span
                                    className={`pt-[10px] pb-[10px] pl-[20px] pr-[20px] 
                                   bg-gray-200 text-[15px] font-[550] cursor-pointer
                                  rounded-[10px] flex jsutify-center items-center mr-[30px]
                                  duration-[0.5s] hover:bg-gray-400
                                  ${
                                    notSpam
                                      ? "pointer-events-none"
                                      : "pointer-events-auto"
                                  }`}
                                    onClick={() =>
                                      addReplysssss(
                                        i.user?._id,
                                        i.userOther?._id,
                                        idRv,
                                        i._id
                                      )
                                    }
                                  >
                                    Trả lời
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* so luong tra loi */}
                            {dataRePly.filter(
                              (x) => x.idComment.idReviewUser === i._id
                            )[0]?.replyss.length > 0 && (
                              <>
                                <div
                                  className="flex items-center text-gray-500 cursor-pointer hover:bg-gray-200 w-[10%] justify-center
                              p-[5px] rounded-[50px] ml-[7%]"
                                  onClick={() => setOpenReplys(i._id)}
                                >
                                  <span>
                                    <FaAngleDown
                                      size="15px"
                                      className={`mr-[5px] font-[450] ${
                                        openReply && idCmReplyOne === i._id
                                          ? "rotate-[180deg]"
                                          : "rotate-[0deg]"
                                      } duration-[0.5s] `}
                                    />
                                  </span>
                                  <span className="mr-[5px]">
                                    {
                                      dataRePly.filter(
                                        (x) =>
                                          x.idComment.idReviewUser === i._id
                                      )[0]?.replyss.length
                                    }
                                  </span>
                                  <span>Trả lời</span>
                                </div>
                              </>
                            )}

                            {/* reply */}
                            {dataRePly
                              .filter(
                                (x) => x.idComment.idReviewUser === i._id
                              )[0]
                              ?.replyss.map((a) => {
                                return (
                                  <>
                                    <div
                                      className={`w-[93%] ml-[7%] mb-[1.5%] duration-[0.1s] 
                            ${
                              openReply && i._id === idCmReplyOne
                                ? "opacity-100 visible mt-[0]"
                                : "opacity-0 invisible mt-[-10%]"
                            } `}
                                      key={a._id}
                                    >
                                      <div className="flex mt-[10px]">
                                        <span>
                                          <img
                                            src={
                                              a?.replyUserOther?.image ||
                                              a?.replyUser?.image
                                            }
                                            className="w-[40px] rounded-[30px] "
                                          />
                                        </span>
                                        <div
                                          className="bg-white border-[2px] border-gray-200 rounded-[3px] p-[10px]
                    before:content-[''] before:absolute relative before: ml-[20px] before:p-[6px]
                    before:bg-white before:top-[10%] before:left-[-0.7%] before:rotate-[45deg]
                    before:border-l-[2px] before:border-b-[2px] before:border-gray-200 w-[100%]
                    group
                    "
                                        >
                                          <div className="flex text-[14px] font-[500] pt-[2px]">
                                            <span className="uppercase">
                                              {a?.replyUser?.name ||
                                                a?.replyUserOther?.name}
                                              -
                                            </span>
                                            <span className="pl-[5px]">
                                              {getRelativeTime(
                                                a.createDate.toString()
                                              )}
                                            </span>
                                            <span className="text-[13px] text-gray-400 font-[500] pl-[5px]">
                                              {a.textEdit === ""
                                                ? ""
                                                : "- " +
                                                  "( " +
                                                  a.textEdit +
                                                  " )"}
                                            </span>
                                          </div>
                                          {a.checkReply === "true" &&
                                            (a.replyUser?._id !==
                                              a.receverUser?._id ||
                                              a.replyUserOther?._id !==
                                                a.receverUserOther?._id) && (
                                              <>
                                                <span className="text-[15px] font-[550] text-blue-600 absolute bottom-[15%]">
                                                  @
                                                  {a.receverUser?.name ||
                                                    a.receverUserOther?.name}
                                                </span>
                                              </>
                                            )}
                                          <input
                                            type="text"
                                            value={
                                              editReply && idReplyss === a._id
                                                ? commentRl
                                                : a.comment
                                            }
                                            className={`bg-gray-200 pt-[5px] pr-[10px] w-[100%]
                                    outline-none bg-white hover:cursor-text `}
                                            disabled={`${
                                              editReply && idReplyss === a._id
                                                ? ""
                                                : "disabled"
                                            }`}
                                            placeholder="Trả lời..."
                                            onChange={(e) =>
                                              setCommentRl(e.target.value)
                                            }
                                            ref={(inputReplyRef) =>
                                              inputReplyRef &&
                                              inputReplyRef.focus()
                                            }
                                            style={{
                                              paddingLeft: `calc(${
                                                (a.checkReply === "true" &&
                                                  a.receverUserOther?._id !==
                                                    a.replyUserOther?._id &&
                                                  a.receverUserOther?.name
                                                    .length - 2.5) ||
                                                (a.checkReply === "true" &&
                                                  a.receverUser?._id !==
                                                    a.replyUser?._id &&
                                                  a.receverUser?.name.length -
                                                    2.5)
                                              }%)`,
                                            }}
                                          />

                                          {(idUserOther ===
                                            a?.replyUserOther?._id ||
                                            idUser === a?.replyUser?._id) &&
                                          a._id !== idCmReply ? (
                                            <span
                                              className=" absolute right-[1%] top-[50%] cursor-pointer
                              group-hover:opacity-100
                              duration-[0.5s] group-hover:visible opacity-0 invisible
                              "
                                              onClick={() =>
                                                setOpenMenuReplys(a._id)
                                              }
                                            >
                                              <FaEllipsisV size="14px" />
                                            </span>
                                          ) : (
                                            ""
                                          )}

                                          {/* like, dislike, reply */}
                                          {(editReply && idReplyss !== a._id) ||
                                          !editReply ? (
                                            <>
                                              <div className="flex absolute items-center bottom-[-39%]">
                                                <span
                                                  className="flex items-center pr-[12px]"
                                                  onClick={() =>
                                                    addLikeReplysss(
                                                      a._id,
                                                      i._id
                                                    )
                                                  }
                                                >
                                                  <BiSolidLike
                                                    size="18px"
                                                    className={`cursor-pointer ${
                                                      notSpam
                                                        ? "pointer-events-none"
                                                        : "pointer-events-auto"
                                                    } 
                                                    ${
                                                      a.like.some(
                                                        (y) => y.user === idUser
                                                      ) ||
                                                      a.like.some(
                                                        (y) =>
                                                          y.userOther ===
                                                          idUserOther
                                                      )
                                                        ? "text-blue-600"
                                                        : ""
                                                    }
                                                    `}
                                                  />
                                                  <span className="text-[14px] font-[500] pl-[5px]">
                                                    {a.like.length || ""}
                                                  </span>
                                                </span>
                                                <span
                                                  className="pr-[12px] flex items-center"
                                                  onClick={() =>
                                                    addDisikeReplysss(
                                                      a._id,
                                                      i._id
                                                    )
                                                  }
                                                >
                                                  <BiSolidDislike
                                                    size="18px"
                                                    className={`cursor-pointer
                                                    ${
                                                      notSpam
                                                        ? "pointer-events-none"
                                                        : "pointer-events-auto"
                                                    }
                                                    ${
                                                      a.dislike.some(
                                                        (y) => y.user === idUser
                                                      ) ||
                                                      a.dislike.some(
                                                        (y) =>
                                                          y.userOther ===
                                                          idUserOther
                                                      )
                                                        ? "text-blue-600"
                                                        : ""
                                                    }
                                                    `}
                                                  />
                                                  <span className="text-[14px] font-[500] pl-[5px]">
                                                    {a.dislike.length || ""}
                                                  </span>
                                                </span>
                                                <span
                                                  className="p-[5px] text-[11px] bg-gray-600 text-white font-[450]
                                rounded-[5px] cursor-pointer"
                                                  onClick={() =>
                                                    setInputReplyTwos(
                                                      a._id,
                                                      a.replyUser?.name ||
                                                        a.replyUserOther?.name,
                                                      a.replyUser?._id ||
                                                        a.replyUserOther?._id
                                                    )
                                                  }
                                                >
                                                  Trả lời
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            ""
                                          )}

                                          {/* menu edit, delete comment */}
                                          <div
                                            className={`${
                                              a._id === idCmReply &&
                                              openMenuReply
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
                                                  setEditReplyTextValue(
                                                    a.comment,
                                                    a._id
                                                  )
                                                }
                                              >
                                                Sửa
                                              </li>
                                              <li
                                                className={`p-[17px] cursor-pointer text-[15px] font-[500] 
                                  duration-[0.5s] hover:bg-gray-200
                                  ${
                                    notSpam
                                      ? "pointer-events-none"
                                      : "pointer-events-auto"
                                  }`}
                                                onClick={() =>
                                                  removeReplyss(a._id, i._id)
                                                }
                                              >
                                                Xóa
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      {/* edit reply button */}
                                      {editReply && a._id === idReplyss ? (
                                        <>
                                          <div className="relative">
                                            {/* emoji input tl rl */}
                                            <span className="">
                                              <MdEmojiEmotions
                                                size="22px"
                                                className="cursor-pointer w-[3%] h-[3%] p-[5px] 
                                      duration-[0.5s] hover:bg-gray-300 rounded-[30px] ml-[5%] mt-[1%]"
                                                onClick={() =>
                                                  showEmojiEditRlrl(i._id)
                                                }
                                              />
                                            </span>
                                            {openEmojiEditRl && (
                                              <EmojiPicker
                                                style={{
                                                  position: " absolute",
                                                  zIndex: "9999",
                                                  top: "50%",
                                                  width: "25%",
                                                  marginLeft: "10%",
                                                }}
                                                onEmojiClick={
                                                  onClickEmojiEditRl
                                                }
                                              />
                                            )}
                                            <div className="flex items-center justify-end  ml-[7%]">
                                              <span
                                                className={` ${
                                                  editReply
                                                    ? "pt-[10px] pb-[10px]"
                                                    : ""
                                                } pb-[10px] pl-[20px] pr-[20px] 
                                  bg-gray-200 text-[15px] font-[550]  cursor-pointer
                                  rounded-[10px] mr-[30px]
                                  duration-[0.5s] hover:bg-gray-400`}
                                                onClick={exitReplyTextValue}
                                              >
                                                Hủy
                                              </span>
                                              <span
                                                className={`${
                                                  editReply
                                                    ? "pt-[10px] pb-[10px]"
                                                    : ""
                                                }
                                                 pl-[20px] pr-[20px] 
                                   bg-gray-200 text-[15px] font-[550] cursor-pointer
                                  rounded-[10px] flex jsutify-center items-center mr-[30px]
                                  duration-[0.5s] hover:bg-gray-400
                                  ${
                                    notSpam
                                      ? "pointer-events-none"
                                      : "pointer-events-auto"
                                  }`}
                                                onClick={() =>
                                                  editCommentRelyss(
                                                    a._id,
                                                    i._id
                                                  )
                                                }
                                              >
                                                Sửa
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                      {/* input tra loi 1 */}
                                      <div
                                        className={`duration-[0.1s] ${
                                          a._id === inputIdRlTwo && openReplyTwo
                                            ? "opacity-100 visivle mt-[0]"
                                            : "opacity-0 invisible mt-[-10%]"
                                        } `}
                                      >
                                        <div className="flex ml-[7%]  mt-[3%] w-[93%] items-center">
                                          <div className="mr-[10px]">
                                            <img
                                              src={userImage || userOtherImage}
                                              className="w-[30px] rounded-[30px] "
                                            />
                                          </div>
                                          <div
                                            className={`w-[100%] after:content-[''] after:border-gray-600
                                  relative after:absolute after:border-b-[2px] after:bottom-[0] after:left-[0%]
                                  after:duration-[0.5s] after:w-[100%]
                                  ${
                                    openReplyTwo
                                      ? setTimeout(() => {
                                          "after:scale-x-100 after:scale-y-100 ";
                                        }, 100)
                                      : "after:scale-x-0 after:scale-y-100 "
                                  } `}
                                          >
                                            {openReplyTwo && (
                                              <span className="text-[15px] font-[550] text-blue-600 absolute bottom-[4%]">
                                                {nameReply.length > 0
                                                  ? `@${nameReply}`
                                                  : ""}
                                              </span>
                                            )}
                                            <input
                                              type="text"
                                              placeholder="Trả lời..."
                                              className={`pt-[10px] pr-[10px] bg-slate-100
                                   w-[100%] outline-none border-b-[3px] border-gray-200 
                                   
                                   `}
                                              onChange={(e) =>
                                                setCommentReplyOne(
                                                  e.target.value
                                                )
                                              }
                                              value={commentReplyOne}
                                              style={{
                                                paddingLeft: `calc(${
                                                  nameReply.length <= 10
                                                    ? nameReply.length + 1
                                                    : nameReply.length > 0 &&
                                                      nameReply.length > 10
                                                    ? nameReply.length - 2
                                                    : nameReply.length
                                                }%)`,
                                              }}
                                              ref={(w) =>
                                                commentReplyOne
                                                  ? commentReplyOne &&
                                                    openReplyTwo &&
                                                    inputIdRlTwo === a._id &&
                                                    w &&
                                                    w.focus()
                                                  : openReplyTwo &&
                                                    inputIdRlTwo === a._id &&
                                                    w &&
                                                    setTimeout(() => {
                                                      w.focus();
                                                    }, 100)
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="relative">
                                          {/* emoji input tl rl */}
                                          <span className="">
                                            <MdEmojiEmotions
                                              size="22px"
                                              className="cursor-pointer w-[3%] h-[3%] p-[5px] 
                                      duration-[0.5s] hover:bg-gray-300 rounded-[30px] ml-[10%] mt-[1%]"
                                              onClick={() =>
                                                showEmojiRlrl(i._id)
                                              }
                                            />
                                          </span>
                                          {showEmojiRlRl && (
                                            <EmojiPicker
                                              style={{
                                                position: " absolute",
                                                zIndex: "9999",
                                                top: "50%",
                                                width: "25%",
                                                marginLeft: "10%",
                                              }}
                                              onEmojiClick={onEmojiClickRlRl}
                                            />
                                          )}
                                          <div className="flex items-center justify-end  ml-[7%]">
                                            <span
                                              className={` ${
                                                openReplyTwo
                                                  ? "pt-[10px] pb-[10px]"
                                                  : ""
                                              } pl-[20px] pr-[20px] 
                                  bg-gray-200 text-[15px] font-[550]  cursor-pointer
                                  rounded-[10px] mr-[30px]
                                  duration-[0.5s] hover:bg-gray-400`}
                                              onClick={exitReplyTwo}
                                            >
                                              Hủy
                                            </span>
                                            <span
                                              className={`${
                                                openReplyTwo
                                                  ? "pt-[10px] pb-[10px]"
                                                  : ""
                                              } pl-[20px] pr-[20px] 
                                   bg-gray-200 text-[15px] font-[550] cursor-pointer
                                  rounded-[10px] flex jsutify-center items-center mr-[30px]
                                  duration-[0.5s] hover:bg-gray-400
                                  ${
                                    notSpam
                                      ? "pointer-events-none"
                                      : "pointer-events-auto"
                                  }
                                  `}
                                              onClick={() =>
                                                addReplysssss(
                                                  a.receverUser?._id,
                                                  a.replyUserOther?._id,
                                                  idRv,
                                                  i._id,
                                                  "true"
                                                )
                                              }
                                            >
                                              Trả lời
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
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
              <div className="flex items-center justify-center pt-[1%]">
                <span className="text-[18px] font-[500]">
                  Không có sản phẩm
                </span>
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

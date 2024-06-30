const reviews = require("../modal/reviews");

//get all
const getAllReview = async (req, res) => {
  try {
    const data = await reviews
      .find()
      .populate("review.user")
      .populate("review.userOther")
      .populate("product")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    res
      .status(200)
      .json({ success: true, getALlReview: data, message: "get all rv true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get all review fail" });
  }
};

//get by idPro
const getByIdPro = async (req, res) => {
  const { product } = req.body;

  if (product === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    let starMax = 0;
    let starMaxs = [];
    let starCm = 0;

    const data = await reviews
      .findOne({ product })
      .populate("review.user")
      .populate("review.userOther")
      .populate("product")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    if (!data) {
      return res.status(202).json({
        success: true,
        reviews: data,
        numberStar: 0,
        message: "comment length = 0",
      });
    }

    //get star length max comment
    let datas = data.review.map((i) => i.star);

    for (let i = 0; i < 5; i++) {
      let length = datas.filter((is) => is === i + 1).length;
      starMaxs.push(length);
    }

    for (let i = 0; i < 5; i++) {
      if (starMaxs[i] >= starCm) {
        starCm = starMaxs[i];
        starMax = i + 1;
      }
    }

    res.status(200).json({
      success: true,
      reviews: data,
      numberStar: starMax,
      messsge: "get review by id pro true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get review by IDpro fail" });
  }
};

//add
const addReviews = async (req, res) => {
  const { product, user, userOther, star, comment } = req.body;
  if (
    product === "" ||
    user === "" ||
    userOther === "" ||
    star === "" ||
    comment === ""
  ) {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    //checkIdReview
    const checkId = await reviews.findOne({ product });

    if (!checkId) {
      const newReview = new reviews({
        product,
        review: {
          user,
          userOther,
          star,
          comment,
          createDate: new Date(),
        },
      });

      await newReview.save();

      const dataCm = await reviews
        .findOne({ product })
        .populate("product")
        .populate("review.user")
        .populate("review.userOther")
        .populate("review.like.user")
        .populate("review.like.userOther")
        .populate("review.dislike.user")
        .populate("review.dislike.userOther");

      return res
        .status(200)
        .json({ success: true, new: dataCm, message: "add review true" });
    }

    const pushReview = await reviews
      .findByIdAndUpdate(checkId._id, {
        $push: {
          review: {
            user,
            userOther,
            star,
            comment,
            createDate: new Date(),
          },
        },
      })
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    const dataCms = await reviews
      .findOne({ product })
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    return res
      .status(200)
      .json({ success: true, push: dataCms, message: "push review true" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "add review fail" });
  }
};

//edit
const editReviews = async (req, res) => {
  const { id, idComment, star, comment } = req.body;

  if (id === "" || idComment === "" || star === "" || comment === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    const data = await reviews.findById(id);

    const indexCm = data.review.findIndex(
      (i) => i._id.toString() === idComment
    );

    data.review[indexCm].comment = comment;
    data.review[indexCm].star = star;
    data.review[indexCm].createDate = new Date();
    data.review[indexCm].textEdit = "đã chỉnh sửa";

    await data.save();

    const datas = await reviews
      .findById(id)
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    res.status(200).json({
      success: true,
      editReview: datas,
      message: "edit review true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "edit review fail" });
  }
};

//delete comment
const deleteCommnet = async (req, res) => {
  const { id, idComment } = req.body;
  if (id === "" || idComment === "") {
    return res.stattus(400).json({ success: false, message: "not null" });
  }
  try {
    const data = await reviews
      .findByIdAndUpdate(id, {
        $pull: {
          review: {
            _id: idComment,
          },
        },
      })
      .populate("product");

    const datas = await reviews
      .findById(id)
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    res.status(200).json({
      success: true,
      deleteComment: datas,
      message: "delete comment true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delete  comment fail" });
  }
};

//delete
const deleteReviews = async (req, res) => {
  const { id } = req.params;
  if (id === "") {
    return res.status(400).json({ success: false, message: "not nullg" });
  }
  try {
    const data = await reviews
      .findByIdAndDelete(id)
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    res.status(200).json({
      success: true,
      deleteReview: data,
      message: "delete review true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delete review fail" });
  }
};

//add like
const addLike = async (req, res) => {
  const { userOther, user, like, idCm, id } = req.body;
  if (like === "" || id == "" || idCm === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    let data = await reviews
      .findById(id)
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    let indexUserCm = data.review
      .map((i) => i)
      .findIndex((i) => i._id.toString() === idCm);

    let userCm = data.review[indexUserCm];
    // console.log(userCm);

    // console.log(userCm.like.filter((i) => i.user?._id.toString() === user));

    //kiem tra neu like length < 0
    if (userCm.like.length === 0) {
      userCm.like.push({
        user: user,
        userOther: userOther,
        countLike: like,
      });
      await data.save();
      data = await reviews
        .findById(id)
        .populate("product")
        .populate("review.user")
        .populate("review.userOther")
        .populate("review.like.user")
        .populate("review.like.userOther")
        .populate("review.dislike.user")
        .populate("review.dislike.userOther");
    } else {
      let getIdLike;
      let userLike;
      if (user) {
        userLike = userCm.like.filter((i) => i.user?._id.toString() === user);
      } else {
        userLike = userCm.like.filter(
          (i) => i.userOther?._id.toString() === userOther
        );
      }

      //kiem tra neu da like thi` tru di gnuoc thi them
      if (userLike.length > 0) {
        getIdLike = userLike[0]._id;
        data = await reviews.findByIdAndUpdate(
          id,
          {
            $pull: {
              "review.$[].like": { _id: getIdLike },
            },
          },
          { new: true }
        );
        data = await reviews
          .findById(id)
          .populate("product")
          .populate("review.user")
          .populate("review.userOther")
          .populate("review.like.user")
          .populate("review.like.userOther")
          .populate("review.dislike.user")
          .populate("review.dislike.userOther");
      } else {
        userCm.like.push({
          user: user,
          userOther: userOther,
          countLike: like,
        });
        await data.save();
        data = await reviews
          .findById(id)
          .populate("product")
          .populate("review.user")
          .populate("review.userOther")
          .populate("review.like.user")
          .populate("review.like.userOther")
          .populate("review.dislike.user")
          .populate("review.dislike.userOther");
      }
    }
    res
      .status(200)
      .json({ success: true, data: data, message: "add like true" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "add like fail" });
  }
};

//add dislike
const addDislike = async (req, res) => {
  const { userOther, user, disLikes, idCm, id } = req.body;
  if (disLikes === "" || id == "" || idCm === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    let data = await reviews
      .findById(id)
      .populate("product")
      .populate("review.user")
      .populate("review.userOther")
      .populate("review.like.user")
      .populate("review.like.userOther")
      .populate("review.dislike.user")
      .populate("review.dislike.userOther");

    let indexUserCm = data.review
      .map((i) => i)
      .findIndex((i) => i._id.toString() === idCm);

    let userCm = data.review[indexUserCm];

    //kiem tra neu like length < 0
    if (userCm.dislike.length === 0) {
      userCm.dislike.push({
        user: user,
        userOther: userOther,
        countDislike: disLikes,
      });
      await data.save();
      data = await reviews
        .findById(id)
        .populate("product")
        .populate("review.user")
        .populate("review.userOther")
        .populate("review.like.user")
        .populate("review.like.userOther")
        .populate("review.dislike.user")
        .populate("review.dislike.userOther");
    } else {
      let userdislike;
      let getIddislike;
      if (user) {
        userdislike = userCm.dislike.filter(
          (i) => i.user?._id.toString() === user
        );
      } else {
        userdislike = userCm.dislike.filter(
          (i) => i.userOther?._id.toString() === userOther
        );
      }

      //kiem tra neu da dislike thi` tru di gnuoc thi them
      if (userdislike.length > 0) {
        getIddislike = userdislike[0]._id;

        data = await reviews.findByIdAndUpdate(
          id,
          {
            $pull: {
              "review.$[].dislike": { _id: getIddislike },
            },
          },
          { new: true }
        );
        data = await reviews
          .findById(id)
          .populate("product")
          .populate("review.user")
          .populate("review.userOther")
          .populate("review.like.user")
          .populate("review.like.userOther")
          .populate("review.dislike.user")
          .populate("review.dislike.userOther");
      } else {
        userCm.dislike.push({
          user: user,
          userOther: userOther,
          countDislike: disLikes,
        });
        await data.save();
        data = await reviews
          .findById(id)
          .populate("product")
          .populate("review.user")
          .populate("review.userOther")
          .populate("review.like.user")
          .populate("review.like.userOther")
          .populate("review.dislike.user")
          .populate("review.dislike.userOther");
      }
    }
    res
      .status(200)
      .json({ success: true, data: data, message: "add dis like true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "add dislike fail" });
  }
};

//remove like
const removeLike = async (req, res) => {
  const { id } = req.params;
  const { idLike } = req.body;
  if (id === "" || idLike === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    const data = await reviews.findOneAndUpdate(
      {
        "review._id": id,
      },
      {
        $pull: {
          "review.$[].like": { _id: idLike },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, data: data, message: "delete disliek true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delete dislike fail" });
  }
};

//remove dislike
const removeDislike = async (req, res) => {
  const { id } = req.params;
  const { idDisLike } = req.body;
  if (id === "" || idDisLike === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    const data = await reviews.findOneAndUpdate(
      {
        "review._id": id,
      },
      {
        $pull: {
          "review.$[].dislike": { _id: idDisLike },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, data: data, message: "delete disliek true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delete dislike fail" });
  }
};

module.exports = {
  getAllReview,
  getByIdPro,
  addReviews,
  editReviews,
  deleteCommnet,
  deleteReviews,
  addLike,
  addDislike,
  removeLike,
  removeDislike,
};

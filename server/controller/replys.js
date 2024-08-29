const replys = require("../modal/replys");

const getAll = async (req, res) => {
  try {
    const data = await replys
      .find()
      .populate("replyss.replyUser")
      .populate("replyss.replyUserOther")
      .populate("replyss.receverUser")
      .populate("replyss.receverUserOther");

    res
      .status(200)
      .json({ success: true, data: data, message: "get all reply true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "get all reply fail" });
  }
};

const getByIdComment = async (req, res) => {
  const { idProduct } = req.body;
  if (idProduct === "") {
    return res.status(404).json({ success: false, message: "not null" });
  }
  try {
    const dataAll = await replys
      .find()
      .populate("replyss.replyUser")
      .populate("replyss.replyUserOther")
      .populate("replyss.receverUser")
      .populate("replyss.receverUserOther");

    let data = dataAll.filter(
      (i) => i.idComment.idReviewProduct.toString() === idProduct
    );

    res
      .status(200)
      .json({ success: true, data: data, message: "get by idCm true" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: "get by id comment reply fail" });
  }
};

const addReply = async (req, res) => {
  const {
    idComment,
    replyUser,
    replyUserOther,
    receverUser,
    receverUserOther,
    comment,
    idReviewProduct,
    idReviewUser,
    checkReply,
  } = req.body;

  if (
    idComment === "" ||
    replyUser === "" ||
    replyUserOther === "" ||
    receverUser === "" ||
    receverUserOther === "" ||
    comment === "" ||
    idReviewProduct === "" ||
    idReviewUser === ""
  ) {
    return res.status(400).json({ success: false, message: " not null" });
  }

  try {
    let data;
    const datas = await replys.find();

    data = datas.filter(
      (i) =>
        i.idComment.idReviewProduct.toString() === idReviewProduct &&
        i.idComment.idReviewUser.toString() === idReviewUser
    );

    // const indexReply = datas.findIndex(
    //   (i) =>
    //     i.idComment.idReviewProduct.toString() === idReviewProduct &&
    //     i.idComment.idReviewUser.toString() === idReviewUser
    // );

    if (data.length > 0) {
      const id = data[0]._id;

      data = await replys.findByIdAndUpdate(
        id,
        {
          $push: {
            replyss: {
              createDate: new Date(),
              replyUser,
              replyUserOther,
              receverUser,
              receverUserOther,
              comment,
              checkReply,
            },
          },
        },
        { new: true }
      );
      data = await replys
        .find()
        .populate("replyss.replyUser")
        .populate("replyss.replyUserOther")
        .populate("replyss.receverUser")
        .populate("replyss.receverUserOther");
      data = data.filter(
        (i) => i.idComment.idReviewProduct.toString() === idReviewProduct
      );
    } else {
      const newData = new replys({
        idComment: {
          idReviewProduct,
          idReviewUser,
        },
        replyss: {
          createDate: new Date(),
          replyUser,
          replyUserOther,
          receverUser,
          receverUserOther,
          comment,
          checkReply,
        },
      });

      await newData.save();
      data = await replys
        .find()
        .populate("replyss.replyUser")
        .populate("replyss.replyUserOther")
        .populate("replyss.receverUser")
        .populate("replyss.receverUserOther");
      data = data.filter(
        (i) => i.idComment.idReviewProduct.toString() === idReviewProduct
      );
    }

    res
      .status(200)
      .json({ success: true, data: data, message: "add reply true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "add  reply fail" });
  }
};

const editReply = async (req, res) => {
  const { id } = req.params;
  const { comment, textEdit, idReply, idRv, idReviewProduct } = req.body;
  if (
    id === "" ||
    comment === "" ||
    textEdit === "" ||
    idReply === "" ||
    idRv === "" ||
    idReviewProduct === ""
  ) {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    let data;
    const datas = await replys
      .find()
      .populate("replyss.replyUser")
      .populate("replyss.replyUserOther")
      .populate("replyss.receverUser")
      .populate("replyss.receverUserOther");

    const index = datas.findIndex(
      (i) => i.idComment.idReviewUser.toString() === idRv
    );

    data = datas[index].replyss.filter((i) => i._id.toString() === idReply);

    data = data[0];

    data.comment = comment;
    data.createDate = new Date();
    data.textEdit = textEdit;

    await datas[index].save();

    data = datas;

    res
      .status(200)
      .json({ success: true, data: data, message: "edit reply true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "edit  reply fail" });
  }
};

const removeReply = async (req, res) => {
  const { id } = req.params;
  const { idReply } = req.body;

  if (id === "" || idReply === "") {
    return res.status(404).json({ success: false, message: "not null" });
  }
  try {
    const datas = await replys.findByIdAndUpdate(
      id,
      {
        $pull: {
          replyss: {
            _id: idReply,
          },
        },
      },
      { new: true }
    );

    const data = await replys
      .find()
      .populate("replyss.replyUser")
      .populate("replyss.replyUserOther")
      .populate("replyss.receverUser")
      .populate("replyss.receverUserOther");

    res
      .status(200)
      .json({ success: true, data: data, message: "remove reply true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "remove  reply fail" });
  }
};

const deleteReply = async (req, res) => {
  const { id } = req.params;
  if (id === "") {
    return res.status(404).json({ success: false, message: "not null" });
  }
  try {
    const data = await replys.findByIdAndDelete(id, { new: true });

    res
      .status(200)
      .json({ success: true, data: data, message: "delete reply true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "remove  reply fail" });
  }
};

const addLike = async (req, res) => {
  const { id, idReply, user, userOther, like, idReviewProduct } = req.body;
  if (
    id === "" ||
    idReply === "" ||
    user === "" ||
    userOther === "" ||
    like === "" ||
    idReviewProduct === ""
  ) {
    return res.status(404).json({ success: false, message: "not null" });
  }
  try {
    const datas = await replys.findById(id);

    let data = datas.replyss.filter((i) => i._id.toString() === idReply)[0];

    let checkUserLike;
    if (user) {
      checkUserLike = data.like.filter((i) => i.user?._id.toString() === user);
    } else {
      checkUserLike = data.like.filter(
        (i) => i.userOther?._id.toString() === userOther
      );
    }

    if (checkUserLike.length > 0) {
      const idLike = checkUserLike[0]._id;

      data = await replys.findOneAndUpdate(
        {
          "replyss._id": idReply,
        },
        {
          $pull: {
            "replyss.$[].like": { _id: idLike },
          },
        },
        { new: true }
      );
      data = await replys
        .find()
        .populate("replyss.replyUser")
        .populate("replyss.replyUserOther")
        .populate("replyss.receverUser")
        .populate("replyss.receverUserOther");
      data = data.filter(
        (i) => i.idComment.idReviewProduct.toString() === idReviewProduct
      );
    } else {
      data.like.push({
        user: user,
        userOther: userOther,
        countLike: like,
      });
      await datas.save();
      data = await replys
        .find()
        .populate("replyss.replyUser")
        .populate("replyss.replyUserOther")
        .populate("replyss.receverUser")
        .populate("replyss.receverUserOther");
      data = data.filter(
        (i) => i.idComment.idReviewProduct.toString() === idReviewProduct
      );
    }

    res
      .status(200)
      .json({ success: true, data: data, message: "add like reply true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "add like fail" });
  }
};

const addDislike = async (req, res) => {
  const { id, idReply, user, userOther, dislike, idReviewProduct } = req.body;
  if (
    id === "" ||
    idReply === "" ||
    user === "" ||
    userOther === "" ||
    dislike === "" ||
    idReviewProduct === ""
  ) {
    return res.status(404).json({ success: false, message: "not null" });
  }
  try {
    let data;
    const datas = await replys.findById(id);

    data = datas.replyss.filter((i) => i._id.toString() === idReply)[0];

    let checkUSerDislike;
    if (user) {
      checkUSerDislike = data.dislike.filter(
        (i) => i.user?._id.toString() === user
      );
    } else {
      checkUSerDislike = data.dislike.filter(
        (i) => i.userOther?._id.toString() === userOther
      );
    }

    if (checkUSerDislike.length > 0) {
      let idDislike = checkUSerDislike[0]._id;
      data = await replys.findOneAndUpdate(
        { "replyss._id": idReply },
        {
          $pull: {
            "replyss.$[].dislike": { _id: idDislike },
          },
        },
        { new: true }
      );
      data = await replys
        .find()
        .populate("replyss.replyUser")
        .populate("replyss.replyUserOther")
        .populate("replyss.receverUser")
        .populate("replyss.receverUserOther");
      data = data.filter(
        (i) => i.idComment.idReviewProduct.toString() === idReviewProduct
      );
    } else {
      data.dislike.push({
        user: user,
        userOther: userOther,
        countDislike: dislike,
      });
      await datas.save();
      data = await replys
        .find()
        .populate("replyss.replyUser")
        .populate("replyss.replyUserOther")
        .populate("replyss.receverUser")
        .populate("replyss.receverUserOther");
      data = data.filter(
        (i) => i.idComment.idReviewProduct.toString() === idReviewProduct
      );
    }
    res
      .status(200)
      .json({ success: true, data: data, message: "add dislike true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "add disliek fail" });
  }
};

const removeAddLike = async (req, res) => {
  const { id } = req.params;
  const { idLike } = req.body;
  if (idLike === "" || id === "") {
    return res.status(400).josn({ success: false, message: "not null" });
  }

  try {
    const data = await replys.findOneAndUpdate(
      { "replyss._id": id },
      {
        $pull: {
          "replyss.$[].like": { _id: idLike },
        },
      },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, data: data, message: "remove like true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "remove like fail" });
  }
};

const removeAddDisLike = async (req, res) => {
  const { id } = req.params;
  const { idDislike } = req.body;
  if (id === "" || idDislike === "") {
    return res.status(400).josn({ success: false, message: "nont null" });
  }
  try {
    const data = await replys.findOneAndUpdate(
      { "replyss._id": id },
      {
        $pull: {
          "replyss.$[].dislike": { _id: idDislike },
        },
      },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, data: data, message: "remove disliek true" });
  } catch (error) {
    res.status(404).json({ success: false, message: "remove dislike fail" });
  }
};

module.exports = {
  getAll,
  getByIdComment,
  addReply,
  editReply,
  removeReply,
  addLike,
  addDislike,
  removeAddLike,
  removeAddDisLike,
  deleteReply,
};

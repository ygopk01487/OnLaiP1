const ListLove = require("../modal/listLove");

//get all
const getAllListLove = async (req, res) => {
  try {
    const data = await ListLove.find()
      .populate("user", ["name", "image", "email"])
      .populate("products")
      .populate("userOther");

    res
      .status(200)
      .json({ success: true, listLove: data, message: "get all love true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get all love fail !!!" });
  }
};

//add
const addListLove = async (req, res) => {
  const { user, products, userOther } = req.body;

  if (products === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }

  try {
    //check id
    const checkList = await ListLove.findOne(
      {
        userOther,
      },
      { user }
    )
      .populate("user", ["name", "image", "email"])
      .populate("products")
      .populate("userOther");

    //add
    if (!checkList) {
      const newListLove = new ListLove({
        products,
        user,
        userOther,
      });

      await newListLove.save();

      return res.status(200).json({
        success: true,
        newList: newListLove,
        message: "add love true",
      });
    }

    //update
    const updateListLove = await ListLove.findByIdAndUpdate(checkList._id, {
      $push: {
        products,
      },
    });

    res.status(200).json({
      success: true,
      UpdateListLove: updateListLove,
      message: "update love true!!!",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "add  love fail !!!" });
  }
};

//delete
const deleteListLove = async (req, res) => {
  const { id } = req.params;

  if (id === "" || id === undefined) {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    const deleted = await ListLove.findByIdAndDelete(id);

    res
      .status(200)
      .json({
        success: true,
        deleteLove: deleted,
        message: "delete love true",
      });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delte  love fail !!!" });
  }
};

//delete pro list love
const deleteProListLove = async (req, res) => {
  const { products } = req.body;
  const { id } = req.params;

  try {
    const deletePro = await ListLove.findByIdAndUpdate(id, {
      $pull: { products },
    })
      .populate("products")
      .populate("userOther")
      .populate("user");

    res.status(200).json({
      success: true,
      dataDeleted: deletePro,
      message: "delete pro true !!!",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delte  pro love fail !!!" });
  }
};

//get by user list love
const getByUSerListLove = async (req, res) => {
  const { userOther, user } = req.body;

  try {
    const data = await ListLove.findOne({ userOther }, { user })
      .populate("products")
      .populate("user")
      .populate("userOther");

    res.status(200).json({
      success: true,
      userListLove: data,
      message: "get user list love true!",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get  by user love fail !!!" });
  }
};

module.exports = {
  getAllListLove,
  addListLove,
  deleteListLove,
  deleteProListLove,
  getByUSerListLove,
};

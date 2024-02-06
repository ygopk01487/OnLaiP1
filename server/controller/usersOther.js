const UsersOther = require("../modal/usersOther");

//add
const addUsersOther = async (req, res) => {
  const { name, email, image, localId } = req.body;

  if ((name === "" || email === "", image === "", localId === "")) {
    return res
      .status(404)
      .json({ success: false, message: "value not null add user other" });
  }

  try {
    const checklocalId = await UsersOther.findOne({ localId });

    if (checklocalId) {
      if (localId === checklocalId.localId) {
        return res.status(200).json({ success: false, message: "added" });
      }
    } else {
      const newUsersOther = new UsersOther({
        name,
        email,
        image,
        localId,
      });

      await newUsersOther.save();

      res.status(200).json({
        success: true,
        usersOther: newUsersOther,
        message: "add user other true!!",
      });
    }
  } catch (error) {
    console.log("add user other fail sv");
  }
};

//get by id
const getByIdUsersOther = async (req, res) => {
  const { localId } = req.body;

  try {
    const data = await UsersOther.findOne({ localId });
    res.status(200).json({
      success: true,
      userOtherId: data,
      message: "get by id user other true",
    });
  } catch (error) {
    console.log("get by id other fail sv");
  }
};
//get all
const getAll = async (req, res) => {
  try {
    const data = await UsersOther.find();
    res.status(200).json({
      success: true,
      usersOther: data,
      message: "add user other true!!",
    });
  } catch (error) {
    console.log("get all  other fail sv");
  }
};

const deleteUserOther = async (req, res) => {
  const { id } = req.params;

  // if (id === "" || "undefined") {
  //   return res.status(400).json({ success: false, message: "not null" });
  // }

  try {
    const userDelete = await UsersOther.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      delete: userDelete,
      message: "delete user other true",
    });
  } catch (error) {
    console.log("delete user  other fail sv");
  }
};

module.exports = {
  addUsersOther,
  getByIdUsersOther,
  getAll,
  deleteUserOther,
};

const Products = require("../modal/products");

//lay full danh sach phan trang, sap xep, tim kiem
const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let names = req.query.name || "";
  let category = req.query.category || "";
  const sort = req.query.sort || "";
  let type = req.query.type || "";
  const pageSize = parseInt(req.query.pageSize) || 3;
  const skipPage = pageSize * (page - 1);

  if (type === "increase") type = 1;
  else if (type === "reduce") type = -1;

  const sortBy = {};
  if (sort !== "") {
    sortBy[sort] = type;
  }

  try {
    const totalProducts = await Products.find({
      $or: [{ name: { $regex: names, $options: "i" } }, { category }],
    }).count();

    const data = await Products.find({
      $or: [{ name: { $regex: names, $options: "i" } }],
    })
      .sort(sortBy)
      .limit(pageSize)
      .skip(skipPage);

    // console.log(data);
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "get all pro fail" });
    }
    res.status(200).json({
      success: true,
      totalPage: Math.ceil(totalProducts / pageSize),
      page: page,
      products: data,
      message: "get all pro true",
    });
  } catch (error) {
    console.log("Get all products fail");
  }
};

//lay danh sach theo id
const getIdProducts = async (req, res) => {
  const { id } = req.params;

  if (id === "") {
    return res.status(400).json({ success: false, message: "id pro not null" });
  }
  try {
    const data = await Products.findById(id);
    if (!data) {
      res.status(400).json({ success: false, message: "get id pro fail" });
    }
    res
      .status(200)
      .json({ success: true, produtcsId: data, message: "get ID pro true" });
  } catch (error) {
    console.log("Get ID products fail");
  }
};

//them san pharm
const addProducts = async (req, res) => {
  const { name, category, price, discount, image, describe } = req.body;

  if (
    name === "" ||
    category === "" ||
    price === "" ||
    discount === "" ||
    image === "" ||
    describe === ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "value not null add pro" });
  }

  try {
    const newProducts = new Products({
      name,
      category,
      price,
      discount,
      image,
      describe,
    });

    await newProducts.save();
    res
      .status(200)
      .json({ success: true, newPro: newProducts, message: "add pro true" });
  } catch (error) {
    console.log("add  products fail");
  }
};

//sua
const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, discount, image, describe } = req.body;
  if (
    name === "" ||
    category === "" ||
    price === "" ||
    discount === "" ||
    image === "" ||
    describe === "" ||
    id === ""
  ) {
    return res
      .status(400)
      .json({ success: false, message: "value not null update pro" });
  }
  try {
    const newProducts = await Products.findByIdAndUpdate(id, {
      name,
      category,
      price,
      discount,
      image,
      describe,
    });

    if (!newProducts) {
      return res
        .status(400)
        .json({ success: false, message: "update pro fail" });
    }

    res
      .status(200)
      .json({ success: true, newPro: newProducts, message: "update pro true" });
  } catch (error) {
    console.log("update  products fail");
  }
};

//xoa
const delteProducts = async (req, res) => {
  const { id } = req.params;
  if (id === "")
    return res
      .status(400)
      .json({ success: false, message: "id not null delete pro" });
  try {
    const deleteProduct = await Products.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res
        .status(400)
        .json({ success: false, message: "delete pro fail!!!!!!!!!" });
    }
    res.status(200).json({
      success: true,
      produtc: deleteProduct,
      message: "delete pro true",
    });
  } catch (error) {
    console.log("delte  products fail");
  }
};

module.exports = {
  getAllProducts,
  getIdProducts,
  addProducts,
  updateProducts,
  delteProducts,
};

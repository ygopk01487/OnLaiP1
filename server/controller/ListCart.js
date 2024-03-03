let mongoose = require("mongoose");
const ListCarts = require("../modal/listCarts");

//get all
const getAllCart = async (req, res) => {
  try {
    const data = await ListCarts.find()
      .populate("products")
      .populate("products.productId")
      .populate("userOther")
      .populate("user");

    res
      .status(200)
      .json({ success: true, allCart: data, message: "get all cart true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get all cart fail" });
  }
};

//get by user
const getByUserCart = async (req, res) => {
  const { user, userOther } = req.body;

  try {
    let data;
    if (user) {
      data = await ListCarts.findOne({ user })
        .populate("products")
        .populate("products.productId")
        .populate("user", ["name", "email"])
        .populate("userOther");
    } else {
      data = await ListCarts.findOne({ userOther })
        .populate("products")
        .populate("products.productId")
        .populate("user", ["name", "email"])
        .populate("userOther");
    }

    //get quantity
    const lengthCart = data.products
      .map((i) => parseInt(i.quantity))
      .reduce((a, b) => a + b, 0);

    return res.status(200).json({
      success: true,
      cartUser: data,
      cartLength: lengthCart,
      message: "get cart by user true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get by user cart fail" });
  }
};

//add
const addCart = async (req, res) => {
  const { product, quantity, total, user, userOther, totalPrice, sale } =
    req.body;

  if (product === "" || quantity === "" || total === "" || totalPrice === "") {
    return res.status(400).json({ success: false, message: "data not null" });
  }
  try {
    //check id cart
    let chekcIDCart;
    let checkIdPro;
    if (user) {
      chekcIDCart = await ListCarts.findOne({ user })
        .populate("products")
        .populate("products.productId")
        .populate("user")
        .populate("userOther");
    } else {
      chekcIDCart = await ListCarts.findOne({ userOther })
        .populate("products")
        .populate("products.productId")
        .populate("user")
        .populate("userOther");
    }

    if (!chekcIDCart) {
      const newData = new ListCarts({
        products: { productId: product, quantity, total },
        user,
        userOther,
        totalPrice,
        sale,
      });

      await newData.save();

      return res
        .status(200)
        .json({ success: true, newCart: newData, message: " add cart true" });
    }

    //check idPro cart
    checkIdPro = chekcIDCart.products.some(
      (i) => i.productId._id.toString() === product
    );

    //check id product
    if (checkIdPro) {
      //get pro
      const proDetail = chekcIDCart.products.filter(
        (i) => i.productId._id.toString() === product
      );

      //lay so thu thu trong mang
      const index = chekcIDCart.products.findIndex(
        (i) => i.productId._id.toString() === product
      );

      //quantity
      const quantitys = proDetail.map((i) => i.quantity);

      chekcIDCart.products[index].quantity = parseInt(quantitys) + quantity;

      await chekcIDCart.save();

      const updateCarts = await ListCarts.findByIdAndUpdate(chekcIDCart._id, {
        totalPrice: chekcIDCart.totalPrice + totalPrice,
      })
        .populate("products")
        .populate("products.productId")
        .populate("user")
        .populate("userOther");

      return res.status(200).json({
        success: true,
        updateCarts: updateCarts,
        message: "update carts true",
      });
    }

    const updateCart = await ListCarts.findByIdAndUpdate(chekcIDCart._id, {
      $push: {
        products: {
          productId: product,
          quantity,
          total,
        },
      },
      totalPrice:
        chekcIDCart.products.length > 0
          ? chekcIDCart.totalPrice + totalPrice
          : totalPrice,
      sale,
    })
      .populate("products")
      .populate("products.productId")
      .populate("user")
      .populate("userOther");

    return res.status(200).json({
      success: true,
      pushCart: updateCart,
      message: "update cart true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get add cart fail" });
  }
};

//edit
const editCart = async (req, res) => {
  const { id } = req.params;
  const { quantity, product, total, type } = req.body;
  if (
    id === "" ||
    quantity === "" ||
    product === "" ||
    total === "" ||
    type === ""
  ) {
    return res.status(400).json({ success: false, message: "not null" });
  }
  try {
    const pro = await ListCarts.findById(id)
      .populate("products")
      .populate("products.productId");

    const totalPro = total * quantity;
    const price = pro.totalPrice;

    const proDetail = pro.products.filter(
      (i) => i.productId._id.toString() === product
    );

    //lay so thu tu ptu trong amng
    const itemIdex = pro.products.findIndex(
      (i) => i.productId._id.toString() === product
    );

    const quantitys = proDetail.map((i) => i.quantity);

    pro.products[itemIdex].quantity =
      type === "tang"
        ? parseInt(quantitys) + quantity
        : parseInt(quantitys) - quantity;

    await pro.save();

    const data = await ListCarts.findByIdAndUpdate(id, {
      totalPrice: type === "tang" ? price + totalPro : price - totalPro,
    })
      .populate("products.productId")
      .populate("products")
      .populate("user")
      .populate("userOther");

    res
      .status(200)
      .json({ success: true, udpateCart: data, message: "update cart true" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "edit  cart fail" });
  }
};

//delete list pro
const deleteListProCart = async (req, res) => {
  const { id } = req.params;
  const { product } = req.body;

  if (id === "" || product === "") {
    return res.status(400).json({ success: false, message: "not null!" });
  }
  try {
    const products = await ListCarts.findById(id).populate(
      "products.productId"
    );

    const priceCart = products.totalPrice;

    let productss = products.products.filter(
      (i) => i.productId._id.toString() === product
    );

    pricePro = productss.map((i) => i.total * i.quantity);

    const data = await ListCarts.findByIdAndUpdate(id, {
      $pull: {
        products: {
          productId: product,
        },
      },
      totalPrice: priceCart - parseInt(pricePro),
      sale: 0,
    })
      .populate("products")
      .populate("products.productId")
      .populate("user")
      .populate("userOther");

    res.status(200).json({
      success: true,
      deleteListProCart: data,
      message: "delete list pro cart true",
    });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delete listPro cart  fail" });
  }
};

//delete cart
const deleteCart = async (req, res) => {
  const { id } = req.params;

  if (id === "") {
    return res.status(400).json({ success: false, message: "not null" });
  }

  try {
    const data = await ListCarts.findByIdAndDelete(id)
      .populate("products")
      .populate("products.productId")
      .populate("user")
      .populate("userOther");

    res
      .status(200)
      .json({ success: true, deleteCart: data, message: "delete cart true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: " delete cart fail" });
  }
};

module.exports = {
  getAllCart,
  getByUserCart,
  addCart,
  editCart,
  deleteListProCart,
  deleteCart,
};

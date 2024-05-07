const ListCarts = require("../modal/listCarts");
const OrderProdcts = require("../modal/orders");
const { sendMails } = require("../sendMail/senMails");

//get all
const getAllOrder = async (req, res) => {
  try {
    const datas = await OrderProdcts.find()
      .populate("usersOther")
      .populate("usersOther")
      .populate("products")
      .populate("products.productId");

    res
      .status(200)
      .json({ success: true, data: datas, message: "get all order true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get all order fali" });
  }
};

//get orderf by user
const getOrderByUser = async (req, res) => {
  const { users, usersOther } = req.body;

  try {
    let data;
    const datas = await OrderProdcts.find()
      .populate("users")
      .populate("usersOther")
      .populate("products")
      .populate("products.productId");
    if (users) {
      data = datas.filter((i) => i.users._id.toString() === users);
    } else {
      data = datas.filter((i) => i.usersOther._id.toString() === usersOther);
    }

    return res
      .status(200)
      .json({ success: true, data: data, message: "get by user Orher true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "get by user order fali" });
  }
};

//add order
const addOrders = async (req, res) => {
  const {
    country,
    phone,
    address,
    notes,
    products,
    sale,
    users,
    usersOther,
    totalPrices,
  } = req.body;

  if (
    country === "" ||
    phone === "" ||
    address === "" ||
    notes === "" ||
    products === "" ||
    totalPrices === ""
  ) {
    return res.status(400).json({ success: false, message: "not null" });
  }

  try {
    let newData;

    const valueSale = sale.map((i) => i.value).reduce((a, b) => a + b, 0);

    if (users) {
      newData = new OrderProdcts({
        users,
        usersOther: null,
        totalPrice: totalPrices,
        totalPriceSale: totalPrices * ((100 - valueSale) / 100),
        details: {
          country,
          address,
          notes,
          phone,
        },
        createDate: new Date(),
      });

      newData.products.push(...products);
      if (sale.length > 0) {
        newData.codeSale.push(...sale);
      }
    } else {
      newData = new OrderProdcts({
        users: null,
        usersOther,
        totalPrice: totalPrices,
        totalPriceSale: totalPrices * ((100 - valueSale) / 100),
        details: {
          country,
          address,
          notes,
          phone,
        },
        createDate: new Date(),
      });
      newData.products.push(...products);
      if (sale.length > 0) {
        newData.codeSale.push(...sale);
      }
    }

    //send ami

    const datas = await newData.save();

    const populatedData = await datas.populate([
      "users",
      "usersOther",
      "products",
      "products.productId",
    ]);

    let email = "";
    if (populatedData.users === null || populatedData.users === "") {
      email = populatedData.usersOther.email;
    } else {
      email = populatedData.users.email;
    }

    await sendMails({
      email: email,
      otp: "123",
      type: "DONDAT",
      data: populatedData,
    });

    res
      .status(200)
      .json({ success: true, data: newData, message: "add order true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "add by user order fali" });
  }
};

//add sale
// const addSale = async (rqe, res) => {
//   const { nameSale, value, idCart } = req.body;
//   if (nameSale === "" || value === "" || id === "") {
//     return res.status(400).json({ success: false, message: "not null" });
//   }
//   try {
//     const cart = await ListCarts.findById({ id: idCart });
//   } catch (error) {
//     return res
//       .status(404)
//       .json({ success: false, message: "add sale code order fali" });
//   }
// };

//delete order
const deleteOrderByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const datas = await OrderProdcts.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, data: datas, message: "delete order by id true" });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "delete by user order fali" });
  }
};

module.exports = {
  getAllOrder,
  addOrders,
  getOrderByUser,
  deleteOrderByUser,
};

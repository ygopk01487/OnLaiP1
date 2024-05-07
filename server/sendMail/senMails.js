const nodemailer = require("nodemailer");

const sendMails = ({ email, otp, type, data }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      hot: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD_GMAIL,
      },
    });

    const codeOTP = `<p style="color: black; font-size: 16px; font-weight: 450">
    Mã code:<span style='font-weight: 700; font-size: 18px'>${otp}</span></p>`;

    const numberFormat = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "VND",
    });

    const codeOrder = ` ${
      data !== ""
        ? `<div style="width: 1000px; margin-top: 30px;">
      <div style="width: 100%">
          <div style="width: 100%; border: 2px solid rgb(229, 231, 235); border-radius: 3px;
          box-shadow: 2px 2px 10px black;">
                <div style=" padding: 0 10px">
                  <h3 style="padding-bottom: 5px; font-size: 18px;font-weight: 400;
                  border-color: rgb(229, 231, 235); border-bottom-width: 2px; border-bottom-style: solid">
                    Đặt hàng
                  </h3>
                </div>
                <div style=" padding: 0 10px">
                  <ul style="border-color: rgb(229, 231, 235); border-bottom-width: 2px;
                  border-bottom-style: solid; padding-bottom: 10px">
                    <li style="font-size: 15px">
                      Ngày đặt:
                      <span style="font-weight:700"> ${new Date(
                        data.createDate
                      ).toLocaleString()}</span>
                    </li>
                    <li style="font-size: 15px">
                      SĐT người đặt:
                      <span style="font-weight:700"> ${
                        data.details.phone
                      }</span>
                    </li>
                    <li style="font-size: 15px">
                      Địa chỉ người đặt:
                      <span style="font-weight:700"> ${
                        data.details.address
                      }</span>
                    </li>
                    <li style="font-size: 15px">
                      Chý ý:
                      <span style="font-weight:700"> ${
                        data.details.notes
                      }</span>
                    </li>
                    <li style="font-size: 15px">
                      Nơi sống:
                      <span style="font-weight:700"> ${
                        data.details.country
                      }</span>
                    </li>
                    <li style="font-size: 15px">
                      Tổng tiền:
                      <span style="font-weight:700"> ${numberFormat.format(
                        data.totalPrice
                      )}</span>
                    </li>
                    <li style="font-size: 15px">
                      Áp dụng mã giảm giá:
                      <span style="font-weight:700"> ${
                        data.codeSale.length === 0
                          ? "Không"
                          : `Có. Tổng giảm giá: ${data.codeSale
                              .map((i) => i.value)
                              .reduce((a, b) => a + b, 0)} %`
                      } </span>
                    </li>
                    <li style="font-size: 15px">
                      Tổng phải trả:
                      <span style="font-weight:700"> ${numberFormat.format(
                        data.totalPriceSale
                      )}</span>
                    </li>
                    <li style="font-size: 15px">
                      Trạng thái:
                      <span style="font-weight:700"> đang duyệt</span>
                    </li>
                    <li style="font-size: 15px">
                      thanh toán:
                      <span style="font-weight:700"> chưa thanh toán</span>
                    </li>
                  </ul>
                </div>
                <div style="width:100%; padding-bottom:20px">
                  <div style="padding: 10px 20px ">
                    <h3 style="font-size:16px; font-weight:450; padding-top:5px ;">
                      Chi tiết sản phẩm
                    </h3>
                  </div>
                  <div style="width:98%; padding:10px;">
                    <table style="width:100%; border-collapse: collapse;
                    border-color: rgb(229, 231, 235); border-width: 2px;
                    border-style: solid ">
                      <thead style="font-size:16px; width:100%">
                        <tr>
                          <td
                            style="font-weight:500;
                            border-color: rgb(229, 231, 235);
                            border-width: 0 2px 2px 0;  padding: 10px;
                            border-style:solid;"
                          >
                            Sản phẩm
                          </td>
                          <td style="font-weight:500;
                          border-color: rgb(229, 231, 235); border-width: 0 2px 2px 0; padding: 10px;
                          border-style:solid;">
                            Hình ảnh
                          </td>
                          <td style="font-weight:500;
                          border-color: rgb(229, 231, 235); border-width: 0 2px 2px 0; padding: 10px;
                          border-style:solid;">
                            Số lượng
                          </td>
                          <td style="font-weight:500;
                          border-color: rgb(229, 231, 235); border-width: 0 0 2px 0; padding: 10px;
                          border-style:solid;">
                            Giá
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        ${data.products
                          .map((i) => {
                            return `
                              <tr
                                key=${i.productId._id}
                                style="
                            border-color: rgb(229, 231, 235); border-bottom-width: 2px; border-right-width: 2px;
                            font-size:13px;"
                              >
                                <td
                                  style="padding:10px; font-weight:450;
                              border-color: rgb(229, 231, 235); border-width: 0 2px 2px 0;
                              border-style: solid; "
                                >
                                  <h3 style="padding-right:10px;
                                  ">
                                    ${i.productId.name}
                                  </h3>
                                </td>
                                <td style="padding: 10px;
                                border-color: rgb(229, 231, 235); border-width: 0 2px 2px 0;
                              border-style: solid; " >
                                  <img src=${i.productId.image}
                                  style="width: 100px"  />
                                </td>
                                <td style="padding: 10px;
                                border-color: rgb(229, 231, 235); border-width: 0 2px 2px 0;
                              border-style: solid; font-size: 16px; font-weight: 500">
                                  ${i.quantity}
                                </td>
                                <td style="padding:10px;
                                border-color: rgb(229, 231, 235); border-width: 0 0 2px 0;
                              border-style: solid; font-size: 16px; font-weight: 500">${numberFormat.format(
                                i.productId.price *
                                  ((100 - i.productId.discount) / 100)
                              )}</td>
                              </tr>
                            `;
                          })
                          .join("")}
                        <tr style="text-size:15px;">
                          <td style="font-weight:600; padding:10px; colspan: 4;
                          border-color: rgb(229, 231, 235); border-right-width: 2px;
                          font-size: 16px">
                            Tổng tiền: <span>${numberFormat.format(
                              data.totalPrice
                            )}</span>
                          </td>
                        </tr>
                        <tr style="font-size:15px;">
                        <td style="font-weight:600; padding:10px;
                        border-color: rgb(229, 231, 235); border-right-width: 2px;
                        colspan: 4; font-size: 16px">
                          Áp dụng mã giảm giả: <span>${
                            data.codeSale.length === 0
                              ? "Không"
                              : `Có. Tổng giảm giá:
                          ${data.codeSale
                            .map((i) => i.value)
                            .reduce((a, b) => a + b, 0)} %`
                          }</span>
                        </td>
                      </tr>
                        <tr style="font-size:15px;">
                          <td style="font-weight:600; padding:10px;
                          border-color: rgb(229, 231, 235); border-right-width: 2px;
                          colspan: 4; font-size: 16px">
                            Tổng phải trả: <span>${numberFormat.format(
                              data.totalPriceSale
                            )}</span>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
      </div>
    </div>`
        : ""
    }
    `;

    var mailOptions = {
      from: process.env.GMAIL,
      to: email,
      subject: type === "OTP" ? "Mã OTP" : "ĐƠN DÃ ĐẶT",
      text: type === "OTP" ? "Mã OTP" : "Đơn hàng đã đặt",
      html: type === "OTP" ? codeOTP : codeOrder,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
      } else {
        console.log("Mail send successfully");
      }
    });
  } catch (error) {
    console.log("send mail failll!!");
  }
};

module.exports = { sendMails };

import { useState, useEffect } from "react";
import "./css/buyPrintingPaper/buyPrintingPaper.css";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
// api
import { updateCart, createCartUser, create_url_payment } from "../../../../api";
function BuyPrintingPaperBody() {
  const [paperNo, setPaperNo] = useState(0);
  const navigate = useNavigate();
  const [cartId, setCartId] = useState("")
  const paperPrice = 200;
  let defaultPage
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // taoj cart tuwj nhieen truocs khi render toi trả về kết quả
        const result = await createCartUser({});
        setCartId(result.metaData._id)
        console.log(result); // In kết quả
      } catch (error) {
        // ở đây nên làm cái allert error message
        console.error('Error fetching user:', error.message);
      }
    };
    fetchUser();
  }, []);
  const handleFocus = (event) => {
    event.target.value = ""; // Xóa giá trị hiển thị trong input khi focus
  };
  const handleBlur = (event) => {
    const value = event.target.value
    if (value === '') return
    setPaperNo(value);
    const oldQuantity = paperNo
    const newQuantity = value

    const reqBody = {
      oldQuantity,
      newQuantity
    } // Cập nhật giá trị tạm thời khi nhập
    console.log(reqBody)
    updateCart(reqBody).then(result => console.log(result))
      .catch(err => alert(err.message))

  };
  const handleSubmitTransacation = async () => {
    const totalPrice = paperNo * paperPrice
    const reqBody = {
      price: totalPrice,
      cartId: cartId,
      userId: "673db023ad6416223dc327ae",
      bankCode: "",
      language: "vn",
    }
    console.log(reqBody)
    // const result = await axios.post(`http://localhost:8000/v1/order/test2`, reqBody, { withCredentials: true })
    const result = await create_url_payment(reqBody)
    const url = result.metaData

    console.log(url)
    const url_redirect = url.toString()
    window.location.href = url_redirect, false
  }

  return (
    <div className="container1">
      <div className="row">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <form className="buyPrintingPaper__body" >
            <p className="infor-title">Thông tin trang mua</p>
            <div className="buyPrintingPaper-input">
              <label for="number" className="paperNo">
                Số trang muốn mua thêm:
              </label>
              <input
                type="number"
                className="paperNo-input"
                // value={paperNo}
                id="numberInput"
                defaultValue={defaultPage}
                // onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
            </div>
            <div className="buyPrintingPaper-detail">
              <div className="paperSum">
                <p className="title1">Tổng số trang</p>
                {paperNo && <p className="number">{paperNo}</p>}
              </div>
              <div className="PriceSum">
                <p className="title1">Đơn giá</p>
                <p className="number">{paperPrice}</p>
              </div>
            </div>
            <div className="buyPrintingPaper-conclude">
              <p className="title1">Tổng cộng</p>
              <p className="price">{paperNo * paperPrice} VND</p>
            </div>
            {/* <input type="submit" value="Thanh toán" className="transaction" /> */}
            <button type="button" value="Thanh toán" className="transaction" onClick={handleSubmitTransacation}>Thanh toán</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function BuyPrintingPaper() {
  return (
    <div className="buyPrintingPaper">
      <BuyPrintingPaperBody />
    </div>
  );
}

export default BuyPrintingPaper;

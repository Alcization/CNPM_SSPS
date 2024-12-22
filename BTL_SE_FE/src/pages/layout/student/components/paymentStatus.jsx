import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
//api
import { getUrl } from "../../../../api";
function PaymentStatus() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  console.log("queryParams", queryParams)
  // // Add variables needed from query params here

  const vnp_ResponseCode = queryParams.get('vnp_Amount');
  // // 00 là thanh cong 24 là huy khac là failed
  useEffect(() => {
    var url = window.location.href;
    const queryParams = url.substring(url.lastIndexOf('?') + 1)
    getUrl(queryParams).then(result => {
      return result
    })
      .catch(err =>
        console.log(err)
      )
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <h1>Thanh toán thành công</h1>
    </div>
  );
}
export default PaymentStatus;

//http://localhost:8000/v1/order/return_url?vnp_Amount=4000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14706279&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+cho+ma+GD%3A67492e92d60643305d50061a&vnp_PayDate=20241129100204&vnp_ResponseCode=00&vnp_TmnCode=2PW5JEL6&vnp_TransactionNo=14706279&vnp_TransactionStatus=00&vnp_TxnRef=67492e92d60643305d50061a&vnp_SecureHash=7d04d38d409dbd7590c2330427c50583c7e76e6c990e0f781a3c2e3c56bc06b56ff6cd285b37ab85fbe47ce2e4c812c5a131efe3bcb4e4e4d028b2b36cacfb52


## Hướng dẫn cài đặt

- chạy lệnh npm install

- tiếp theo là cần phải cài đặt docker trước khi sử dụng

- sau khi cài đặt docker chạy docker compose up -d trong folder BTL_SE

- sau đó thêm file .env với các biến như sau:

URI_RABBITMQ=amqp://guest:12345@localhost
<!-- URL của cloud redis -->
URL_REDIS=""

URI_DATABASE=
PORT=8000
HOST=localhost
HOST_URL=http://localhost:8000

VNP_TMNCODE=2PW5JEL6
VNP_HASHSECRET=KKHSVQ96QKQH7R78D6WE5GW0PYNWB761
VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
VNP_API=https://sandbox.vnpayment.vn/merchant_webapi/api/transaction
VNP_RETURNURL=http://localhost:8000/v1/order/return_url
VNP_RETURNURL=http://localhost:5173/student/payment_status
<!-- Đây là các biến cần thieest trong google api cho nodemailer  -->
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=
REFRESH_TOKEN =

SALT = 10

<!-- các biến cho cloudinary -->
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

- Sau tất cả chạy npm start truy cập http://localhost:8000

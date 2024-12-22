const whitelist = ['http://localhost:5173', 'http://localhost:8000', 'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html']
export const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true)
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,// some legacy browsers (IE11, various SmartTVs) choke on 204,
  credentials: true
}
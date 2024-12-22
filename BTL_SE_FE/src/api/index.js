import axios from 'axios'

axios.defaults.withCredentials = true
// ++++++++++++++++++++ STUDENT ++++++++++++++++++++++++
// ----------------------user
export const getUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/user/getUser`, { withCredentials: true })
  return response.data
}

export const loginUser = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/user/login`, reqBody, { withCredentials: true })
  return response.data
}
export const logoutUser = async () => {
  const response = await axios.post(`http://localhost:8000/v1/user/logout`, {
    withCredentials: true
  })
  return response.data
}
export const getInFoStudent = async () => {
  const response = await axios.get(`http://localhost:8000/v1/user/getStudentInfo`, {
    withCredentials: true
  });
  return response.data
}

//-----------------document 
export const getDocumentOfUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/document/getDocumentOfUser`, { withCredentials: true })
  return response.data
}
export const generateOTPToPrint = async () => {
  const response = await axios.post(`http://localhost:8000/v1/document/generateOtpForUser`, {}, {
    withCredentials: true
  })
  return response.data
}
export const veriFyToPrint = async (formData) => {
  const response = await axios.post(`http://localhost:8000/v1/document/create`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true
  });
  return response.data
}

// --------------cart
export const createCartUser = async ({
  oldQuantity = 0,
  newQuantity = 0
}) => {
  const response = await axios.post(`http://localhost:8000/v1/cart/createCart`, {
    oldQuantity: oldQuantity,
    newQuantity: newQuantity
  }, {
    withCredentials: true
  })
  return response.data
}
export const updateCart = async (reqBody) => {
  const response = await axios.patch(`http://localhost:8000/v1/cart/updateQuantity`, reqBody, {
    withCredentials: true
  })
  return response.data
}


// ------------order
export const create_url_payment = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/order/createPaymentUrl`, reqBody)
  return response.data
}
export const getAllOrderOfUser = async () => {
  const response = await axios.get(`http://localhost:8000/v1/order/user`, {
    withCredentials: true
  })
  return response.data
}
export const getUrl = async (queryParams) => {
  const response = await axios.get(`http://localhost:8000/v1/order/return_url?${queryParams}`, {
    withCredentials: true
  })
  return response.data
}

// ++++++++++++++++++++ ADMIN ++++++++++++++++++++++++
//---------------------------document  
export const getAllDocument = async () => {
  const response = await axios.get(`http://localhost:8000/v1/document`, {
    withCredentials: true
  })
  return response.data
}

// ------------------------- order

export const getAllOrders = async () => {
  const response = await axios.get(`http://localhost:8000/v1/order/getAllOrders`, {
    withCredentials: true
  })
  return response.data
}

//  -----------------------printer
export const getAllPrinters = async () => {
  const response = await axios.get(`http://localhost:8000/v1/printer`, {
    withCredentials: true
  })
  return response.data
}
export const createPrinter = async (reqBody) => {
  const response = await axios.post(`http://localhost:8000/v1/printer/create`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const updatePrinter = async (printer_id, infoStatus) => {
  let reqBody

  if (infoStatus === 'ACTIVE') {
    reqBody = { status: 'DISABLED' }
  }
  else {
    reqBody = { status: 'ACTIVE' }
  }
  console.log("reqBody", reqBody)
  const response = await axios.patch(`http://localhost:8000/v1/printer/${printer_id}`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const updateInfoPrinter = async (printer_id, reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.patch(`http://localhost:8000/v1/printer/${printer_id}`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const deletePrinter = async (printer_id) => {
  const response = await axios.delete(`http://localhost:8000/v1/printer/${printer_id}`, {
    withCredentials: true
  })
  return response.data
}
export const getCountPrinters = async () => {
  const response = await axios.get(`http://localhost:8000/v1/printer/count`, {
    withCredentials: true
  })
  return response.data
}
//----------------------defaultPage

export const createDefaultPage = async (reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.post(`http://localhost:8000/v1/defaultPage`, reqBody, {
    withCredentials: true
  })
  return response.data
}
export const getAllDefaultPage = async (reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.get(`http://localhost:8000/v1/defaultPage`, {
    withCredentials: true
  })
  return response.data
}

// -------------------report
export const getReport = async (reqBody) => {
  console.log("reqBody", reqBody)
  const response = await axios.put(`http://localhost:8000/v1/report/filter`, reqBody, {
    withCredentials: true
  })
  return response.data
}

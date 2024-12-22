/* eslint-disable react/prop-types */

import { Navigate } from 'react-router-dom';
const PrivateRouteAdmin = ({ user, children }) => {

  // Đảm bảo không tái hiển thị al
  return user && user.admin ? children : <Navigate to="/login" />;
};

export default PrivateRouteAdmin;

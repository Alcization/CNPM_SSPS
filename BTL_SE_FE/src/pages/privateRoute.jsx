import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ user, children }) => {

  // Nếu đang load, hiển thị một thông báo hoặc spinner

  // Nếu không có user (chưa đăng nhập), chuyển hướng đến trang login
  // eslint-disable-next-line react/prop-types
  if (!user) {
    return <Navigate to="/login" />
  }
  // eslint-disable-next-line react/prop-types
  if (user.admin === true) {
    return <Navigate to="/admin/admin_home" />
  }

  return children // Nếu đã có user, hiển thị trang con (children)
};

export default PrivateRoute;
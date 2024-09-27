import { useDispatch } from 'react-redux';
import { logInUser, logoutUser } from '../slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (data) => {
    localStorage.setItem('user', data.username);
    localStorage.setItem('token', data.token);
    dispatch(logInUser(data));
  };

  const logOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logoutUser());
  };

  return { logIn, logOut };
};

export default useAuth;

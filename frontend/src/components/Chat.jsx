import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChannelsForm from './channelList';
import QuitBtn from './QuitBtn';
import { logoutUser } from './slices/authSlice';
import routes from '../utils/routes';

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logoutUser());
    navigate(routes.login);
  };

  return (
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
            <QuitBtn variant="primary" onClick={() => onClick()} />
          </div>
        </nav>
        <ChannelsForm />
      </div>
    </div>
  );
};

export default Chat;

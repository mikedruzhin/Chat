import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../slices/authSlice';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth';

const QuitBtn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate(`${routes.baseUrl}${routes.login}`);
  };

  return (
    auth.loggedIn && (<Button type="submit" onClick={handleClick}>{t('mainPage.quitBtn')}</Button>)
  );
};

export default QuitBtn;

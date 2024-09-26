/* eslint-disable jsx-quotes */
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { logIn } from '../slices/authSlice';
import { useLoginUserMutation } from '../services/usersApi';
import loginImage from '../public/img/hello.jpg';
import routes from '../utils/routes';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      const data = await loginUser({ username, password }).unwrap();
      auth.logIn();
      dispatch(logIn(data));
      navigate(routes.chat);
    } catch (err) {
      if (err.status === 401) {
        inputRef.current.select();
        return;
      }
      toast.error('toast.errorNetwork');
      console.error(error);
    }
  };

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
                <img src={loginImage} alt='Войти' />
              </div>
              <Formik onSubmit={onSubmit} initialValues={{ username: '', password: '' }}>
                {({
                  handleSubmit, handleChange, values,
                }) => (
                  <Form className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={handleSubmit}>
                    <h1 className='text-center mb-4'>{t('loginPage.enter')}</h1>
                    <FloatingLabel label={t('loginPage.nickname')} className='mb-3' controlId='username'>
                      <Form.Control
                        name='username'
                        autoComplete='username'
                        type='text'
                        required
                        placeholder={t('loginPage.nickname')}
                        onChange={handleChange}
                        value={values.username}
                        isInvalid={error?.status === 401}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                    <FloatingLabel label={t('loginPage.password')} className='mb-4' controlId='password'>
                      <Form.Control
                        name='password'
                        autoComplete='current-password'
                        type='password'
                        required
                        className='form-control'
                        placeholder={t('loginPage.password')}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={error?.status === 401}
                      />
                      <Form.Control.Feedback type='invalid'>
                        {error?.status === 401 && t('loginPage.loginError')}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    <Button
                      variant='outline-primary'
                      type='submit'
                      className='w-100 mb-3'
                      disabled={isLoading}
                    >
                      {t('loginPage.enter')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>{t('loginPage.withoutAcc')}</span>
                <Link to="/signup">{t('loginPage.reg')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

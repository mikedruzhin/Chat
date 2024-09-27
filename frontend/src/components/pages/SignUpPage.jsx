/* eslint-disable jsx-quotes */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import regImg from '../../public/img/reg.jpg';
import { logIn } from '../../slices/authSlice';
import { useSignupUserMutation } from '../../services/usersApi';
import { signUpShema } from '../../utils/schema';
import routes from '../../utils/routes';
import useAuth from '../../hooks/useAuth';

const SignUpPage = () => {
  const [existingUser, setExistingUser] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signUpUser, { isLoading }] = useSignupUserMutation();
  const { t } = useTranslation();
  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async ({ username, password }) => {
    try {
      const data = await signUpUser({ username, password }).unwrap();
      auth.logIn(data);
      dispatch(logIn(data));
      navigate(routes.chat);
    } catch (err) {
      if (err.status === 409) {
        setExistingUser(true);
      } else {
        toast.error(t('toast.errorNetwork'));
      }
      console.error(err);
    }
  };

  return (
    <div className='h-100'>
      <div className='d-flex flex-column h-100'>
        <div className='card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5 '>
          <div className='rounded-circle'>
            <img src={regImg} alt='Регистрация' />
          </div>
          <Formik
            validationSchema={signUpShema(t)}
            onSubmit={onSubmit}
            initialValues={{ username: '', password: '', confirmPassword: '' }}
          >
            {({
              handleSubmit, handleChange, values, errors,
            }) => (
              <Form className='w-50' onSubmit={handleSubmit}>
                <h1 className='text-center mb-4'>{t('regForm.register')}</h1>
                <FloatingLabel label={t('regForm.userName')} className='mb-3' controlId='username'>
                  <Form.Control
                    name='username'
                    autoComplete='username'
                    type='text'
                    required
                    placeholder={t('regForm.userName')}
                    onChange={handleChange}
                    value={values.username}
                    isInvalid={errors.username || existingUser}
                    ref={inputRef}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t('regForm.password')} className='mb-3' controlId='password'>
                  <Form.Control
                    name='password'
                    autoComplete='new-password'
                    type='password'
                    required
                    className='form-control'
                    placeholder={t('regForm.password')}
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.password || existingUser}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel label={t('regForm.confirmPassword')} className='mb-4' controlId='confirmPassword'>
                  <Form.Control
                    name='confirmPassword'
                    autoComplete='new-password'
                    type='password'
                    required
                    className='form-control'
                    placeholder={t('regForm.confirmPassword')}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isInvalid={errors.confirmPassword || existingUser}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.confirmPassword}
                    {existingUser && t('regForm.regErrors')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant='outline-primary'
                  type='submit'
                  className='w-100'
                  disabled={isLoading}
                >
                  {t('regForm.register')}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

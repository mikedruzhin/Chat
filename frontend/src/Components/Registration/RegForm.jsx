import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/index';
import regImage from '../img/hello.jpg';

const RegistrationForm = () => {
  const [invalid, setInvalid] = useState(false)
  const auth = useAuth()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({username, password}) => {
      axios.post('/api/v1/login', {
        username,
        password
      })
      .then((response) => {
        const userId = {
          token: response.data.token
        }
        localStorage.setItem('token', JSON.stringify(userId))
        localStorage.setItem('isLogged', true)
        auth.logIn()
      })
      .catch (() => setInvalid(true));

    }
  });
  const navigate = useNavigate()
  const renderForm = () => {
    return (
      <>
        <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
          <div>
            <img
              src={regImage}
              alt=""
              className="rounded-circle"
            />
          </div>
          <Form 
            className="col-12 col-md-6 mt-3 mt-md-0"
            onSubmit={formik.handleSubmit}>
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <input
                id="username"
                name="username"
                placeholder='Ваш ник'
                onChange={formik.handleChange}
                value={formik.values.username}
                className={invalid ? "form-control is-invalid" : "form-control"}
              />
              <label htmlFor="username">Ваш ник</label>
            </div>
            <div className="form-floating mb-4">
              <input
                id="password"
                name="password"
                type="password"
                placeholder='Пароль'
                onChange={formik.handleChange}
                value={formik.values.password}
                className={invalid ? "form-control is-invalid" : "form-control"}
              />
              <label htmlFor="password">Пароль</label>
              {invalid ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null}

            </div>
            
            <button className="w-100 mb-3 btn btn-outline-primary" type="submit">Войти</button>
            
          </Form>
        </div>
        <div className="card-footer p-4">
          <div className="text-center">
            <span>Нет аккаунта ?</span>
            &nbsp;
            <a href="/">Регистрация</a>
          </div>
        </div>
      </>
    )
  }
  return ( 
    <>
      {auth.loggedIn ? navigate(-1) : renderForm() }
    </>
  );
}

export default RegistrationForm;
import { useFormik } from 'formik';

export const SignUpForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <input
          id="username"
          name="username"
          placeholder='Ваш ник'
          onChange={formik.handleChange}
          value={formik.values.username}
        />
      </div>
      <div>
        <input
          id="password"
          name="password"
          type="password"
          placeholder='Пароль'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
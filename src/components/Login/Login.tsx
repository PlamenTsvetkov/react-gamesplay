import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikContol from '../Formik/FormikContol/FormikContol';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css';

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: LoginValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required!'),
    password: Yup.string()
      .required('Password is required!')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
      ),
  });

  const navigate = useNavigate();

  const onLoginSubmitHandler = (values: LoginValues) => {
    const email = values.email;
    const password = values.password;

    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        navigate(`/`);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onLoginSubmitHandler}
    validateOnChange={false}>
   {(formik) => (
        <section id={style["login-page"]} className={style.auth}>
          <Form id={style.login}>
            <div className={style.container}>
              <div className={style["brand-logo"]}></div>
              <h1 className={style["login-heading"]}>Login</h1>

              <FormikContol
                control="input"
                label="Email:"
                name="email"
                inputType="email"
                field={formik.getFieldProps('email')}
                meta={formik.getFieldMeta('email')}
                form={formik}
              />

              <FormikContol
                control="input"
                label="Password:"
                name="password"
                inputType="password"
                field={formik.getFieldProps('password')}
                meta={formik.getFieldMeta('password')}
                form={formik}
              />

              <input type="submit" className={`${style.btn} ${style.submit}`} value="Login" />
              <p className={style.field}>
                <span>If you don't have a profile click <Link to="/register">here</Link></span>
              </p>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
};

export default Login;
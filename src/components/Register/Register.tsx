import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikContol from '../Formik/FormikContol/FormikContol';
import {auth} from '../../utils/firebase';
import style from './Register.module.css';
import { useNavigate } from 'react-router-dom';

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const initialValues: RegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required!'),
    password: Yup.string()
      .required('Password is required!')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required!')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });


    const navigate = useNavigate();

    const onRegisterSubmitHandler= (values: RegisterValues) =>{
      const email = values.email;
      const password = values.password;

        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          navigate(`/`);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    }
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onRegisterSubmitHandler}
        validateOnChange={false}
      >
        {(formik) => (
          <section id={style['register-page']} className={`${style['content']} ${style['auth']}`}>
            <Form id="register">
              <div className={style.container}>
                <div className={style['brand-logo']}></div>
                <h1>Register</h1>
  
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
  
                <FormikContol
                  control="input"
                  label="Confirm Password:"
                  name="confirmPassword"
                  inputType="password"
                  field={formik.getFieldProps('confirmPassword')}
                  meta={formik.getFieldMeta('confirmPassword')}
                  form={formik}
                />
  
                <input type="submit" className={`${style.btn} ${style.submit}`} value="Register" />
  
                <p className={style.field}>
                  <span>If you already have a profile click <Link to="/login">here</Link></span>
                </p>
              </div>
            </Form>
          </section>
        )}
      </Formik>
    );
  };
  
  export default Register;

import React from 'react';
import {auth} from '../../utils/firebase';
import style from './Register.module.css';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const onRegisterSubmitHandler= (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;
        const repeatPass = (e.target as HTMLFormElement)['confirm-password'].value;
    console.log(password);
    console.log(repeatPass);
        if (email == '' || password == '') {
            return alert('All fields are required!');
        }

        if (password != repeatPass) {
            return alert('Password don\'t match!');
        }

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
    <section  onSubmit={onRegisterSubmitHandler} id={style["register-page"]} className={`${style['content']} ${style['auth']}`}>
    <form id="register">
      <div className={style.container}>
        <div className={style['brand-logo']}></div>
        <h1>Register</h1>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com" />

        <label htmlFor="pass">Password:</label>
        <input type="password" name="password" id="register-password" />

        <label htmlFor="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <input className={`${style.btn} ${style.submit}`} type="submit" value="Register" />

        <p className={style.field}>
          <span>If you already have a profile click <a href="/login">here</a></span>
        </p>
      </div>
    </form>
  </section>
  );
};

export default Register;

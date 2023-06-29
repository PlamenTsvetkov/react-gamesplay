import React from 'react';
import {auth} from '../../utils/firebase';
import {  useNavigate } from 'react-router-dom';
import style from './Login.module.css';

const Login: React.FC = () => {

    const navigate = useNavigate();

const onLoginSubmitHandler= (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const email = (e.target as HTMLFormElement).username.value;
    const password = (e.target as HTMLFormElement).password.value;

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
    <section id={style["login-page"]} className={style.auth}> 
    <form onSubmit={onLoginSubmitHandler} id={style.login}> 
      <div className={style.container}> 
        <div className={style["brand-logo"]}></div> 
        <h1 className={style["login-heading"]}>Login</h1> 
        <label htmlFor="username" className={style.label}>Email:</label> 
        <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" className={style.input} />
        <label htmlFor="password" className={style.label}>Password:</label> 
        <input type="password" id="password" name="password" className={style.input} /> 
        <input type="submit" className={`${style.btn} ${style.submit}`} value="Login" /> 
        <p className={style.field}>
          <span>If you don't have a profile click <a href="/register">here</a></span>
        </p>
      </div>
    </form>
  </section>
  );
};

export default Login;
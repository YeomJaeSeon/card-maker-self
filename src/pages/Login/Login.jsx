import React from 'react';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { firebaseInstance, authService } from '../../fbase';

const Login = () => {
  const history = useHistory();
  const login = (e) => {
    let provider;
    if (e.target.id === 'google')
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    else if (e.target.id === 'github')
      provider = new firebaseInstance.auth.GithubAuthProvider();
    // 깃허브는 아직 적용 x
    authService
      .signInWithPopup(provider)
      .then((result) => {
        history.push('/app');
      })
      .catch((error) => {
        alert('실패');
      });
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img src="/images/logo.png" alt="로고" className={styles.img} />
        <h1 className={styles.title}>Business Card Maker</h1>
      </header>
      <div className={styles.loginBody}>
        <h1 className={styles.loginTitle}>Login</h1>
        <button className={styles.google} id="google" onClick={login}>
          Google
        </button>
        <button className={styles.github} id="github" onClick={login}>
          Github
        </button>
      </div>
      <footer className={styles.footer}>
        <p>Code your dream</p>
      </footer>
    </section>
  );
};

export default Login;

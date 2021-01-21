import React from 'react';
import styles from './MainHeader.module.css';
import { authService } from '../../fbase';
import { useHistory } from 'react-router-dom';

const MainHeader = () => {
  const history = useHistory();
  const logout = () => {
    authService
      .signOut()
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <img src="/images/logo.png" alt="로고" className={styles.img} />
        <h1 className={styles.desc}>Business Card Maker</h1>
      </div>
      <button className={styles.logout} onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default MainHeader;

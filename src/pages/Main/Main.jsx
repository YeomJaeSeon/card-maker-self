import React from 'react';
import styles from './Main.module.css';
import MainHaeder from '../../components/MainHeader/MainHeader';
import CardMaker from '../../components/CardMaker/CardMaker';
import CardPreview from '../../components/CardPreview/CardPreview';

const Main = () => {
  return (
    <div className={styles.container}>
      <MainHaeder />
      <section className={styles.main}>
        <CardMaker />
        <CardPreview />
      </section>
    </div>
  );
};

export default Main;

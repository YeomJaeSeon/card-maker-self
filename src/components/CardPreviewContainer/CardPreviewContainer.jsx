import React from 'react';
import styles from './CardPreviewContainer.module.css';

const CardPreviewContainer = ({
  imgSrc,
  name,
  company,
  version,
  job,
  email,
  comment,
}) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: version === 'light' ? 'beige' : '#455a64' }}
    >
      <img
        className={styles.img}
        src={imgSrc ? imgSrc : '/images/default_logo.png'}
      ></img>
      <section
        className={styles.info}
        style={{ color: version === 'light' ? 'black' : 'white' }}
      >
        <h1>{name}</h1>
        <h3>{company}</h3>
        <div
          className={styles.line}
          style={{ backgroundColor: version === 'light' ? 'black' : 'beige' }}
        ></div>
        <p>{job}</p>
        <p>{email}</p>
        <p>{comment}</p>
      </section>
    </div>
  );
};

export default CardPreviewContainer;

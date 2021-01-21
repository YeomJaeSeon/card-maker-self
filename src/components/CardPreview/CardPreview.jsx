import React, { useState, useEffect } from 'react';
import styles from './CardPreview.module.css';
import { realtimeDatabase } from '../../fbase';
import CardPreviewContainer from '../CardPreviewContainer/CardPreviewContainer';

const CardPreview = () => {
  const [cardState, setCardState] = useState([]);

  useEffect(() => {
    const fbaseRef = realtimeDatabase.ref('users');
    const listener = fbaseRef.on('value', (snapshot) => {
      const fbasDatas = snapshot.val();
      if (fbasDatas) {
        const dataToArr = Object.values(fbasDatas);
        setCardState(dataToArr);
      } else {
        setCardState([]);
      }
    });
    return () => fbaseRef.off('value', listener);
  }, [realtimeDatabase]);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Card Preview</h1>
      {cardState.map((item) => {
        return (
          <CardPreviewContainer
            key={item.id}
            imgSrc={item.imgSrc}
            name={item.name}
            company={item.company}
            version={item.version}
            job={item.job}
            email={item.email}
            comment={item.comment}
          />
        );
      })}
    </div>
  );
};
export default CardPreview;

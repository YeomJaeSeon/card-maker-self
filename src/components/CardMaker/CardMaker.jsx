import React, { useState, useEffect } from 'react';
import styles from './CardMaker.module.css';
import WriteContainer from '../CardMakerContainer/WriteContainer';
import FinishContainer from '../CardMakerContainer/FinishContainer';
import { realtimeDatabase } from '../../fbase';

const CardMaker = () => {
  const [cardData, setCardData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgUploadState, setImgUploadState] = useState(null);
  const database = realtimeDatabase;

  useEffect(() => {
    database
      .ref('users')
      .once('value')
      .then((snapshot) => {
        const fbaseDatas = snapshot.val();
        if (fbaseDatas) {
          const fbaseDatasArr = Object.values(fbaseDatas);
          setCardData(fbaseDatasArr);
        }
        setIsLoaded(true);
      });
  }, []);

  const add = (e) => {
    e.preventDefault();
    const id = Date.now();
    const imgSrc = imgUploadState;
    const name = e.target.name.value;
    const company = e.target.company.value;
    if (name === '' || company === '') {
      alert('이름이나 회사는 꼭 적어주세요.');
      return;
    }
    const version = e.target.version.value;
    const job = e.target.job.value;
    const email = e.target.email.value;
    const comment = e.target.comment.value;

    // default 값으로 초기화
    setImgUploadState(null);
    e.target.name.value = '';
    e.target.company.value = '';
    e.target.version.value = 'light';
    e.target.job.value = '';
    e.target.email.value = '';
    e.target.comment.value = '';

    // firebase database 저장
    database.ref('users/' + id).set({
      id,
      imgSrc,
      name,
      company,
      version,
      job,
      email,
      comment,
    });

    setCardData([
      ...cardData,
      {
        id,
        imgSrc,
        name,
        company,
        version,
        job,
        email,
        comment,
      },
    ]);
  };

  const onDelete = (selectedCardId) => {
    // firebase database 삭제
    database.ref('users/' + selectedCardId).remove();
    setCardData(cardData.filter((item) => item.id !== selectedCardId));
  };

  const onUpdate = (selectedCardId, target) => {
    const name = target.name;
    const value = target.value;
    if (name === 'imgSrc') {
      const url = 'https://api.cloudinary.com/v1_1/daz7vskce/image/upload';
      const formData = new FormData();
      const file = target.files[0];

      formData.append('file', file);
      formData.append('upload_preset', 'dgx6r2po');

      fetch(url, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setCardData(
            cardData.map((item) => {
              if (item.id === selectedCardId) {
                item['imgSrc'] = data.secure_url;
                return item;
              }
              return item;
            })
          );

          // firebase update
          const updates = {};
          updates['/users/' + selectedCardId + '/' + name] = data.secure_url;
          database.ref().update(updates);
        });
    } else {
      setCardData(
        cardData.map((item) => {
          if (item.id === selectedCardId) {
            item[name] = value;
            return item;
          }
          return item;
        })
      );

      // firebase update
      const updates = {};
      updates['/users/' + selectedCardId + '/' + name] = value;
      database.ref().update(updates);
    }
  };

  const onUpload = (e) => {
    e.preventDefault();
    const url = 'https://api.cloudinary.com/v1_1/daz7vskce/image/upload';
    const formData = new FormData();
    const file = e.target.files[0];

    formData.append('file', file);
    formData.append('upload_preset', 'dgx6r2po');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImgUploadState(data.secure_url);
      });
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Card Maker</h1>
      {cardData.map((item) => {
        return (
          <FinishContainer
            key={item.id}
            id={item.id}
            imgSrc={item.imgSrc}
            name={item.name}
            company={item.company}
            version={item.version}
            job={item.job}
            email={item.email}
            comment={item.comment}
            onDeleteHandler={onDelete}
            onUpdateHandler={onUpdate}
            onUploadHandler={onUpload}
          />
        );
      })}
      {isLoaded ? (
        <WriteContainer
          onAddHandler={add}
          onUploadHandler={onUpload}
          imgUploadState={imgUploadState}
        />
      ) : null}
    </div>
  );
};
export default CardMaker;

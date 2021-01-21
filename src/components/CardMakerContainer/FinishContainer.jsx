import React from 'react';
import styles from './FinishContainer.module.css';

const FinishContainer = ({
  id,
  imgSrc,
  name,
  company,
  version,
  job,
  email,
  comment,
  onDeleteHandler,
  onUpdateHandler,
}) => {
  const onDelete = () => {
    onDeleteHandler(id);
  };
  const onUpdate = (e) => {
    const target = e.target;
    onUpdateHandler(id, target);
  };
  return (
    <div className={styles.container}>
      <div className={styles.row1}>
        <input
          placeholder="이름을 입력해주세요"
          name="name"
          onChange={onUpdate}
          className={styles.row1_col1}
          value={name}
        ></input>
        <input
          placeholder="다니는 회사를 입력해주세요"
          name="company"
          onChange={onUpdate}
          className={styles.row1_col2}
          value={company}
        ></input>
        <select
          name="version"
          onChange={onUpdate}
          value={version}
          className={styles.row1_col3}
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
      </div>
      <div className={styles.row2}>
        <input
          placeholder="직업을 입력해주세요"
          name="job"
          onChange={onUpdate}
          value={job}
          className={styles.row2_col1}
        ></input>
        <input
          placeholder="이메일 입력해주세요"
          name="email"
          onChange={onUpdate}
          value={email}
          className={styles.row2_col2}
        ></input>
      </div>
      <input
        placeholder="할말을 입력해주세요"
        name="comment"
        onChange={onUpdate}
        value={comment}
        className={styles.row3}
      ></input>
      <div className={styles.row4}>
        <label className={styles.btn1}>
          {imgSrc ? 'Uploaded' : 'No File'}
          <input
            type="file"
            name="imgSrc"
            style={{ display: 'none' }}
            onChange={onUpdate}
          />
        </label>
        <button onClick={onDelete} className={styles.btn2}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default FinishContainer;

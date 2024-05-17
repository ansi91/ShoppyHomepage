import React from 'react';
// import './Modal.css'; // 모달 스타일을 지정하기 위한 CSS 파일을 불러옵니다.

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;

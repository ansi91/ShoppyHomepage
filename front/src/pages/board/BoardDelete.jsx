import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BoardDelete() {
  const navigate = useNavigate();
  const { bid, rno } = useParams();

  /** 삭제 완료 */
  const handleDeleteSubmit = () => { 
    const url = "http://127.0.0.1:8080/board/delete";
    axios({
      method: "post",
      url: url,
      data: {bid: bid}
    })
      .then(result => {
        if(result.data.cnt === 1) navigate("/board");
      })
      .catch(); 
  }

  /** 이전페이지, 리스트 이동 */
  const handleNavigate = (type) => { 
    (type === "list") ? navigate("/board") : navigate(`/board/${bid}/${rno}`);
  }


    return (
      <div className='content'>
        <h1>BoardDelete</h1>
        <div>
          <h3>정말로 삭제하시겠습니까?</h3>
          <img src="data:image/jpeg;base64,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" />
        </div>
        <div>
          <button type="button" 
                  onClick={handleDeleteSubmit}>삭제완료</button>
          <button type="button" 
                  onClick={()=>handleNavigate('pre')}>이전페이지</button>
          <button type="button" 
                  onClick={()=>handleNavigate('list')}>리스트</button>
        </div>
      </div>
    );
}
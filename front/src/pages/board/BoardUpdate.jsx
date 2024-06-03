import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BoardUpdate() {
  const navigate = useNavigate();
  const { bid, rno } = useParams();
// console.log('update > bid --> ', bid);

  //DB연동 : 상세보기 + 업데이트
  // 1. 상세보기 
  const [boardFormData, setBoardFormData] = useState({});
  useEffect(() => {
    const url = `http://localhost:8080/board/${bid}`;
    axios({
      method : 'get',
      url : url
    })
      .then(result => setBoardFormData(result.data))
      .catch(error => console.log(error));
  }, [bid]);
  
  console.log('update > boardFormData ->', boardFormData);

  //2. 폼데이터에서 수정데이터 입력 > DB 테이블에 업데이트
  const handleChange = (e) => {
    const {name, value} = e.target;
    setBoardFormData({...boardFormData, [name]:value});
  }
  // console.log(boardFormData);

  /** 수정 완료 */
  const handleUpdateSubmit = () => { 
    const url = "http://127.0.0.1:8080/board/update";
    axios({
      method: "post",
      url: url,
      data: boardFormData  // bid가 반드시 포함되어야함!!!!
    })
      .then(result => {
        if(result.data.cnt === 1) navigate("/board");
      })
      .catch(); 
  }

  /** 수정폼 리셋 */
  const handleUpdateReset = () => { 
    setBoardFormData({
      btitle: "게시글 등록 테스트!!",
      bcontent : "게시글 등록 테스트 내용 입니다!!"
    });
  }

  /** 이전페이지, 리스트 이동 */
  const handleNavigate = (type) => { 
    (type === "list") ? 
      navigate("/board") : navigate(`/board/${bid}/${rno}`);
  }


    return (
      <div>
        <h1>게시판 수정</h1>
        <table border='1'>          
          <tr>
            <th>제목</th>
            <td>
              <input type="text" 
                    name="btitle"
                    value= {boardFormData.btitle} 
                    onChange={handleChange}/>
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea name="bcontent"
                        onChange={handleChange}
                        value={boardFormData.bcontent} />
            </td>
          </tr> 
          <tr>
            <td colSpan={2}>
              <button type="button" 
                      onClick={handleUpdateSubmit}>수정완료</button>
              <button type="button" 
                      onClick={handleUpdateReset}>다시쓰기</button>
              <button type="button" 
                      onClick={()=>handleNavigate('pre')}>이전페이지</button>
              <button type="button" 
                      onClick={()=>handleNavigate('list')}>리스트</button>
            </td>
          </tr>         
        </table>
      </div>
    );
}
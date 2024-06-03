import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function BoardContent() {
  const navigate = useNavigate();
  const { bid, rno } = useParams();
  const [board, setBoard] = useState({});

  /** 게시글 상세정보 가져오기 */
  useEffect(() => {
    const url = `http://localhost:8080/board/${bid}`;
    axios({
      method : 'get',
      url : url
    })
      .then(result => setBoard(result.data))
      .catch(error => console.log(error));

  }, [bid]);

 
  /** 메뉴 이동 */
  const handleNavigate = (type) => {
    (type === "list") ? 
      navigate(`/board`) : navigate(`/board/${type}/${board.bid}/${rno}`);
  }

    return (
      <div className='content'>
        <h1>게시판 상세정보</h1>
        <table border='1'>
          <tr>
            <th>번호</th>
            <td>{rno}</td>
            <th>조회수</th>
            <td>{board.bhits}</td>
            <th>등록일자</th>
            <td>{board.bdate}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colSpan={5}>{board.btitle}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td colSpan={5}>{board.bcontent}<br/><br/><br/><br/></td>
          </tr> 
          <tr>
            <td colSpan={6}>
              <button type="button" 
                      onClick={()=>handleNavigate('update')}>수정하기</button>
              <button type="button" 
                      onClick={()=>handleNavigate('delete')}>삭제하기</button>
              <button type="button" 
                      onClick={()=>handleNavigate('list')}>리스트</button>
            </td>
          </tr>         
        </table>
      </div>
    );
}
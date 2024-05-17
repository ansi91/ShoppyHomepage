import { Link, useNavigate } from 'react-router-dom';
/**
* step3 :  가입완료
*/
export default function SignupStep3() {
  const navigate = useNavigate();

  const handleLogin = () => {
    //~~~ 서버연동. 비교..
    navigate("/login");
  }

  return (
    <div className='signup'>
      <h2>SHOPPY SIGNUP</h2> 
      <img src="https://media.istockphoto.com/id/1319232417/ko/%EC%82%AC%EC%A7%84/%EB%B3%B5%EC%82%AC-%EA%B3%B5%EA%B0%84%EC%9C%BC%EB%A1%9C-%EC%84%B1%EA%B3%B5-%EB%B0%B0%EA%B2%BD-%EC%B8%A1%EC%A0%95.jpg?s=612x612&w=0&k=20&c=Qui3JZ6CvUt49gtkeNOqNIECVNJ-AodfFMbP3my3Ehs=" />
      <p>회원가입에 성공하셨습니다.</p>
      {/* <Link to="/login"> */}
        <button type="button" onClick={handleLogin}>로그인</button> 
      {/* </Link> */}
    </div>
  );
}

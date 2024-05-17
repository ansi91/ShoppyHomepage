
/**
 * 회원 가입
 */
export const getSignup = async (formData) => {
  console.log('formData ---->> ', formData);
  return {"cnt": 1};
}

/**
 * 아이디 중복 체크
 */
export const getIdCheck = (userId) => {
  const did = "test";
  const result = {};

  if(did === userId) {
    result.cnt = 1;  //사용불가
  } else {
    result.cnt = 0;  //사용가능
  }
  return result;
}


/**
 * 로그인 처리
 */
export const getLogin = (userId, userPass) => {
  //did = test, dpass = 1234
  const did = "test";
  const dpass = "1234";
  const result = {};

  //패스워드 체크 후 숫자로 결과를 전송
  if(did === userId && dpass === userPass){     
    result.cnt = 1; //로그인 성공 : {cnt : 1}
  } else {
    result.cnt = 0; //로그인 실패 : {cnt : 0}
  }
  
  return result;
}
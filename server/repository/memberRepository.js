import { db } from '../db/database_mysql80.js';


/**
 * 회원 가입
 */
export const getSignup = async (formData) => {  
  let result_rows = 0;
  let phone1 = formData.phoneNumber1;
  let phone2 = '';
  let phone3 = '';

  if(formData.phoneNumber2.length === 8){
    phone2 = formData.phoneNumber2.slice(0, 4);
    phone3 = formData.phoneNumber2.slice(4);
  } else {
    phone2 = formData.phoneNumber2.slice(0, 3);
    phone3 = formData.phoneNumber2.slice(3);
  }

  const params = [
      formData.userId,
      formData.userPass,
      formData.userName,
      formData.emailId,
      formData.emailDomain,
      phone1.concat('-', phone2, '-', phone3),
      formData.zipcode,
      formData.address.concat(' ', formData.detailAddress)
  ];

  const sql = `
      insert into shoppy_member(  user_id,
                                  user_pass,
                                  user_name,
                                  email_id,
                                  email_domain,
                                  phone,
                                  zipcode,
                                  address,
                                  signup_date
                                )
            values( ?, ?, ? ,? ,? ,? ,? ,? ,now()) 
  `;

  try {
    const [result] = await db.execute(sql, params);
    result_rows = result.affectedRows;
  } catch (error) {
    console.log(error);
  }

  return {"cnt": result_rows};
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
export const getLogin = async (userId, userPass) => {  
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
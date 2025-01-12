import { useRef, useState } from 'react';
import axios from 'axios';
import { validateCheckStep2, passCheck, changeEmailDomain } 
        from '../apis/validate.js';
import DaumPostcode from 'react-daum-postcode';        
      

/**
* step2 : 정보입력
*/
export default function SignupStep2({pre, next, formData, 
                                      handleChange, handleAddress}) {
  const refs = {
    userIdRef: useRef(null),
    userPassRef: useRef(null),
    userPassCheckRef: useRef(null),
    userNameRef: useRef(null),
    emailIdRef: useRef(null),
    emailDomainRef: useRef(null),
    phoneNumber1Ref: useRef(null),
    phoneNumber2Ref: useRef(null),
    zipcodeRef: useRef(null),
    addressRef: useRef(null),
    detailAddressRef: useRef(null)
  };

  /** 주소검색 버튼Toggle */
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpen2, setIsOpen2] = useState(false);

  /** 주소 검색 버튼 */
  const handleToggle = (type) => {
    setIsOpen(!isOpen);
    
    // switch(type){
    //   case 'dream' :
    //     // alert('dream');
    //     setIsOpen1(!isOpen1);
    //     break;
    //   case 'farm' :
    //     // alert('farm');
    //     setIsOpen2(!isOpen2);
    //     break;
    // }
  }

 /**
   * submit : 서버전송
   */
 const handleSubmit = () => {
  if(validateCheckStep2(refs)){
    if(passCheck(refs)) {
      //서버전송 : formData ==> 서버(NodeJS/Java/C#) ==> DB(MySQL) 저장 
      //성공 ---> next()
      //실패 ---> 에러 페이지 
      console.log('submit->> ', formData);

      const url = "http://127.0.0.1:8080/member/signup";
      axios({
        method: "post",
        url: url,
        data: formData
      })
        .then(res => {
          if(res.data.cnt === 1) {
            // alert("회원가입 성공");
            next();
          } else {
            alert("회원가입 실패");
          }
        })
        .catch();

      // next();
    }
  }    
} 

/**
 * 아이디 중복체크
 */
const handleIdCheck = () => {
  if(refs.userIdRef.current.value == ""){
    alert("아이디를 입력해주세요");
    refs.userIdRef.current.focus();
  } else {
    //서버연동 - 사용중 : {cnt: 1}, 사용가능 : {cnt: 0}
    const url = "http://127.0.0.1:8080/member/idCheck";
    const userId = refs.userIdRef.current.value;
    axios({
      method: "post",
      url: url,
      data : {"userId": userId}
    })
    .then(res => {
      console.log(res.data);
      if(res.data.cnt === 1){
        alert("이미 사용중인 아이디 입니다. 다시 입력해주세요");
        // refs.userIdRef.current.value = "";
        refs.userIdRef.current.focus();
      } else {
        alert("사용 가능한 아이디입니다.");
        refs.userPassRef.current.focus();
      }
    })
    .catch(error => console.log(error));
  }
}


//---- DaumPostcode 관련 디자인 및 이벤트 시작 ----//
const themeObj = {
  bgColor: '#FFFFFF', 
  pageBgColor: '#FFFFFF', 
  postcodeTextColor: '#C05850',
  emphTextColor: '#222222',
};

const postCodeStyle = {
  width: '360px',
  height: '480px',
};

const completeHandler = (data) => {
  const { address, zonecode } = data;
  handleAddress({zipcode:zonecode, address:address});
};

const closeHandler = (state) => {
  if (state === 'FORCE_CLOSE') {
    setIsOpen(false);
    // setIsOpen1(false);
    // setIsOpen2(false);
  } else if (state === 'COMPLETE_CLOSE') {
    // setIsOpen1(false);
    // setIsOpen2(false);
    refs.detailAddressRef.current.value="";
    refs.detailAddressRef.current.focus();
  }
};
//---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//

    return (
      <div className='signup'>
        <h2>SHOPPY SIGNUP</h2>
        <div>
          <h3>정보입력</h3>
          <p>회원가입에 필요한 정보를 입력합니다.</p>
        </div> 
        <ul className='signup-info'>
          <li>
            <p>아이디<span>*</span></p>
            <input type="text" 
                   name="userId"
                   value={formData.userId}
                   onChange={handleChange}
                   ref={refs.userIdRef}
                    />
            <button type="button" onClick={handleIdCheck}>중복확인</button>
          </li>
          <li>
            <p>비밀번호<span>*</span></p>
            <input type="password" 
                    name="userPass" 
                    value={formData.userPass}   
                    onChange={handleChange}  
                    ref={refs.userPassRef}               
                    placeholder="8~12자 의 영문(대소문자,숫자,특수문자)를 조합해서 만들어주세요"/>
          </li>
          <li>
            <p>비밀번호 확인<span>*</span></p>
            <input type="password"
                   name="userPassCheck"   
                   value={formData.userPassCheck} 
                   onChange={handleChange}   
                   ref={refs.userPassCheckRef}           
                   placeholder="확인을 위하여 위와 동일하게 입력해주세요" />
          </li>
          <li>
            <p>이름<span>*</span></p>
            <input type="text"
                    name="userName"  
                    value={formData.userName} 
                    onChange={handleChange} 
                    ref={refs.userNameRef}               
                    placeholder="한글/영문으로 입력해주세요" />
          </li>
          <li>
            <p>이메일<span>*</span></p>
            <input type="text" 
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    ref={refs.emailIdRef} /> @ 
            <input type="text" 
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleChange}
                    ref={refs.emailDomainRef}/>

            <select name="emailDomain" onChange={(e)=>changeEmailDomain(e, refs, handleChange)} >
              <option value="self">직접입력</option>
              <option value="naver.com">네이버</option>
              <option value="gmail.com">구글</option>
              <option value="hotmail.com">MS</option>
            </select>
          </li>
          <li>
            <p>휴대폰 번호<span>*</span></p>
            <select name="phoneNumber1">
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
            </select>
            <input type="text" 
                   name="phoneNumber2"
                   value={formData.phoneNumber2}
                   onChange={handleChange}
                   ref={refs.phoneNumber2Ref}
                   placeholder="-없이 입력해주세요" />
          </li>
          <li>
            <p>주소</p>
            <div>
              <input type="text" 
                    name="zipcode"
                    value={formData.zipcode}
              />
              <button type="button" onClick= {handleToggle} >주소검색</button>
              {/* <button type="button" onClick= {()=>handleToggle('farm')} >주소검색2</button> */}
            </div>
            <input type="text" 
                   name="address"
                   value={formData.address}
                   />
            <input type="text" 
                   name="detailAddress"
                   value={formData.detailAddress}
                   onChange={handleChange}
                   ref={refs.detailAddressRef}
                   placeholder="상세주소를 입력해주세요" />

          {isOpen &&
            <div>
              <DaumPostcode
                    className="postmodal"
                    theme={themeObj}
                    style={postCodeStyle}
                    onComplete={completeHandler}
                    onClose={closeHandler}
                  />  
            </div>
          } 

        {/* {isOpen2 &&
            <div>
              <DaumPostcode
                    className="postmodal"
                    theme={themeObj}
                    style={postCodeStyle}
                    onComplete={completeHandler}
                    onClose={closeHandler}
                  />  
            </div>
          } */}
            
          </li>
        </ul> 
        <button type="button" onClick={pre}>뒤로</button>  
        <button type="button" onClick={handleSubmit}>가입완료</button>  
      </div>
    );
}

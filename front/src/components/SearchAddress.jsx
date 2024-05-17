import React, { useState, useRef} from 'react';
import DaumPostcode from 'react-daum-postcode';
// import '../css/style.css';

export default function SearchAddress({handleChange, formData}) {
  const [zonecode, setZonecode] = useState(formData.zipcode);
  const [address, setAddress] = useState(formData.address);
  const [detailAddress, setDetailAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const detailAddressRef = useRef(null);

  /** 주소 검색 버튼 */
  const handleToggle = () => {
    setIsOpen(!isOpen);
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
    setZonecode(zonecode);
    setAddress(address);
  };

  const closeHandler = (state) => {
    if (state === 'FORCE_CLOSE') {
      setIsOpen(false);
    } else if (state === 'COMPLETE_CLOSE') {
      setIsOpen(false);
      detailAddressRef.current.focus();
    }
  };
  //---- DaumPostcode 관련 디자인 및 이벤트 종료 ----//


  /** 상세 주소 입력 */
  const inputChangeHandler = (event) => {
    setDetailAddress(event.target.value); 
  };

  /** 상세 주소 blur */
  // const inputBlurHandler = () => {
  //   handleAddress(`${zonecode} ${address} ${detailAddress}`);
  // }
 

    return (
      <div>
        <div>
          <input type="text" 
                name="zonecode"
                value={formData.zipcode}
                placeholder="우편번호"
                 />
          <button type="button"
                  onClick= {handleToggle}>주소검색</button>
        </div>         
        <input type="text" 
              name="address"
              value={formData.address}  
              placeholder="주소"
              style={{width:"300px"}}           
               /> <br/>
        <input type="text" 
              name="detailAddress"                           
              placeholder="상세주소"
              value = {detailAddress}
              onChange={inputChangeHandler}
              ref={detailAddressRef} />

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
      </div>
    );
}
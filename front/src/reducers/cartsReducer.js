import { createSlice } from '@reduxjs/toolkit';

// 공유데이터
const initialState = {
  list : [],
  count : 0
}

// 리듀서 생성함수
const cartsReducer = createSlice({
  name : 'carts',
  initialState,
  reducers : {
    setCartItem(state, action){
      console.log('action.payload.cnt :: ', action.payload.cnt);
      if(action.payload.cnt === 1){
        alert('장바구니에 추가되었습니다');
      }
    },
    setCartList(state, action){
      state.list = action.payload.clist;
    }
  }
});

export const { setCartItem, setCartList } = cartsReducer.actions;
export default cartsReducer.reducer;
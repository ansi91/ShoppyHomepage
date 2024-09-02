import { createSlice } from '@reduxjs/toolkit';

// 공유데이터
const initialState = {
  list : [],
  item : {},
  page : 1
}

// 리듀서 생성함수
const productsReducer = createSlice({
  name : 'products',
  initialState,
  reducers : {
    setProductList(state, action) {
      state.list = action.payload.plist;
      state.page = action.payload.currentPage;      

      //dispatch => 이벤트가 발생하는 경우!!
      // console.log('action.payload.currentPage ==> ', action.payload.currentPage); //{plist: Array(3)}
      // if(action.payload.currentPage === 1){
      //   state.list[0] = action.payload.plist;
      // }else{
      //   state.list = [...state.list, action.payload.plist];// [{},{},{}]
      // }     
    },
    setItem(state, action){
      state.item = action.payload.item;
    }
  }
});

export const { setProductList, setItem } = productsReducer.actions;
export default productsReducer.reducer;
import * as repository from '../repository/cartsRepository.js';

/**
 * 장바구니 count
 */
export const getCount = async (req, res) => {
  const { userId } = req.body;
  // console.log('userId => ', userId);
  const result = await repository.getCount(userId);
  res.json(result);
  res.end();
}


/**
 * 장바구니 추가 : insert
 */
export const insert = async(req, res) => {
  const items = req.body;  
  const result = await repository.insert(items);
  res.json(result);
  res.end();
}

/**
 * 장바구니 전체 리스트 : getCarts
 */
export const getCarts = async (req, res) => {
  // const { items } = req.body;
  const cartList = await repository.getCarts();
  res.json(cartList);
  res.end();
}


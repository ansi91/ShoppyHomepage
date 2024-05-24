import * as repository from '../repository/cartsRepository.js';


export const insert = async (req, res) => {
  // const { items } = req.body;
  // console.log(req.body);
  const result = await repository.insert(req.body);
  res.json(result);
  res.end();
}

export const getCarts = async (req, res) => {
  const { items } = req.body;
  const cartList = await repository.getCarts(items);
  res.json(cartList);
  res.end();
}
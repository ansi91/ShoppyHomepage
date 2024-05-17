import * as repository from '../repository/homeRepository.js';

export const getHome = async (req, res) => {
  const products = await repository.getHome();

  res.json(products);
  res.end();
}
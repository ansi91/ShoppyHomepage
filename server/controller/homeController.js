import * as repository from '../repository/homeRepository.js';

export const getHome = async (req, res) => {
  const products = await repository.getHome();

  res.json(products);
  res.end();
}

export const getTest = async (req, res) => {
  // console.log('test');
  const array = ['1','2','3'];
  let data = array.map(()=> '?');
  console.log(data);
  const sdata = data.join(',');
  console.log(sdata);


}
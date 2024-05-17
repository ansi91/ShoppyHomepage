import { promises as fsPromises } from 'fs';

export const getHome = () => {
  const path = "data/product.json";
  const products = fsPromises.readFile(path, "utf-8")
                    .then((data)=> {
                      // ~~~~~
                      return JSON.parse(data)
                    })
                    .catch(error => console.log(error));
  return products;
}
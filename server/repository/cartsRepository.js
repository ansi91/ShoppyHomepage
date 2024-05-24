import { promises as fsPromises } from 'fs';
import { db } from '../db/database_mysql80.js';


export const cartCheck = async (items) => {
  const sql = `
      SELECT c.cid, 
          COALESCE(COUNT(sc.cid), 0) as count
    FROM (SELECT DISTINCT cid FROM shoppy_cart) c
    LEFT JOIN shoppy_cart sc
    ON c.cid = sc.cid AND sc.pid = ? AND sc.size = ?
    GROUP BY c.cid
`;

  const [result] = await db.execute(sql, [items.id, items.size]);
  // console.log('re==>',result);
  return result[0];
}


/**
 * 장바구니 추가
 */
export const insert = async (items) => {
  console.log('items ==> ', items.id);
  let result_rows = 0;
  const checkResult = await cartCheck(items);
  console.log('cartCheck =>', checkResult);
  

  // const sql = `
  //     INSERT INTO SHOPPY_CART(PID, SIZE, CDATE) 
  //       VALUES(?, ?, NOW())
  // `;

  // try{
  //   const [result] = await db.execute(sql, [items.id, items.size]);
  //   console.log('result ==> ', result.affectedRows);
  //   result_rows = result.affectedRows;
  // }catch(error){}

  return {cnt : result_rows};  
}

/**
 * 장바구니 리스트
 */
export const getCarts = (items) => {
  const path = "data/product.json";
  const cartList = fsPromises
                    .readFile(path, "utf-8")
                    .then(data => { 
                        const products = JSON.parse(data);
                        const updateCartItems = items.map((item, index) => {
                          //item ==> id:1
                          const product = products.find(product => product.id === item.id);
                            if(product) {
                              return {...item,
                                      image:product.image, 
                                      name:product.name, 
                                      price:product.price, 
                                      info:product.info };np
                            }
                          return item;
                        });

                        return updateCartItems;
                    })
                    .catch(error => console.log(error));

  return cartList;
}

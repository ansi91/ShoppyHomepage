import { promises as fsPromises } from 'fs';
import { db } from '../db/database_mysql80.js';

/**
 * 상품 등록
 */
export const insert = async (productData) => {  
  let result_rows = 0;
  const params = [
    productData.name,
    productData.price,
    productData.info,
    productData.uploadImage,
    productData.orgImage    
  ];
  const sql = `
      insert into shoppy_product(name, price, info, image, org_image, pdate)
        values(?, ?, ?, ?, ?, now())  
  `;
  try {
    const [rows] = await db.execute(sql, params);
    result_rows = rows.affectedRows;
  } catch (error) {
    console.log(error);  
  }

  return {cnt: result_rows};
}

/**
 * 개별 상품 파일 읽어오기
 */
export const getProduct = async(id) => {
  const sql = `
      select pid as id, name, price, info, image
          from shoppy_product
          where pid = ?
  `;

  return db
          .execute(sql, [id])
          .then(result => result[0][0]) ;   
          //result[0]=>[{}], result[0][0]=> {}
}

/**
 * 전체 상품 파일 읽어오기
 */
export const getProducts = async(params) => {
  const sql = `
        select rno, id, image from
                        (select row_number() over(order by pdate) as rno,
                            pid as id, 
                            image 
                        from shoppy_product ) sb
      where rno between ? and ? 
  `;
  return db
          .execute(sql, [params.startIndex, params.endIndex])
          .then(result => result[0]);  // [{},{}..]

}
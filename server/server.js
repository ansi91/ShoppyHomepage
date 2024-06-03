import express from 'express';
import cors from 'cors';
import homeRouter from './router/homeRouter.js';
import productRouter from './router/productRouter.js';
import cartsRouter from './router/cartsRouter.js';
import memberRouter from './router/memberRouter.js';
import uploadRouter from './router/uploadRouter.js';
import boardRouter from './router/boardRouter.js';
import path from 'path';

const server = express();
const port = 8080;

/** 공통적인 요청 */
server.use(express.json());
server.use(express.urlencoded());  
server.use(cors());
server.use('/uploads', express.static(path.join('uploads')));

server.use('/', homeRouter);
server.use('/product', productRouter);
server.use('/carts', cartsRouter);
server.use('/member', memberRouter);
server.use('/upload', uploadRouter);
server.use('/board', boardRouter);


server.listen(port, ()=>{
  console.log(`server start ===>> ${port}`);
});
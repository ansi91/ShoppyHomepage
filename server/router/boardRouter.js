import express from 'express';
import * as controller from '../controller/boardController.js';

const router = express.Router();

router.post('/new', controller.insert);
router.post('/list', controller.list);
router.get('/:bid', controller.detail);
router.post('/update', controller.update);
router.post('/delete', controller.bidDelete);
router.post('/updateHits', controller.updateHits);


export default router;
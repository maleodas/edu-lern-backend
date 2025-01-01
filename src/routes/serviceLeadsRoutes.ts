import express from 'express';
import {
  getServiceLeads,
  uploadDataExcel,
} from '../controllers/serviceLeadsController';
const router = express.Router();

router.post('/uploadData', uploadDataExcel);
router.get('/getServiceLeads', getServiceLeads);

export { router };

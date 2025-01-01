import xlsx from 'xlsx';
import { serviceLeadsModel } from '../models/serviceLead.model';
import { excelData } from '../types/excel.type';
const dealerId = '66ebd29c52c870290d228588';

export const uploadDataExcel = async (req, res) => {
  try {
    const body = req.files.file.data;
    const workbook = xlsx.read(body, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];

    const data: excelData[] = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName],
    );

    const serviceLeadsExcelData = data.map(lead => ({
      userId: dealerId,
      dealerId: '1',
      srlNo: lead['srl no'],
      dealerName: lead['Dealer Name'],
      dealerCity: lead[' Dealer City'],
      Location: lead[' Location'],
      group_by: lead[' group_by'],
      BillNo: lead[' Bill No'],
      billDate: lead[' Bill Date'],
      jobCardNo: lead[' Job Card No'],
      serviceType: lead[' Service Type'],
      registrationNo: lead[' Registration No'],
      customerID: lead[' Customer ID'],
      partyName: lead[' Party Name'],
      gstNum: lead[' GST Num'],
      placeOfSupply: lead[' Place of supply'],
      partsBasicAmount: lead[' Parts basic Amount'],
      partsDiscount: lead['Parts Discount'],
      partsCharges: lead[' Parts charges'],
      labourBasicAmt: lead[' Labour Basic Amt'],
      labourDiscount: lead[' Labour Discount'],
      labourCharges: lead[' Labour charges'],
      RoundOffAmt: lead[' Round off Amt'],
      billAmt: lead[' Bill Amt'],
    }));
    await serviceLeadsModel.insertMany(serviceLeadsExcelData);
    res.status(200).json({ message: 'Data uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ message: 'Error uploading data', error });
  }
};

export const getServiceLeads = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const skip = (page - 1) * limit;
    const serviceLeads = await serviceLeadsModel
      .find()
      .skip(skip)
      .limit(parseInt(limit, 10))
      .exec();
    const totalItems = await serviceLeadsModel.countDocuments();
    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
      serviceLeads,
    });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ message: 'Error uploading data', error });
  }
};

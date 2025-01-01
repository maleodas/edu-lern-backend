import mongoose from 'mongoose';

export interface serviceLeadsData {
  dealerId: mongoose.Types.ObjectId;
  srlNo: number;
  dealerName: string;
  dealerCity: string;
  Location: string;
  group_by: string;
  BillNo: string;
  billDate: number;
  jobCardNo: string;
  serviceType: string;
  registrationNo: string;
  customerID: string;
  partyName: string;
  gstNum: string;
  placeOfSupply: string;
  partsBasicAmount: number;
  partsDiscount: number;
  partsCharges: number;
  labourBasicAmt: number;
  labourDiscount: number;
  labourCharges: number;
  RoundOffAmt: number;
  billAmt: number;
}

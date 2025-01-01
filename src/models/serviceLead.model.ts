import mongoose from 'mongoose';

const serviceLeadsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId },
    dealerId: { type: String },
    srlNo: { type: Number },
    dealerName: { type: String },
    dealerCity: { type: String },
    Location: { type: String },
    group_by: { type: String },
    BillNo: { type: String },
    billDate: { type: Number },
    jobCardNo: { type: String },
    serviceType: { type: String },
    registrationNo: { type: String },
    customerID: { type: String },
    partyName: { type: String },
    gstNum: { type: String },
    placeOfSupply: { type: String },
    partsBasicAmount: { type: Number },
    partsDiscount: { type: Number },
    partsCharges: { type: Number },
    labourBasicAmt: { type: Number },
    labourDiscount: { type: Number },
    labourCharges: { type: Number },
    RoundOffAmt: { type: Number },
    billAmt: { type: Number },
  },
  { timestamps: true },
);

serviceLeadsSchema.virtual('id').get(function () {
  return;
});
serviceLeadsSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const serviceLeadsModel = mongoose.model('serviceLeads', serviceLeadsSchema);

export { serviceLeadsModel };

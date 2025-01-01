import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    dealerMaster: { type: String },
    dealerID: { type: String },
    dealerParent: { type: String },
    locationCode: { type: String },
    saleCode: { type: String },
    outletCode: { type: String },
    dealerMapCode: { type: String },
    billSeriesNo: { type: String },
    locationDescription: { type: String },
    dealerName: { type: String },
    dealerCity: { type: String },
    email: { type: String, unique: true },
    dealerAdminName: { type: String },
    dealerAdminContactNo: { type: String },
    password: { type: String, default: 'admin@123', select: false },
    request: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.virtual('id').get(function () {
  return;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});
const userModel = mongoose.model('user', userSchema);

export { userModel };

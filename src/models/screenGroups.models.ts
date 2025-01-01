import mongoose from 'mongoose';

const screenGroupSchema = new mongoose.Schema(
  {
    name: { type: String },
    code: { type: String },
    description: { type: String },
    application: { type: String },
    validFrom: { type: Date },
    validTill: { type: Date },
  },
  { timestamps: true },
);

screenGroupSchema.virtual('id').get(function () {
  return;
});

screenGroupSchema.virtual('validFromDate').get(function () {
  return this.validFrom ? this.validFrom.toISOString().split('T')[0] : null;
});

screenGroupSchema.virtual('validTillDate').get(function () {
  return this.validTill ? this.validTill.toISOString().split('T')[0] : null;
});
screenGroupSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.validFrom;
    delete ret.validTill;
  },
});
const screenGroupModel = mongoose.model('screenGroups', screenGroupSchema);

export { screenGroupModel };

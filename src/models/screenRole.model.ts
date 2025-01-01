import mongoose from 'mongoose';

const screenRoleSchema = new mongoose.Schema(
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

screenRoleSchema.virtual('id').get(function () {
  return;
});

screenRoleSchema.virtual('validFromDate').get(function () {
  return this.validFrom ? this.validFrom.toISOString().split('T')[0] : null;
});

screenRoleSchema.virtual('validTillDate').get(function () {
  return this.validTill ? this.validTill.toISOString().split('T')[0] : null;
});
screenRoleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.validFrom;
    delete ret.validTill;
  },
});
const screenRoleModel = mongoose.model('screenRoles', screenRoleSchema);

export { screenRoleModel };

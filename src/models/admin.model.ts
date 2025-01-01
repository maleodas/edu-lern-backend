import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    name: { type: String },
    role: { type: String, default: 'admin' },
    email: { type: String, unique: true },
    password: { type: String, default: 'admin@123', select: false },
    status: { type: Boolean, default: false },
  },
  { timestamps: true },
);

adminSchema.virtual('id').get(function () {
  return;
});
adminSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const adminModel = mongoose.model('admin', adminSchema);

export { adminModel };

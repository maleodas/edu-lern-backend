import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String },
    key: { type: String, unique: true },
    status: { type: Boolean, default: true },
    admin: [{ type: mongoose.Types.ObjectId }],
    redirectUrl: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true },
);

applicationSchema.virtual('id').get(function () {
  return;
});
applicationSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});
const applicationModel = mongoose.model('applications', applicationSchema);

export { applicationModel };

import mongoose from 'mongoose';

const accessTokenSchema = new mongoose.Schema(
  {
    accessToken: { type: String },
    userId: { type: String },
    email: { type: String },
  },
  { strict: false, timestamps: true },
);
accessTokenSchema.virtual('id').get(function () {
  return;
});
accessTokenSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const accessTokenModel = mongoose.model('accessToken', accessTokenSchema);

export { accessTokenModel };

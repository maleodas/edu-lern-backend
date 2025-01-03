import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    userName: { type: String },
    password: { type: String },
    email: { type: String },
    role: { type: String },
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

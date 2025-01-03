import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema(
  {
    popularService: [
      {
        title: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    Vontéllesgotoservices: [
      {
        title: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    GuideToHelp: [
      {
        title: { type: String, required: true },
        image: { type: String, required: true },
      },
    ],
    madeOnSite: [
      {
        image: { type: String, required: true },
        featuredin: { type: String, required: true },
        by: { type: String, required: true },
        id: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

dashboardSchema.virtual('id').get(function () {
  return;
});
dashboardSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});
const dashboardModel = mongoose.model('dashboard', dashboardSchema);

export { dashboardModel };

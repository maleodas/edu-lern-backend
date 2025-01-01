import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String },
    key: { type: String },
    description: { type: String },
    application: { type: String },
    validFrom: { type: Date },
    validTill: { type: Date },
  },
  { timestamps: true },
);

permissionSchema.virtual('validFromDate').get(function () {
  return this.validFrom ? this.validFrom.toISOString().split('T')[0] : null;
});

permissionSchema.virtual('validTillDate').get(function () {
  return this.validTill ? this.validTill.toISOString().split('T')[0] : null;
});

permissionSchema.virtual('id').get(function () {
  return;
});
permissionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.validFrom;
    delete ret.validTill;
  },
});
const permissionModel = mongoose.model('permissions', permissionSchema);

export { permissionModel };

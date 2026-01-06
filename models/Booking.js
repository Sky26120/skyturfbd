import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // userName: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    // userPhone: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },

    arenaName: {
      type: String,
      required: true,
      trim: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      default: 90,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentType: {
      type: String,
      enum: ["full", "advance"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paidAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },

    transactionId: {
      type: String,
      default: null,
    },
    advanceReceiver: {
      type: String,
      trim: true,
      default: null,
    },

    dueReceiver: {
      type: String,
      trim: true,
      default: null,
    },

   bookingForName: {
  type: String,
  required: true,
  trim: true,
},

bookingForPhone: {
  type: String,
  required: true,
  trim: true,
},

bookingByRole: {
  type: String,
  enum: ["SUPER_ADMIN", "GENERAL_ADMIN",  "MODERATOR", "USER"],
  required: true,
},

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, bookingDate: -1 });

bookingSchema.index(
  { arenaName: 1, bookingDate: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["pending", "confirmed"] } },
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);

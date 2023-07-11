const { Schema, model } = require("mongoose")

const complaintSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    report: {
      type: Schema.Types.ObjectId,
      ref: "Report"
    },
    partNumber: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    problemDesc: {
      type: String,
      required: true,
    },
    problemDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    problemImg: {
      type: String,
      required: true,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Complaint = model("Complaint", complaintSchema)

module.exports = Complaint

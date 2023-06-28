const { Schema, model } = require("mongoose")

const complaintSchema = new Schema(
  {
    mainId: {
      type: Schema.Types.ObjectId,
      ref: "Main",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    },
    report: {
      type: Schema.Types.ObjectId,
      ref: "Report"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Complaint = model("Complaint", complaintSchema)

module.exports = Complaint

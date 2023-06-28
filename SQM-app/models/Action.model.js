const { Schema, model } = require("mongoose")

const actionSchema = new Schema(
  {
    mainId: {
      type: Schema.Types.ObjectId,
      ref: "Main",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isClosed: {
      type: Boolean,
      required: true,
      default: false,
    },
    closeDate: {
      type: Date,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Action = model("Action", actionSchema)

module.exports = Action

const { Schema, model } = require("mongoose")

const reportSchema = new Schema(
  {
    complaint: {
      type: Schema.Types.ObjectId,
      ref: "Complaint"
    },
    mainId: {
      type: Schema.Types.ObjectId,
      ref: "Main",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    d3: {
      type: Object,
      default: {
        teamMembers: [],
        w5h2: [],
        subTime: Date.now(),
        attachments: [],
        approval: false,
        appTime: Date.now(),
      },
    },
    d4: {
      type: Object,
      default: {
        whyDet: [],
        whyOcc: [],
        rootCauseDet: [],
        rootCauseOcc: [],
        attachments: [],
        subTime: Date.now(),
        approval: false,
        applyTime: Date.now(),
      },
    },
    d5d6: {
      type: Object,
      default: {
        attachments: [],
        subTime: Date.now(),
        approval: false,
        appTime: Date.now(),
      },
    },
    d7: {
      type: Object,
      default: {
        attachments: [],
        subTime: Date.now(),
        approval: false,
        appTime: Date.now(),
      },
    },
    actionsD3: [
      {
        type: Schema.Types.ObjectId,
        ref: "Action",
      },
    ],
    actionsD5D6: [
      {
        type: Schema.Types.ObjectId,
        ref: "Action",
      },
    ],
    actionsD7: [
      {
        type: Schema.Types.ObjectId,
        ref: "Action",
      },
    ],
    approval: {
      type: Boolean,
      default: false,
    },
    approvalDate: {
      type: Date,
    },
    creationDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Report = model("Report", reportSchema)

module.exports = Report

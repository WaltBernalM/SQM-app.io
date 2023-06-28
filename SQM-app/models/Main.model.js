const { Schema, model } = require("mongoose")

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const mainSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    org: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    main: {
      type: Boolean,
      default: true,
    },
    complaints: [{
      type: Schema.Types.ObjectId,
      ref: "Complaint",
    }],
    // reports: [{
    //   type: Schema.Types.ObjectId,
    //   ref: "Report",
    // }],
  },
  {
    timestamps: true,
  }
)

const Main = model("Main", mainSchema)

module.exports = Main

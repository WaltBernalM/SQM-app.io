const session = require("express-session")
const MongoStore = require("connect-mongo")
const mongoose = require("mongoose")

module.exports = (app) => {
  app.set("trust proxy", 1)

  // use session
  app.use(
    session({
      // @ts-ignore
      secret: process.env.SESSION_SECRET || "super hyper secret key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 3600000, // 3600 * 1000 ms === 1 minute
      },
      store: MongoStore.create({
        mongoUrl:
          process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/SQM-app",
        // ttl => time to live
        // ttl: 60 * 60 * 24, // 60sec * 60min * 24h => 1 day
      }),
    })
  )
}

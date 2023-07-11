const MONGO_URI = process.env.MONGODB_URI //|| "mongodb://127.0.0.1:27017/SQM-app"
const databaseName = 'SQM-app'

module.exports = { MONGO_URI, databaseName }
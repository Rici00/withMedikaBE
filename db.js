const mongoose = require('mongoose')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config();

const uri = process.env.DATABASE_URL
// const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } } )
mongoose.connect(uri)
	.then(() => { console.log("Database connected") })
	.catch(() => { console.log("Database error") })

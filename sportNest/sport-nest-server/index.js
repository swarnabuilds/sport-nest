import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb';
import "dotenv/config";


const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

//databse connection 
const client = new MongoClient(process.env.MONGO_URI);
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const connectClient = await connectToMongoDB()
//database create
const db = connectClient.db('sport-nest');
const facilitiesCollection = db.collection("facilities");

//facilities
app.get('/facilities', async(req, res) => {
  const result = await facilitiesCollection.find().toArray()
  res.send(result);
});

app.post('/facilities', async(req, res) => {
  const facilityData = req.body;
  const result = await facilitiesCollection.insertOne(facilityData)
  res.send(result);
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(` server is running on port ${port}`)
})

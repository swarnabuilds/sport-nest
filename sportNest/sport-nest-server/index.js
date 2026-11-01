import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb';
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
const facilitiesBookingsCollection = db.collection("facilitiyBookings");




//facilities
app.get('/facilities', async(req, res) => {
  const result = await facilitiesCollection.find().toArray()
  res.send(result);
});

//create facility
app.post('/facilities', async(req, res) => {
  const facilityData = req.body;
  console.log(facilityData)
  const result = await facilitiesCollection.insertOne(facilityData)
  res.send(result);
});

//facility deatils (single facility)
app.get('/facilities/:id', async(req, res) => {
  const {id} = req.params
   const result = await facilitiesCollection.findOne({ _id: new ObjectId(id) })
  res.send(result);
});

//booking create
app.post('/facilities/booking', async(req, res) => {
  const bookingData = req.body;
  console.log(bookingData)
  const result = await facilitiesBookingsCollection.insertOne(bookingData)
  res.send(result);
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(` server is running on port ${port}`)
})

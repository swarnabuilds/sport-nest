import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb';
import "dotenv/config";
import { createRemoteJWKSet, jwtVerify } from 'jose';


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


//middleware
const verifyToken = async(req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    return res.status(401).send({ msg: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  if(!token){
    return res.status(401).send({ msg: "Unathorized!" })
  }

  const JWKS = createRemoteJWKSet(
      new URL('http://localhost:3000/api/auth/jwks')
  )

  try{
  const { payload } = await jwtVerify(token, JWKS);
  req.user = payload;
  console.log(payload)
    next();
  } catch {
    return res.status(500).send({ msg: "server error" })
  }
}




//facilities
app.get('/facilities', async(req, res) => {
  const result = await facilitiesCollection.find().toArray()
  res.send(result);
});

//create facility
app.post('/facilities',
  verifyToken,
  async(req, res) => {
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

//facilities =====update====
app.patch('/facilities/:id', async (req, res) => {
  const {id} = req.params;
 const { _id, ...updatedData } = req.body; //id te bad deuya holo
  const filter = { _id: new ObjectId(id) };
  const updateDoc = {
      $set: updatedData, // ekhon direct sob updated field gulo chole jabe
    };
  const result = await facilitiesCollection.updateOne(filter, updateDoc);
    res.send(result);  
})

//delete facilities
app.delete('/facilities/:id', async (req, res) => {
  const {id} = req.params;
  const result = await facilitiesCollection.deleteOne({ _id: new ObjectId(id) })
  res.send(result)
})


//my facilities 
app.get('/my-facilities/:email', 
  verifyToken,
  async(req, res) => {
  const {email} = req.params;

  if (email !== req.user?.email) {
    return res.status(403).send({ msg: "Forbidden access" });
  }
  
   const result = await facilitiesCollection.find({ creatorEmail: email }).toArray();
  res.send(result);
});


// Booking Create (Same Date & Time Slot Protection)
app.post('/facilities/booking',
  verifyToken,
  async (req, res) => {
  const bookingData = req.body;
  const { facilityId, bookingDate, timeSlot } = bookingData;

  // Ekai facility, same date o same time slot-e aage theke booking ache kina check
  const existingBooking = await facilitiesBookingsCollection.findOne({
    facilityId: facilityId,
    bookingDate: bookingDate,
    timeSlot: timeSlot,
  });

  // Slot already booked thakle error message firiye dibe
  if (existingBooking) {
    return res.status(400).send({
      success: false,
      message: "This slot is already booked for the selected date!",
    });
  }

  // Slot khali thakle booking insert hobe
  const result = await facilitiesBookingsCollection.insertOne(bookingData);
  res.send(result);
});


//specific user booking get
app.get('/facilities/bookings/:email', 
  verifyToken,
  async (req, res) => {
  try {
    const {email} = req.params;
    const query = { email: email };  
    const result = await facilitiesBookingsCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to fetch bookings", error: error.message });
  }
});

//booking delete
app.delete('/bookings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await facilitiesBookingsCollection.deleteOne(query);

    if (result.deletedCount === 1) {
      res.send({ success: true, message: "Booking cancelled successfully", result });
    } else {
      res.status(404).send({ success: false, message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to cancel booking", error: error.message });
  }
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(` server is running on port ${port}`)
})

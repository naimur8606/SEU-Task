
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://2022200000091:McrEZizEMfWTtxMP@cluster0.d8zzwrb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const allUsers = client.db("SEU-Task").collection("Users");


    app.get("/Users", async (req, res) => {
        const result = await allUsers.find().toArray();
        res.send(result);
    })

    app.post("/Users", async (req, res) => {
        const user = req?.body;
        const query = { email: req?.body?.email };
        const present = await allUsers.findOne(query)
        if (!present) {
            const result = await allUsers.insertOne(user);
            res.send(result);
        }
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kc6dmnx.mongodb.net/?retryWrites=true&w=majority`;

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
        // await client.connect();

        const allStudents = client.db("SEU-Communication").collection("Students");
        const allCourses = client.db("SEU-Communication").collection("Courses");
        const allSemesterCredit = client.db("SEU-Communication").collection("semesterCredit");


        app.get("/Students", async (req, res) => {
            const result = await allStudents.find().toArray();
            res.send(result);
        })

        app.get("/students/:id", async (req, res) => {
          const result = await allStudents.findOne({ _id: new ObjectId(req.params?.id) });
          res.send(result)
      })

        app.post("/students", async (req, res) => {
            const student = req?.body;
            const query = { email: req?.body?.email };
            const present = await allStudents.findOne(query)
            if (!present) {
                const result = await allStudents.insertOne(student);
                res.send(result);
            }else{
              res.send('This mail already Used!')
            }
        })

        app.patch("/students/addCourse/:id", async (req, res) => {
          const filter = { _id: new ObjectId(req.params?.id) };
          const present = await allStudents.findOne(filter);
          const presentCourse = present?.selectedCourses?.find( item =>item?._id === req?.body?._id)
          if(!presentCourse){
            const updatedDoc = {
              $set: {
                selectedCourses: [...present?.selectedCourses, req?.body]
              },
          };
          const result = await allStudents.updateOne(filter, updatedDoc);
          res.send(result);
          }else{ 
            res.send('This Course already Added!')
          }
          
      })

        app.get("/Courses", async (req, res) => {
            const result = await allCourses.find().toArray();
            res.send(result);
        })

        app.post("/Courses", async (req, res) => {
            const course = req?.body;
            const result = await allCourses.insertOne(course);
            res.send(result);
        })

        app.get("/semesterCredit", async (req, res) => {
            const result = await allSemesterCredit.find().toArray();
            res.send(result);
        })

        app.post("/semesterCredit", async (req, res) => {
            const course = req?.body;
            const result = await allSemesterCredit.insertOne(course);
            res.send(result);
        })
        app.get("/search/:text", async (req, res) => {
          const searchText = req?.params?.text;
          const result = await allStudents.find(
              {
                  $or: [
                      { name: { $regex: new RegExp(searchText, 'i') } },
                      { email: { $regex: new RegExp(searchText, 'i') } },
                      { department: { $regex: new RegExp(searchText, 'i') } }
                  ]
              },
              {
                  projection: { name: 1, _id: 1, credit:1, department:1 }
              }).toArray();
          res.send(result)
      })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('SEU Task Server  is open...')
})

app.listen(port, () => {
    console.log(`SEU Task Server is open on port ${port}`)
})
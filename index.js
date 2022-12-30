const express = require("express");
const app = express();
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middlewar

app.use(cors());
app.use(express.json());
// middlewar
//////////////////////////////////////////////////////
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ejrymvb.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
////////////////////////////////////////////////////////

////////////////////////////////////////////////////

async function run() {
  try {
    const Alltaskcollection = client
      .db("albratos-assignment-1")
      .collection("Alltask");

    ////////////////////////////////////////////

    app.post("/Alltask", async (req, res) => {
      const alltask = req.body;
      console.log(alltask);
      const result = await Alltaskcollection.insertOne(alltask);
      res.send(result);
    });
    //////
    app.get("/Alltask", async (req, res) => {
      const query = {};
      const options = await Alltaskcollection.find(query).toArray();
      res.send(options);
    });
    //////////

    app.delete("/Alltask/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await Alltaskcollection.deleteOne(filter);
      res.send(result);
    });
    //////////
    app.get("/Alltask/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await Alltaskcollection.findOne(filter);
      res.send(result);
    });
    //////////
    app.put("/Alltask/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await Alltaskcollection.updateOne(filter, {
        $set: req.body,
      });
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.log);
/////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

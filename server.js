const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://rushil:qwertynm@cluster0.hwecu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("database successfully connected"))
  .catch((error) => console.log(error));

const app = express();

app.use(cors());
app.use(express.json());

const location = new mongoose.Schema({
  lat: String,
  long: String,
  req: String,
});

const Locations = new mongoose.model("Location", location);

app.post("/location", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const location = Locations({
      lat: latitude,
      long: longitude,
    });

    await location.save();

    return res.status(200).json({ message: "location captured" });
  } catch (error) {
    console.log(error, req);

    return res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 5000);

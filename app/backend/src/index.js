import cors from "cors";
import express from "express";
import { Purchase } from "./models/purchase.js";
import MqttHandler from "./mqtt/setup.js";
import connectDb from "./database.js";
import bodyParser from "body-parser";

const PORT = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json());

var mqttClient = new MqttHandler();
mqttClient.connect();

connectDb();

/** -------------- GET -----------------*/
app.get("/purchase", async (req, res) => {
  try {
    const purchases = await Purchase.find({});

    res.status(200).send(purchases);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/purchase/:id", async (req, res) => {
  try {
    let purchase = await Purchase.findById({ _id: req.params.id });

    if (!purchase) throw new Error("Compra não existente");

    res.status(200).send(purchase);
  } catch (error) {
    res.send(error.message);
  }
});

/** -------------- POST -----------------*/
app.post("/purchase/", async (req, res) => {
  const info = req.body;

  mqttClient.registerPurchase(info);
  
  console.log(info);

  res.send("Message sent to mqtt");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

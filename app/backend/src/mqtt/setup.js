import mqtt from "mqtt";
import purchase from "./subscribe.js";
import dotenv from "dotenv";
dotenv.config();

class MqttHandler {
  constructor() {
    this.host = process.env.MQTT_HOST;
    this.port = 1883;
    this.protocol = "tcp";
    this.username = process.env.MQTT_USERNAME; // mqtt credentials if these are needed to connect
    this.password = process.env.MQTT_PASSWORD;
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
      host: this.host,
      port: this.port,
      protocol: this.protocol,
      reconnectPeriod: 5000, // Try reconnecting in 5 seconds if connection is lost
    });

    // Caso a conexão falhe
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Caso a conexão seja bem sucedida
    this.mqttClient.on("connect", () => {
      console.log(`Successful MQTT connection!`);
    });

    // Escutar pelo tópico /purchase
    this.mqttClient.subscribe("/purchase-rendered", { qos: 0 });

    // Função executada quando uma mensagem chega
    this.mqttClient.on("message", function (topic, message) {
      switch (topic) {
        case "/purchase-rendered":
          purchase(JSON.parse(message));
          break;
      }
    });

    // Desconectar do MQTT
    this.mqttClient.on("close", () => {
      console.log(`Desconectado do MQTT`);
    });
  }

  registerPurchase(json) {
    let stringify = JSON.stringify(json);
    this.mqttClient.publish("/purchase", stringify);
  }
}

export default MqttHandler;

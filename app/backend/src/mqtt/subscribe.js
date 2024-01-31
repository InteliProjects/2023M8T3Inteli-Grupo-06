import { Purchase } from "../models/purchase.js";

const purchase = async (purchaseData) => {
  try {
    const purchase = new Purchase(purchaseData);

    await purchase.save();

    console.log("Registro de compra salvo no banco de dados.");
  } catch (err) {
    console.error("Erro ao salvar registro de compra no banco de dados.");
    console.log(err);
  }
};

export default purchase;

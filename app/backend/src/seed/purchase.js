import { connect } from "mongoose";
import dotenv from "dotenv";
import { Purchase } from "../models/purchase.js";
dotenv.config();

// Data array containing seed data - documents organized by Model
var data = [
  {
    supplier_name: 'ABCDEFGHIJKLM',
    region: 'LATAM',
    country_name: 'Brazil',
    strategic_region: 'LATAM',
    level_one: 'Sales, Marketing & Events',
    level_two: 'Sales, Marketing & Events',
    level_three: 'Sales, Marketing & Events',
    business_unit: 'R&D',
    legal_entity: 'Meta Platforms, Inc.',
    cost_center_base: 'DES(Facebook Org Central XFN)',
    cost_center_four: 'Facebook R&D',
    cost_center_five: 'Research & Development',
    gl_four: 'Creative services',
    gl_five: 'Opex w/o Allocations & Interco',
    invoice_source: 'SUPP_CONNECT',
    gl_description: 'GL DESCRIPTION',
    amount_usd: 349101.75
  },
  {
    supplier_name: 'MADMBCALVINCKETAM7030INENKLEIN',
    region: 'NORAM',
    country_name: 'Canada',
    strategic_region: 'NORAM',
    level_one: 'Sales, Marketing & Events',
    level_two: 'Sales, Marketing & Events',
    level_three: 'Sales, Marketing & Events',
    business_unit: 'R&D',
    legal_entity: 'Meta Platforms, Inc.',
    cost_center_base: 'DES(Facebook Org Central XFN)',
    cost_center_four: 'Facebook R&D',
    cost_center_five: 'Research & Development',
    gl_four: 'Creative services',
    gl_five: 'Opex w/o Allocations & Interco',
    invoice_source: 'SUPP_CONNECT',
    gl_description: 'GL DESCRIPTION',
    amount_usd: 249101.75
  },
];

// Connect to MongoDB via Mongoose
connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addPurchase = async () => {
  for (let i in data) {
    try {
      const purchase = new Purchase(data[i]);
      await purchase.save();
      console.log("Compra adicionada ao banco de dados");
    } catch (err) {
      console.log(err);
    }
  }
};

addPurchase();

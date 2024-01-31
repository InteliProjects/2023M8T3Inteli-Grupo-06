import mongoose from "mongoose";
import { Schema } from "mongoose";

const purchaseSchema = new Schema({
  supplier_name: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  country_name: {
    type: String,
    required: true,
  },
  strategic_region: {
    type: String,
    required: true,
  },
  level_one: {
    type: String,
    required: true,
  },
  level_two: {
    type: String,
    required: true,
  },
  level_three: {
    type: String,
    required: true,
  },
  business_unit: {
    type: String,
    required: true,
  },
  legal_entity: {
    type: String,
    required: true,
  },
  cost_center_base: {
    type: String,
    required: true,
  },
  cost_center_four: {
    type: String,
    required: true,
  },
  cost_center_five: {
    type: String,
    required: true,
  },
  gl_four: {
    type: String,
    required: true,
  },
  gl_five: {
    type: String,
    required: true,
  },
  invoice_source: {
    type: String,
    required: true,
  },
  gl_description: {
    type: String,
    required: true,
  },
  amount_usd: {
    type: Number,
    required: true,
  },
});

export const Purchase = mongoose.model("Purchase", purchaseSchema);

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust this path to where products.json ACTUALLY is
const filePath = path.resolve(
  __dirname,
//   "../src/data/products.json"
  "../data/products.json"
);

// Read file
const raw = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(raw);

// Fix prices
const fixed = data.map((item) => {
  if (typeof item.price === "string") {
    return {
      ...item,
      price: item.price.replace(/,/g, ""),
    };
  }
  return item;
});

// Write back
fs.writeFileSync(filePath, JSON.stringify(fixed, null, 2), "utf-8");

console.log("✅ Commas removed from price fields");

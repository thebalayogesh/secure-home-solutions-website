const fs = require("fs");
const path = require("path");

const inputFile = path.join(
  process.cwd(),
  "data",
  "raw",
  "products.json"
);

const outputFile = path.join(
  process.cwd(),
  "data",
  "raw",
  "product.parse.json"
);

function parseDimensions(size) {
  if (!Array.isArray(size)) return null;

  const dimensions = {};

  for (const value of size) {
    if (typeof value !== "string") continue;

    // Match:
    // (cm) 104.8(h) x 63.8(w) x 61.1(d)
    const match = value.match(
      /^\s*\((cm|mm)\)\s*([\d.]+)\(h\)\s*x\s*([\d.]+)\(w\)\s*x\s*([\d.]+)\(d\)/i
    );

    if (!match) continue;

    const [, unit, height, width, depth] = match;

    dimensions[unit.toLowerCase()] = {
      height: Number(height),
      width: Number(width),
      depth: Number(depth),
    };
  }

  // If only one unit exists, automatically generate the other.
  if (dimensions.cm && !dimensions.mm) {
    dimensions.mm = {
      height: dimensions.cm.height * 10,
      width: dimensions.cm.width * 10,
      depth: dimensions.cm.depth * 10,
    };
  }

  if (dimensions.mm && !dimensions.cm) {
    dimensions.cm = {
      height: dimensions.mm.height / 10,
      width: dimensions.mm.width / 10,
      depth: dimensions.mm.depth / 10,
    };
  }

  if (!dimensions.cm && !dimensions.mm) {
    return null;
  }

  return dimensions;
}

try {
  const raw = fs.readFileSync(inputFile, "utf8");
  const products = JSON.parse(raw);

  if (!Array.isArray(products)) {
    throw new Error("products.json must contain an array of products.");
  }

  let added = 0;
  let skipped = 0;

  const updatedProducts = products.map((product) => {
    const dimensions = parseDimensions(product.size);

    if (!dimensions) {
      skipped++;

      console.warn(
        `⚠️ Could not parse dimensions: ${product.name || product.id}`
      );

      return product;
    }

    added++;

    return {
      ...product,
      dimensions,
    };
  });

  fs.writeFileSync(
    outputFile,
    JSON.stringify(updatedProducts, null, 2),
    "utf8"
  );

  console.log("\n✅ Done!");
  console.log(`Products processed: ${products.length}`);
  console.log(`Dimensions added:   ${added}`);
  console.log(`Skipped:            ${skipped}`);
  console.log(`\nOutput: ${outputFile}\n`);
} catch (error) {
  console.error("\n❌ Error:", error.message);
  process.exit(1);
}
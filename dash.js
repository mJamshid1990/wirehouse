const path = require("path");
const fs = require("fs/promises");

module.exports = async function dash() {
  const dbPath = path.join(__dirname, "data.json");
  const data = await fs.readFile(dbPath, "utf-8");
  const { products } = JSON.parse(data);

  console.table(products);
};

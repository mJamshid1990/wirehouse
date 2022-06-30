const path = require("path");
const fs = require("fs/promises");

module.exports = async function dep(product_name, count) {
  const dbPath = path.join(__dirname, "data.json");
  const data = await fs.readFile(dbPath, "utf-8");
  const { products } = JSON.parse(data);

  const productIndex = products.findIndex(
    (el) => el.name.toLowerCase() === product_name.toLowerCase()
  );
  if (productIndex > -1) {
    if (count > Number(products[productIndex].total)) {
      return console.log("You can't sell more than product count :(");
    }
    products[productIndex].sell = Number(products[productIndex].sell) + count;
    products[productIndex].total = Number(products[productIndex].total) - count;
  } else {
    return console.log(
      `Product with the name of ${product_name} not found, please try again with another product name`
    );
  }
  await fs.writeFile(dbPath, JSON.stringify({ products }));
  console.log(`${count} ta ${product_name} sotildi :)`);
};

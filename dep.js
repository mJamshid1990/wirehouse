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
    products[productIndex].init = Number(products[productIndex].init) + count;
    products[productIndex].total = Number(products[productIndex].total) + count;
  } else {
    products.push({
      name: product_name,
      init: count,
      sell: 0,
      total: count,
    });
  }
  await fs.writeFile(dbPath, JSON.stringify({ products }));
  console.log(`${count} ta ${product_name} omborga qo'shildi`);
};

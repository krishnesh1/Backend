// generate 100 sample products
const data = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));

module.exports = data;

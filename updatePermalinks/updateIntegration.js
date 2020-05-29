const { ProductsApi } = require("producteca-sdk")

module.exports = (bearer, channel, { product, permalink }) =>
  new ProductsApi({ accesToken: bearer })
  .updateIntegration(product.id, { permalink }, channel)
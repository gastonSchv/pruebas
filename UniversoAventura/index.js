const request = require('request-promise');
const universoAventuraApi = require('./universoAventuraApi')
const _ = require('lodash')

module.exports = function (context,req) {
  const salesOrder = req.body;
  context.log("mapping order", salesOrder)

  const __respond = (statusCode,body) => {
    context.log("responding",JSON.stringify({statusCode,body}));
    _.assign(context.res, { statusCode, body });
    return context.done();

  }
  const __respondOk = id => {
    return __respond(200, { id });
  } 

  if(salesOrder.id < parseInt(process.env.UNIVERSOAVENTURA_MIN_ORDER_ID)) {
    return __respond(409, {message: `La venta ${salesOrder.id} no puede ser enviada, fecha mayor a la mínima fecha de facturacion establecida`});
  }
  if(salesOrder.invoiceIntegration) {
    return __respondOk(salesOrder.invoiceIntegration.integrationId)
  }

  universoAventuraApi.getBuyerId(salesOrder)
  .tap(buyerId => context.log("order:",salesOrder.id, "BuyerId: ", buyerId))
  .then(buyerId => universoAventuraApi.deliverOrder(salesOrder, buyerId))
  .tap(response => context.log("order:",salesOrder.id,"Order Delivery Response: ", response))
  .then(response => __respondOk(_.get(response,'respuesta[0].Operación')))
  .catch(err => __respond(err.statusCode || 500 , {message: err.message}))
}

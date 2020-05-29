module.exports = {
	url: process.env.UNIVERSOAVENTURA_REQUEST_ENDPOINT || 'https://uniaventura.neuralsoft.com:4430/WSUniaventura/Service.svc/run/?key=xyz123',
  warehouse: process.env.UNIVERSOAVENTURA_WAREHOUSE || "3",
  minOrderId: process.env.UNIVERSOAVENTURA_MIN_ORDER_ID || 1
}
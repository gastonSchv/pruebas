const _ = require("lodash")
const Promise = require("bluebird")
const request = require("request-promise")

module.exports = (bearer, channel, integrationId) =>
  request({
    url:"https://apps.producteca.com/"+channel+"/api/products/"+integrationId+"/permalink",
    json:true,
    auth: { bearer: bearer }
  }).promise()
  .catch(it => ({ permalink: null }))
  .get("permalink")
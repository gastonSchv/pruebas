const _ = require("lodash")
const request = require("request-promise")
const Promise = require("bluebird")
const highland = require("highland")
require("highland-concurrent-flatmap")
const products = require("./products")
const permalink = require("./permalink")
const updateIntegration = require("./updateIntegration")

const CONCURRENCY = 10

const BEARER = "7e777ca340305afbcc873e031fe29ce2914caa49"
const CHANNEL_ID = 59
const CHANNEL_NAME = "icbc"

products(BEARER, CHANNEL_ID)
.map(it => _.assign({ id: it.id }, { integrationId: _.find(it.integrations, { app: CHANNEL_ID }).integrationId }))
.concurrentFlatMap(CONCURRENCY, product => highland(
  permalink(BEARER, CHANNEL_NAME, product.integrationId)
  .then(permalink => ({ product, permalink }))
))
.filter(it => it.permalink)
.concurrentFlatMap(CONCURRENCY, product => highland(updateIntegration(BEARER, CHANNEL_ID, product)))
.reduce(0, acum => acum + 1)
.toPromise(Promise)
.tap(it => console.log("Se actualizaron los permalink de", it, "productos!!"))
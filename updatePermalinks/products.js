const _ = require("lodash")
const request = require("request-promise")
const retry = require("bluebird-retry")
const highland = require("highland")
const HighlandPagination = require("highland-pagination")

const PAGE_SIZE = 20

const __action = (bearer, channel) => (page = 0) => {
  const __fetch = () => request({
    url:"https://apps.producteca.com/search/products",
    qs: {
      top: PAGE_SIZE,
      skip: page * PAGE_SIZE,
      $filter: "integrationApps/any(app: app eq '"+channel+"')",
      $select: "id,integrations,integrationApps",
      salesChannel: 2,
    },
    json:true,
    auth: { bearer: bearer }
  }).promise()
  .then(({ results, count }) => ({ items: results, nextToken: results.length? page + 1 : undefined }))
  return retry(__fetch)
}

module.exports = (bearer, channel) =>
  new HighlandPagination(__action(bearer, channel))
  .stream()
  .reject(it => _.chain(it.integrations).find({ app: channel }).get("permalink").value())
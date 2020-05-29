const request = require('request-promise');
const _ = require('lodash');
const moment = require('moment');
const config = require('./config');

const BASIC_PARAMETERS_STRUCTURE = [
    "",
    "ECOMMERCE",
    "ECOMMERCE",
    "3",
    "",
    "",
    "",
    "",
    "",
    ""
    ];

const deliverOrder = (order,buyerId) => {
  var options = {
        url:config.url,
        method:'POST',
        body: orderMapper(order,buyerId),
        json:true
    }

    return request(options)
    .promise()
    .tap(response => checkImpact(response))
}
const checkImpact = response => {    
    if (isErrorResult(response)) {
        throw {message: `Error: ${_.get(response,'respuesta[0]')}`}
    }
    if(isErrorResponse(response)) {
        throw {message: `Error: ${ JSON.stringify(response)}`}
    }
}
const isErrorResult = response => {
    return /error/gi.test(response.resultado)
}
const isErrorResponse = response => {
    return isOperationCero(response) || isRepeatedSale(response) || isProductNotFound(response) || isSimpleError(response)     
}
const isSimpleError = response => { 
    return _.get(response,'respuesta[0].Detalle').some(detailedElement => {
        return Object.values(detailedElement).some(value => /ERR/gi.test(value))
    })
}
const isRepeatedSale = response => {
    return _.get(response,'respuesta[0].Detalle').some(detailedElement => {
        return Object.values(detailedElement).some(value => /CABECERA/gi.test(value))
    })
}
const isProductNotFound = response => {
    return _.get(response,'respuesta[0].Detalle').some(detailedElement => {
        return Object.values(detailedElement).some(value => _.includes('NO SE ENCONTRO',value.toUpperCase()))
    }) 
}
const isOperationCero = response => {
    return _.get(response,'respuesta[0].Operación') == '0'
}
const productsArray = (order,buyerId) => {
    return _.flatMap(_.get(order,'lines'), line => productArray(order,line,buyerId))
}
const productArray = (order,line,buyerId) => {
    return [
        _.get(order,'id').toString(),
        formatDate(_.get(order,'date')),
        formatDate(_.get(order,'date')),
        "3",
        buyerId,
        getTransporte(order),
        "",
        (_.get(line,'variation.sku')), 
        _.get(line,'product.name'),
        _.get(line,'quantity').toString(),
        _.get(line,'price').toString(),
        _.get(order,'integrations[0].integrationId'), 
        " ", 
        "","","","","","","","","",""
    ]
} 
const formatDate = date => {
    return moment(date).format("DD/MM/YYYY")
}
const shippingCostLine = (order,buyerId) => {
    return [
    _.get(order,'id'),
    formatDate(_.get(order,'date')),
    formatDate(_.get(order,'date')),
    config.warehouse,
    buyerId,
    getTransporte(order),
    "",
    "MERCADOENVIOS",
    "COSTO DE ENVÍO",
    "1",
    _.get(order,'shippingCost'),
    _.get(order,'integrations[0].integrationId'),
    " ",
    "","","","","","","","","",""
    ]
}
const orderMapper = (order,buyerId) => {
  return {
    metodo:"generarnotadeventa ",   
    parametros: BASIC_PARAMETERS_STRUCTURE.concat(productsArray(order,buyerId)).concat(order.shippingCost? shippingCostLine(order,buyerId):[])
    }
}

function getTransporte(salesOrder){
    return logisticMapper(salesOrder).transporte
}

function logisticMapper(salesOrder){
    var mappingTree = {
            Pickup: {
                "Belgrano (1)": {
                    transporte: "3",
                    deposito: "1"
                },
                "CENTRO (4)": {
                    transporte: "4",
                    deposito: "4"
                },
                "MARTINEZ (2)": {
                    transporte: "",
                    deposito: "2"
                }
            },
            Ship: {
                "MercadoEnvios Full": {
                    transporte: "100",
                    deposito: "3"
                },
                "Online (3)": {
                    transporte: "101",
                    deposito: "3"
                },
                "Belgrano (1)": {
                    transporte: "101",
                    deposito: "1"
                },
                "CENTRO (4)": {
                    transporte: "101",
                    deposito: "4"
                },
                "MARTINEZ (2)": {
                    transporte: "101",
                    deposito: "2"
                }
            }
    }
    return _.get(_.get(mappingTree, `${salesOrder.deliveryMethod}`), `${salesOrder.warehouse}`)
}

module.exports = deliverOrder
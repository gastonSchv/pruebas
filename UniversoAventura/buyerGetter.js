const request = require('request-promise')
const _ = require('lodash')
const config = require('./config')

const TAX_TYPE = {
    "IVA Responsable Inscripto": "1.0",
    "Monotributo": "3.1",
    "IVA Exento":"4.0" 
}
const DOC_TYPE = {
  CUIT: {id: "80", name:"CUIT"},
  DNI: {id: "96", name:"D.N.I"}
}

const getBuyerId =  order => {
    var options = {
        url:config.url,
        method:'POST',
        body: buyerMaper(order),
        json: true
    };

    return request(options)
    .promise()
    .tap(response => checkImpact(response))
    .then(response => buyerId(response))
}
const checkImpact = response => {
    if (isError(response)) {
        throw {message: _.get(response,'respuesta[0]')}
    }
}
const isError = response => {
    return /error/gi.test(response.resultado)
}
const buyerId = response => {
    return _.get(response,'respuesta[0].CLIENTES[0].CODIGO')
}
const getTaxTypeId = taxType => {
    return _.get(TAX_TYPE,taxType) || "5.0"
}
const getDocTypeId = docType => {
  return _.get(DOC_TYPE,`${docType}.id`) || "96"    
}
const getDocTypeName = docType => {
  return _.get(DOC_TYPE,`${docType}.name`) || "D.N.I"  
}
const getContactProperty = (order,property, defaultValue) => {
  return _.get(order,`contact.${property}`, defaultValue)
}
const getLocationProperty =  (order,property, defaultValue) => {
  return _.get(order,`contact.location.${property}`, defaultValue)
}
const getBillingInfoProperty =  (order,property, defaultValue) => {
  return _.get(order,`contact.billingInfo.${property}`, defaultValue)
}
const __formatInfo = (order,property) => {
 return  getLocationProperty(order,property,'NO INFORMADO') 
} 
const buyerMaper = order => {
  return {
    metodo:"abm_entidades",
    parametros:[
    "",
    "CLIENTES",
    "ALTA/MODIFICACION",
    "TIPO_DOC,CUIT",
    "",
    "",
    "",
    "",
    "",
    "",
    "NOMBRE",
    getContactProperty(order,'contactPerson'),
    "C",
    "DOMICILIO",
    (getLocationProperty(order,'streetName') + getLocationProperty(order,'streetNumber')) || 'NO INFORMADO',
    "C",
    "N_FANTASIA",
    getContactProperty(order,'name'),
    "C",
    "C_POSTAL",
    `${getLocationProperty(order,'zipCode','')}`,
    "C",
    "LOCALIDAD",
    __formatInfo(order,'city'),
    "C",
    "PROVINCIA",
    __formatInfo(order,'state'),
    "C",
    "PAIS",
    "ARGENTINA",
    "C",
    "TELEFONO",
    _.get(order,'shipments[0].receiver.phoneNumber',getContactProperty(order,'phoneNumber'))  ,
    "C",
    "E_MAIL",
    getContactProperty(order,'mail'),
    "C",
    "TIPO_RESP",
    getTaxTypeId(getBillingInfoProperty(order,'taxPayerType')),
    "N",
    "TIPO_DOC",
    getDocTypeId(getBillingInfoProperty(order,'docType')),
    "N",
    "CUIT",
    getBillingInfoProperty(order,'docNumber', getContactProperty(order,'taxId')),
    "N"
    ]
    }
 
}

module.exports = getBuyerId
const _ = require("lodash");
var runner = require("./index.js");
const run = () => runner(context, message);


var context = {
    log: console.log,
    res: {},
};
context.done = () => console.log(context.res)
  
var message = {
  body: {
    "tags": [],
    "integrations": [
        {
            "integrationId": "2460274675",
            "app": 2
        }
    ],
    "channel": "2",
    "contact": {
        "name": "ROLO535910",
        "contactPerson": "Loriana Rodriguez",
        "mail": "lrodrig.48ppf8+2-ogi2dmmbsg42domru@mail.mercadolibre.com",
        "phoneNumber": "-",
        "taxId": "28559921",
        "location": {
            "streetName": "choiques",
            "streetNumber": "SN",
            "addressNotes": "Referencia: hospital",
            "state": "Río Negro",
            "city": "Pilcaniyeu",
            "zipCode": "8412"
        },
        "type": "Customer",
        "profile": {
            "app": 2,
            "integrationId": "378971383"
        },
        "billingInfo": {
            "docType": "DNI",
            "docNumber": "28559921",
            "streetName": "Los Coirones",
            "streetNumber": "SN",
            "comment": "",
            "zipCode": "8412",
            "city": "Pilcaniyeu",
            "state": "Río Negro",
            "businessName": "",
            "stateRegistration": "",
            "taxPayerType": "",
            "firstName": "Loriana",
            "lastName": "Rodriguez"
        },
        "id": 54167325
    },
    "lines": [
        {
            "price": 5490,
            "product": {
                "name": "Botas Apreski Nexxt Snowtoe Nieve Frio Impermeables Unisex",
                "code": "",
                "brand": "Alaska",
                "id": 5430970
            },
            "variation": {
                "pictures": [
                    {
                        "url": "http://res.cloudinary.com/decdktzp7/image/upload/v1528828461/xsiu1zoggkdjdnhubcgd.jpg",
                        "id": 421297687
                    }
                ],
                "stocks": [
                    {
                        "warehouse": "Belgrano (1)",
                        "quantity": 2,
                        "reserved": 0,
                        "available": 2
                    },
                    {
                        "warehouse": "Online (3)",
                        "quantity": 39,
                        "reserved": 0,
                        "available": 39
                    },
                    {
                        "warehouse": "MARTINEZ (2)",
                        "quantity": 0,
                        "reserved": 0,
                        "available": 0
                    },
                    {
                        "warehouse": "CENTRO (4)",
                        "quantity": 12,
                        "reserved": 0,
                        "available": 12
                    },
                    {
                        "warehouse": "MercadoEnvios Full",
                        "quantity": 3,
                        "reserved": 2,
                        "available": 1
                    }
                ],
                "integrationId": 0,
                "maxAvailableStock": 39,
                "minAvailableStock": 1,
                "primaryColor": "Negro",
                "size": "40",
                "thumbnail": "https://producteca.azureedge.net/58694/21339217-6d8c2559200b4fe9b6c92e6e7912b4d5.jpg",
                "attributes": [
                    {
                        "key": "Talle",
                        "value": "40"
                    },
                    {
                        "key": "Color",
                        "value": "Negro"
                    }
                ],
                "integrations": [],
                "id": 21339217,
                "sku": "BOTALUICBA400BN"
            },
            "quantity": 1,
            "conversation": {
                "questions": []
            },
            "reserved": 1
        }
    ],
    "warehouse": "MercadoEnvios Full",
    "warehouseId": 45113,
    "warehouseIntegration": {
        "app": 2,
        "status": "Locked"
    },
    "payments": [
        {
            "date": "2020-05-22T13:16:00",
            "amount": 5490,
            "couponAmount": 0,
            "status": "Approved",
            "method": "CreditCard",
            "integration": {
                "integrationId": "6767703395",
                "app": 2
            },
            "transactionFee": 713.7,
            "installments": 3,
            "card": {
                "paymentNetwork": "visa",
                "firstSixDigits": 450832,
                "lastFourDigits": 2538,
                "cardholderIdentificationNumber": "28559921",
                "cardholderIdentificationType": "DNI",
                "cardholderName": "Loriana Rodriguez"
            },
            "hasCancelableStatus": false,
            "id": 25581221
        }
    ],
    "shipments": [
        {
            "date": "2020-05-22T13:16:00",
            "products": [
                {
                    "product": 5430970,
                    "variation": 21339217,
                    "quantity": 1
                }
            ],
            "method": {
                "trackingNumber": "300000162706850",
                "trackingUrl": "https://myaccount.mercadolibre.com.ar/purchases/2460274675/shipments/30025097063/detail",
                "courier": "MercadoEnvios",
                "mode": "Normal a domicilio",
                "cost": 239.99,
                "type": "Ship",
                "eta": 0,
                "status": "PickingPending"
            },
            "integration": {
                "app": 2,
                "integrationId": "30025097063",
                "status": "ReadyToPrint",
                "id": 19043026
            },
            "receiver": {
                "fullName": "Rodriguez Loriana Vanesa",
                "phoneNumber": "0294 4598370"
            },
            "id": 22398307
        }
    ],
    "amount": 5490,
    "shippingCost": 0,
    "financialCost": 0,
    "paidApproved": 5490,
    "paymentStatus": "Approved",
    "deliveryStatus": "PickingPending",
    "paymentFulfillmentStatus": "Done",
    "deliveryFulfillmentStatus": "Pending",
    "deliveryMethod": "Ship",
    "paymentTerm": "Advance",
    "currency": "Local",
    "customId": "30025097063",
    "isOpen": true,
    "isCanceled": false,
    "hasAnyShipments": true,
    "date": "2020-05-22T13:16:01",
    "id": 40137139
}
};

run();
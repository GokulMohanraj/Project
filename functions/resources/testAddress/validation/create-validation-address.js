const{notEmpty, validate} = require('../../../validation')

const rule = {
    name:[
        [notEmpty, 'Name is mandatory']
    ],
    street:[
        [notEmpty, 'Street is mandatory']
    ],
    city:[
        [notEmpty, 'City is mandatory']
    ],
    country:[
        [notEmpty, 'Country is mandatory']
    ]
}

module.exports.addressValidate = async  data => validate(rule, data)
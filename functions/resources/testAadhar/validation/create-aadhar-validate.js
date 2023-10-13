const {isStringNumeric, validate, notEmpty} = require('../../../validation')

const rule = {
    aadharNumber:[
        [notEmpty, 'AadharNumber is mandatory'],
        [isStringNumeric, 'Number must be numeric']
    ],
    name:[
        [notEmpty, 'Name is mandatory']
    ]
}

module.exports.aadharValidate = async data => validate(rule, data)
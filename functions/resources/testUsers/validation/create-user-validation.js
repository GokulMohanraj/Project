const {validate,notEmpty} = require('../../../validation')

const rule = {
    full_name:[
        [notEmpty, "Name is Mandatory"]
    ],
    country_code:[
        [notEmpty, "Country code is mandatory"]
    ]
};

module.exports.userValidate = async data => validate(rule, data);
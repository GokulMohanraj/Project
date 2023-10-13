const Models = require('../../../models')


module.exports = class createUserQuery{
    constructor(full_name,country_code){
        this.details = {
            full_name,
            country_code
        }
    }

    get() {
        return Models.User.create({
            full_name:this.details.full_name,
            country_code:this.details.country_code
        })
    }
}
const Models = require('../../../models')

module.exports = class getAllUserQuery {

    get(){
        return Models.User.findAll()
    }
}
const Models = require('../../../models')


module.exports = class getAllAddress{
    constructor(userId){
        this.details ={userId}
    }
    async get(){
        let user =await Models.User.findOne({
            where: {
                id: this.details.userId
            }
        })
        return user.getAddresses();
    }
}
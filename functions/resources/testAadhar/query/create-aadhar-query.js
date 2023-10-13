const Models = require('../../../models');


module.exports = class createAadharQuery{
    constructor(userId, aadharNumber, name){
        this.details = {userId, aadharNumber, name}
    }

    async get(){
        let user = await Models.User.findOne({
            where:{
                id: this.details.userId
            }
        })
        return user.createAadhar({
            name: this.details.name,
            aadharNumber: this.details.aadharNumber,
        })
    }
}
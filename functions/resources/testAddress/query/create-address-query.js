const Models = require('../../../models');


module.exports = class createAddressQuery{
    constructor(name,street,city,country,userId){
        this.details = {
            name,street,city,country,userId
        }
    }
    get(){
        let user = Models.User.findOne({
            where: {id: this.details.userId}
        });
        if (user)
            return Models.Addresses.create({name:this.details.name,street:this.details.street,city:this.details.city,country:this.details.country,userId:this.details.userId})
        
    }
}
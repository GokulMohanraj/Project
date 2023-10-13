const Models = require('../../../models')


module.exports = class removeUserQuery{
    constructor(userId){
        this.details = {userId}
    }
    async get(){
        let user = await Models.User.findOne({
            where :{id:this.details.userId}
        })
        await user.destroy()
    }
}
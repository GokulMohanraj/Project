const result = require('folktale/result')
const Models = require('../../../models')


module.exports = class getSingleUserQuery{
    constructor(id){
        this.details = {id}
    }
    get(){
        return Models.User.findOne({
            where: {
                id: this.details.id
            }
        })
        
    }
}

// module.exports = class getSingleUserQuery{
//     constructor(id){
//         this.details = {id}
//     }
//     async get(){
//         const data = await Models.User.findOne({
//             where: {
//                 id: this.details.id
//             }
//         })
//         if(!data){
//             return result.Error()
//         }
//         return data
        
//     }
// }
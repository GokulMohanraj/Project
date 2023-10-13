const Route = require('../../../route');
const db = require('../../../db/repository');
const { respond } = require('../../../lib');
const deleteAddressQuery = require('../query/delete-address-query')

async function remove(req){
    let userId = req.params.userId;
    let addressId = req.params.addressId;

    const response = await db.execute(new deleteAddressQuery(userId, addressId))
    return respond(response, 'User address deleted sucessfully', 'Something went wrong')

    
}
Route.withOutSecurity().noAuth().delete('/testUsers/:userId/addresses/:addressId', remove).bind()
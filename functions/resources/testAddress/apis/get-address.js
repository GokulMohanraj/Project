const Route = require('../../../route')
const db = require('../../../db/repository')
const getAllAddress = require('../query/get-address-query')
const {respond} = require('../../../lib')

async function get(req){
    let userId = req.params.id;

    const response = await db.find(new getAllAddress(userId))
    return respond(response, 'Fetched all addresses of the user', 'something went wrong')

}


Route.withOutSecurity().noAuth().get('/testUsers/:id/addresses', get).bind();
const Route = require('../../../route');
const db = require('../../../db/repository');
const {respond} = require('../../../lib');
const getAllUserQuery = require('../query/get-all-user-query')

async function get(req){
    let response = await db.find(new getAllUserQuery())
    return respond(response, 'Fetched users data sucessfully', 'Something went wrong')
}

Route.withOutSecurity().noAuth().get('/testusers', get).bind()

module.exports.get = get;
const Route = require('../../../route');
const db = require('../../../db/repository')
const uuid = require('uuid');
const GetAddressQuery = require('../query/get-addresses-query');
const {respond,logInfo} = require('../../../lib');



async function get(req) {
    let userId = req.params.id;
    let response = await db.execute(new GetAddressQuery(userId));
    return respond(response,"Address Fetched Successfully","something Went wrong");
}


Route.withOutSecurity().noAuth().get('/users/:id/addresses',get).bind();

module.exports.get = get;
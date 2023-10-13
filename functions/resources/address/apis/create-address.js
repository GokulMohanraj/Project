const Route = require('../../../route');
const db = require('../../../db/repository')
const uuid = require('uuid');
const CreateAddressQuery = require('../query/create-address-query');
const {respond,logInfo} = require('../../../lib');



async function post(req) {
    let userId = req.params.id;
    let {name,street,city,country} = req.body;
    let response = await db.execute(new CreateAddressQuery(userId,name,street,city,country));
    return respond(response,"Address Created Successfully","something Went wrong");
}


Route.withOutSecurity().noAuth().post('/users/:id/addresses',post).bind();

module.exports.post = post;
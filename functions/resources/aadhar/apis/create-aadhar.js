const Route = require('../../../route');
const db = require('../../../db/repository')
const uuid = require('uuid');
const CreateAadharQuery = require('../query/create-aadhar-query');
const {respond,logInfo} = require('../../../lib');



async function post(req) {

    let userId = req.params.id;
    let {name,aadharNumber} = req.body;
    

    let response = await db.execute(new CreateAadharQuery(userId,name,aadharNumber));
    return respond(response,"Aadhar Created Successfully","something Went wrong");
}


Route.withOutSecurity().noAuth().post('/users/:id/aadhar',post).bind();

module.exports.post = post;
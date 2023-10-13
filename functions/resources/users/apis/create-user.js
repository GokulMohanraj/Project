const Route = require('../../../route');
const db = require('../../../db/repository')
const uuid = require('uuid');
const CreateUserQuery = require('../query/create-user-query');
const {respond,logInfo} = require('../../../lib');



async function post(req) {
    
    let {full_name,country_code} = req.body;
    let id = uuid.v1();

    let response = await db.execute(new CreateUserQuery(id,full_name,country_code));
    return respond(response,"User Created Successfully","something Went wrong");
}


Route.withOutSecurity().noAuth().post('/users',post).bind();

module.exports.post = post;
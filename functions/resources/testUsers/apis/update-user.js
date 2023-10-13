const Route = require('../../../route');
const db = require('../../../db/repository');
const {respond} =require('../../../lib')
const updateUserQuery = require('../query/update-user-query')


async function update(req){
    let id = req.params.id;

    let {full_name, country_code} = req.body;
    const response = await db.execute(new updateUserQuery(id,full_name,country_code))
    return respond(response, 'User sucessfully updated', 'something went wrong')
}




Route.withOutSecurity().noAuth().put('/testusers/:id', update).bind();
const Route = require('../../../route');
const db = require('../../../db/repository');
const {respond} = require('../../../lib');
const removeUserQuery = require('../query/remove-user-query');

async function remove(req){
    let userId = req.params.id;
    const response = await db.execute(new removeUserQuery(userId))
    return respond(response, 'User Deleted sucessfully', 'Something worng')
}

Route.withOutSecurity().noAuth().delete('/testusers/:id', remove).bind();

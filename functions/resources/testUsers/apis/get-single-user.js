const Route = require('../../../route')
const db = require('../../../db/repository')
const {respond} = require('../../../lib')
const getSingleUserQuery = require('../query/gey-single-user-query')

async function getSingleUser(req, res){
    let id = req.params.id
    const response = await db.findOne(new getSingleUserQuery(id))
    return respond(response, 'user data sucessfully fetched', 'User not found')
}

Route.withOutSecurity().noAuth().get('/testusers/:id', getSingleUser).bind()
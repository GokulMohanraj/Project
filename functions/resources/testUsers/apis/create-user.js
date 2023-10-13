const Route = require('../../../route')
const db = require('../../../db/repository')
const {respond, composeResult} = require('../../../lib')
const createUserQuery = require('../query/create-user-query')
const {userValidate} = require('../validation/create-user-validation')


async function post(req) {
    const {full_name, country_code} = req.body
    
    const response = await composeResult(
        () => db.execute(new createUserQuery(full_name,country_code)),
        userValidate
    )({full_name, country_code})
    
    return respond(response, "User created sucessfully", "Something went wrong ");
}

Route.withOutSecurity().noAuth().post('/testusers', post).bind();

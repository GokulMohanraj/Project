const Route = require('../../../route');
const db = require('../../../db/repository');
const { respond, composeResult } = require('../../../lib');
const createAadharQuery = require('../query/create-aadhar-query')
const {aadharValidate} = require('../validation/create-aadhar-validate')


async function post(req){
    let userId = req.params.id;
    let {aadharNumber, name} = req.body

    const response = await composeResult(
        () => db.create(new createAadharQuery(userId, aadharNumber, name)),
        aadharValidate
    )({userId, aadharNumber, name})

    return respond(response, 'Aadhar id created sucessfully', 'Something went wrong')
}


Route.withOutSecurity().noAuth().post('/testUsers/:id/aadhar', post).bind()

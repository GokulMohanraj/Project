const Route = require('../../../route');
const db = require('../../../db/repository');
const {respond, composeResult} = require('../../../lib')
const createAddressQuery = require('../query/create-address-query')
const { addressValidate } = require('../validation/create-validation-address')


async function post(req){
    let userId = req.params.id;
    let{name,street,city,country} = req.body;

    const response = await composeResult(
        () => db.create(new createAddressQuery(name,street,city,country,userId)),
        addressValidate
    )({name,street,city,country})

    return respond(response, 'address created sucessfully', 'Something went wrong')
}


Route.withOutSecurity().noAuth().post('/testUsers/:id/addresses', post).bind();

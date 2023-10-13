const Route = require('route');
const {respond}= require('./../../../lib');
const Result = require('folktale/result') 
const Models = require('models')


async function get(req, res) {
    const userData = data();

    return respond(Result.Ok(userData), 'Successfully fetch all the users data', 'Failed to fetch users data' )
}
const data = () => {
    return [
        {
            id: 1,
            name: "user1",
            email: "user1@gmail.com"
        },
        {
            id: 2,
            name: "user2",
            email: "user2@gmail.com"
        },
        {
            id: 3,
            name: "user3",
            email: "user3@gmail.com"
        },
        {
            id: 4,
            name: "user4",
            email: "user4@gmail.com"
        },
    ]
}
Route.withOutSecurity().noAuth().get('/test', get).bind();


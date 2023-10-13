const Route = require('../../../route');
const db = require('../../../db/repository');
const {respond, whenResult} = require('../../../lib')
const Result = require('folktale/result')

const createSession = async (req, res) => {
    let {email, password} = req.body;
    let response = await db.findOne({});
    let authentication = await whenResult(
        (user) => {
            if (user.password == password) {
                // console.log(user)
                return Result.Ok({
                    name: user.name,
                    email: user.email
                })
               
            }else {
               return Result.Error('password didnt match')
            }
        },
        (error) => {}
    )(response)
    return respond(authentication, "Successfully created a new sessions", 'failed to authenticate the user')
};

Route.withOutSecurity().noAuth().post('/newSessions', createSession).bind()
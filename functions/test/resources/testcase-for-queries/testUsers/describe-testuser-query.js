const chai = require('chai')
const expect = chai.expect;
const ds = require('../../../helpers/dataSetup')
const db = require('../../../../db/repository')
const RunQuery = require('../../../data/run-query');
const {verifyResultOk} = require('../../../helpers/verifiers')
const createUserQuery = require('../../../../resources/testUsers/query/create-user-query')

describe.only('Describe test-user queries', () =>{
    let user;
    beforeEach(async ()=>{
        user = await ds.buildSingle(ds.user)
    }) 

    it('Should create new user', async() =>{
        const createUserResponse = await db.execute(new createUserQuery(user.full_name, user.country_code))
        verifyResultOk(
            (createdUser) =>{
                expect(user.full_name).eql(createdUser.full_name)
                expect(user.country_code).eql(createdUser.country_code)
            },
        )(createUserResponse)
    })

    afterEach(async () =>{
        await ds.deleteAll()
    })
})

const chai = require('chai')
const expect = chai.expect;
const ds = require('../../../helpers/dataSetup')
const db = require('../../../../db/repository')
const RunQuery = require('../../../data/run-query');
const {verifyResultOk} = require('../../../helpers/verifiers')
const createAadharQuery = require('resources/testAadhar/query/create-aadhar-query')

describe.only('Describe test-Aadhar queries', () =>{
    let user, aadhar;
    beforeEach(async ()=>{
        user = await ds.createSingle(ds.user)
        aadhar = await ds.buildSingle(ds.aadhar, {user})
    }) 

    it('Should create new Aadharnumber for the user', async() =>{
        console.log(aadhar)
        console.log(typeof(user.full_name))
        const createAadharResponse = await db.execute(new createAadharQuery(user.id,aadhar.aadharNumber,user.full_name))
        console.log(createAadharResponse)
    })

    afterEach(async () =>{
        await ds.deleteAll();
    })
})
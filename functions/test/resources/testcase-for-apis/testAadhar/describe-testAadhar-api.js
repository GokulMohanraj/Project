const chai = require('chai');
const expect = chai.expect;
const db = require('../../../../db/repository')
const sinon = require('sinon')
const TestRoutes = require('../../../helpers/test-route');
const { resolveOk } = require('../../../helpers/resolvers');
const { verifyArgs } = require('../../../helpers/verifiers')
const createAadharQuery = require('../../../../resources/testAadhar/query/create-aadhar-query')


describe.only('Describe testAadhar API', () => {
    let sandbox = sinon.createSandbox();
    let req, res;
    beforeEach(() =>{
        req = {
            body:{
                name:'Mark',
                aadharNumber:'932712648376'
            },
            params:{
                id:'wegmi1-13gvdsb2-sfbwe1-sfbwser'
            }
        }
    })

    it('should create new aadhar details for user', async () => {
        sandbox.mock(db).expects('create').withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(createAadharQuery)
        }))
        .returns(resolveOk({
            id:'sdfvj31-fbwrg23-fdbwrg32-sdfb',
            name:'Mark',
            aadharNumber:'932712648376',
            userId:'wegmi1-13gvdsb2-sfbwe1-sfbwser'
        }))

        const response = await TestRoutes.execute('/testUsers/:id/aadhar', 'Post', req, res)
        expect(response).to.eql({
            status:true,
            message:'Aadhar id created sucessfully',
            entity:{
                id:'sdfvj31-fbwrg23-fdbwrg32-sdfb',
                name:'Mark',
                aadharNumber:'932712648376',
                userId:'wegmi1-13gvdsb2-sfbwe1-sfbwser'
            }
        })
    })

    afterEach(() => {
        sandbox.verifyAndRestore()
    });
});
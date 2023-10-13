const chai = require('chai');
const expect = chai.expect;
const db = require('../../../../db/repository')
const sinon = require('sinon')
const TestRoutes = require('../../../helpers/test-route');
const { ApiError } = require('../../../../lib');
const { resolveOk, resolveError } = require('../../../helpers/resolvers');
const { verifyArgs } = require('../../../helpers/verifiers')
const createAddressQuery = require('../../../../resources/testAddress/query/create-address-query')
const getAllAddress = require('../../../../resources/testAddress/query/get-address-query') 
const deleteAddressQuery  = require('../../../../resources/testAddress/query/delete-address-query') 



describe.only('Describe testAddress API', () => {
    let sandbox = sinon.createSandbox();
    let req, res;
    beforeEach(() =>{
        req = {
            body:{
                name:'Antony',
                street:'Park street',
                city:'Chennai',
                country:'India'
            },
            params:{
                id:'ff444-5hdvw345-v3434gvd-345dgdgv',
                addressId:'v3r234-fdverg34-dfberg34g-dfed',
                userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
            }
        }
    })

    it('Should create new address of the user', async () => {

        sandbox.mock(db).expects('create').withArgs(verifyArgs((query) =>{
            expect(query).to.be.instanceOf(createAddressQuery)
        }))
        .returns(resolveOk({
            addressId:'qwrmqw-123rdfcq-v3qeffd-213fds',
            name:'Antony',
            street:'Park street',
            city:'Chennai',
            country:'India',
            userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
        }))

        const response = await TestRoutes.execute('/testUsers/:id/addresses', 'Post', req, res)
        expect(response).to.eql({
            status: true,
            message: 'address created sucessfully',
            entity:
            {
                addressId:'qwrmqw-123rdfcq-v3qeffd-213fds',
                name:'Antony',
                street:'Park street',
                city:'Chennai',
                country:'India',
                userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
            }
        })

    })

    it('should get all address of the user', async () =>{

        sandbox.mock(db).expects('find').withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(getAllAddress)
        }))
        .returns(resolveOk([
            {
                addressId:'qwrmqw-123rdfcq-v3qeffd-213fds',
                name:'Antony',
                street:'Park street',
                city:'Chennai',
                country:'India',
                userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
            },
            {
                addressId:'v3r234-fdverg34-dfberg34g-dfed',
                name:'Antony',
                street:'Sea view',
                city:'Bangalore',
                country:'India',
                userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
            }
        ]))

        const response = await TestRoutes.execute('/testUsers/:id/addresses', 'Get', req, res)
        expect(response).to.eql({
            status: true,
            message: 'Fetched all addresses of the user',
            entity:[
                {
                    addressId:'qwrmqw-123rdfcq-v3qeffd-213fds',
                    name:'Antony',
                    street:'Park street',
                    city:'Chennai',
                    country:'India',
                    userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
                },
                {
                    addressId:'v3r234-fdverg34-dfberg34g-dfed',
                    name:'Antony',
                    street:'Sea view',
                    city:'Bangalore',
                    country:'India',
                    userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
                }
            ]
        })
    })

    it('Should delete address of the user', async () => {
        sandbox.mock(db).expects('execute').withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(deleteAddressQuery)
        }))
        .returns(resolveOk({
            id:'qwrmqw-123rdfcq-v3qeffd-213fds',
            name:'Antony',
            street:'Park street',
            city:'Chennai',
            country:'India',
            userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
        }))

        const response = await TestRoutes.execute('/testUsers/:userId/addresses/:addressId', 'Delete', req, res)
        expect(response).to.eql({
            status: true,
            message: 'User address deleted sucessfully',
            entity:
                {
                    id:'qwrmqw-123rdfcq-v3qeffd-213fds',
                    name:'Antony',
                    street:'Park street',
                    city:'Chennai',
                    country:'India',
                    userId:'ff444-5hdvw345-v3434gvd-345dgdgv'
                },
        })
    })

    afterEach(() => {
        sandbox.verifyAndRestore()
    });
});
const chai = require('chai');
const expect = chai.expect;
const db = require('../../../../db/repository')
const sinon = require('sinon')
const TestRoutes = require('../../../helpers/test-route');
const { ApiError } = require('../../../../lib');
const { resolveOk, resolveError } = require('../../../helpers/resolvers');
const { verifyArgs } = require('../../../helpers/verifiers')
const createUserQuery = require('../../../../resources/testUsers/query/create-user-query')
const getAllUserQuery = require('resources/testUsers/query/get-all-user-query')
const getSingleUserQuery = require('../../../../resources/testUsers/query/gey-single-user-query')
const removeUserQuery = require('../../../../resources/testUsers/query/remove-user-query')
const updateUserQuery = require('../../../../resources/testUsers/query/update-user-query')



describe.only('Describe Test users API', () => {
    let sandbox = sinon.createSandbox();
    let req, res;
    beforeEach(() => {
        req = { 
            body:{
                full_name:'Admin',
                country_code:'91'
            },
            params:{
                id:'ff444-5hdvw345-v3434gvd-345dgdgv'
            }
        };
    })

   it('should create new user when right data are given', async () => {

        sandbox.mock(db)
        .expects('execute')
        .withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(createUserQuery)
        }))
        .returns(resolveOk({
            id: "ff444-5hdvw345-v3434gvd-345dgdgv",
            full_name: "Admin",
            country_code: 91,
            updatedAt: "2023-10-04",
            createdAt: "2023-10-04",
            aadharId: null
        }))

        const response = await TestRoutes.execute('/testusers', 'Post', req, res);
        expect(response).to.eql({
            status: true,
            message: "User created sucessfully",
            entity: {
                id: "ff444-5hdvw345-v3434gvd-345dgdgv",
                full_name: "Admin",
                country_code: 91,
                updatedAt: "2023-10-04",
                createdAt: "2023-10-04",
                aadharId: null
            }
        })
    })

    it('should get all user data', async () => {

        sandbox.mock(db)
        .expects('find')
        .withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(getAllUserQuery)
        }))
        .returns(resolveOk([
            {
                id: "ff444-5hdvw345-v3434gvd-345dgdgv",
                full_name: "Admin",
                country_code: 91,
                updatedAt: "2023-10-04",
                createdAt: "2023-10-04",
                aadharId: null
            },
            {
                id: "ff444-5hdvw345-v3434gvd-345dgdgv",
                full_name: "Max",
                country_code: 52,
                updatedAt: "2023-10-03",
                createdAt: "2023-10-03",
                aadharId: null
            },
        ]))

        const response = await TestRoutes.execute('/testusers', 'Get', req, res);
        expect(response).to.eql({
            status: true,
            message: "Fetched users data sucessfully",
            entity:[
                {
                    id: "ff444-5hdvw345-v3434gvd-345dgdgv",
                    full_name: "Admin",
                    country_code: 91,
                    updatedAt: "2023-10-04",
                    createdAt: "2023-10-04",
                    aadharId: null
                },
                {
                    id: "ff444-5hdvw345-v3434gvd-345dgdgv",
                    full_name: "Max",
                    country_code: 52,
                    updatedAt: "2023-10-03",
                    createdAt: "2023-10-03",
                    aadharId: null
                },
            ]
        })
    })

    it('should get single user data', async () => {
        sandbox.mock(db)
        .expects('findOne')
        .withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(getSingleUserQuery)
        }))
        .returns(resolveOk({
            id: "ff444-5hdvw345-v3434gvd-345dgdgv",
            full_name: "Admin",
            country_code: 91,
            updatedAt: "2023-10-04",
            createdAt: "2023-10-04",
            aadharId: null
        }))

        const response = await TestRoutes.execute('/testusers/:id', 'Get', req, res);
        expect(response).to.eql({
            status: true,
            message: "user data sucessfully fetched",
            entity: {
                id: "ff444-5hdvw345-v3434gvd-345dgdgv",
                full_name: "Admin",
                country_code: 91,
                updatedAt: "2023-10-04",
                createdAt: "2023-10-04",
                aadharId: null
            }
        })
    })

    it('should not return any data when user id not in DataBase', async() =>{
        sandbox.mock(db).expects('findOne').withArgs(verifyArgs((query) =>{
            expect(query).to.be.instanceOf(getSingleUserQuery)
        }))
        .returns(resolveOk({ }))

        const response =await TestRoutes.execute('/testusers/:id','Get', req, res)
        expect(response).to.eql({
            status:true,
            message:'user data sucessfully fetched',
            entity:{}
        })
    })

    it('should delete user data', async () => {
        sandbox.mock(db)
        .expects('execute')
        .withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(removeUserQuery)
        }))
        .returns(resolveOk({ }))

        const response = await TestRoutes.execute('/testusers/:id', 'Delete', req, res);
        expect(response).to.eql({
            status: true,
            message: "User Deleted sucessfully",
            entity:{}
        })
    })

    // it('should not delete any user data when wrong id is given', async() => {
    //     sandbox.mock(db).expects('execute').withArgs(verifyArgs((query)=>{
    //         expect(query).to.be.instanceOf(removeUserQuery)
    //     }))
    //     .returns(resolveError({
    //      }))

    //     const response = await TestRoutes.executeWithError('/testusers/:id', 'Delete', req, res)
    //     console.log(response)
    //     expect(response).to.eql(new ApiError(0, 'wrong user-id given', 'Something worng'))
    // })

    it('should update existing user data', async () => {
        sandbox.mock(db)
        .expects('execute')
        .withArgs(verifyArgs((query) => {
            expect(query).to.be.instanceOf(updateUserQuery)
        }))
        .returns(resolveOk({ 
            id: "ff444-5hdvw345-v3434gvd-345dgdgv",
            full_name: "Admin",
            country_code: 91,
            updatedAt: "2023-10-04",
            createdAt: "2023-10-04",
            aadharId: null
        }))
        const response = await TestRoutes.execute('/testusers/:id', 'Put', req, res);
        expect(response).to.eql({
            status: true,
            message: "User sucessfully updated",
            entity:{
            id: "ff444-5hdvw345-v3434gvd-345dgdgv",
            full_name: "Admin",
            country_code: 91,
            updatedAt: "2023-10-04",
            createdAt: "2023-10-04",
            aadharId: null
            }
        })
    })

    afterEach(() => {
        sandbox.verifyAndRestore();
    });
});
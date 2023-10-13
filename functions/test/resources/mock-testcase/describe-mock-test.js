// const chai = require('chai');
// const expect = chai.expect;
// const { resolveOk, resolveError } = require('../../helpers/resolvers');
// const db = require('../../../db/repository')
// const sinon = require('sinon')
// const TestRoutes = require('../../helpers/test-route');
// const { ApiError } = require('../../../lib');


// describe.only('Describe login api', () => {
//     let sandbox = sinon.createSandbox();
//     let req, res;
//     beforeEach(() => {
//         req = { 
//             body:{
//                 email:'admin@gmail.com',
//                 password:'password'
//             }
//         };
//     })

//     it('should create new session when right credentails are passed', async () => {

//         sandbox.mock(db)
//         .expects('findOne')
//         .returns(resolveOk({
//             name: 'Admin',
//             email: 'admin@gmail.com',
//             password: 'password'
//         }))

//         const response = await TestRoutes.execute('/newSessions', 'Post', req, res);
//         expect(response).to.eql({
//             status: true,
//             message: 'Successfully created a new sessions',
//             entity: {
//                 name: 'Admin',
//                 email: 'admin@gmail.com'
//             }
//         })
//     })

//     it('should not create new session when wrong credentails are passed', async () => {

//         sandbox.mock(db).expects('findOne').returns(resolveOk({
//             name: 'Admin',
//             email: 'admin@gmail.com',
//             password: 'password12'
//         }))

//         const response = await TestRoutes.executeWithError('/newSessions', 'Post', req, res);
//         expect(response).to.eql(new ApiError(0,'password didnt match','failed to authenticate the user'))
//     })

//     afterEach(() => {
//         sandbox.verifyAndRestore();
//     });
// });
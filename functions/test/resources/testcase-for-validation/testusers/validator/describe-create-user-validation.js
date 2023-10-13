const chai = require('chai')
const expect = chai.expect
const {verifyResultOk, verifyResultError} = require('../../../../helpers/verifiers');
const {userValidate} = require('resources/testUsers/validation/create-user-validation');


describe.only('Create user validation', () => {
    it('should mandatory full-name', async () =>{
        let response = await userValidate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is Mandatory')
            }
        )(response)
    });

    it('should mandatory country-code', async () =>{
        let response = await userValidate({})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Country code is mandatory')
            }
        )(response)
    });

    it('should be valid when you provide all data', async () =>{
        let response = await userValidate({full_name:"Admin",country_code:"91"})
        verifyResultOk(() => { } )(response)
    });
});

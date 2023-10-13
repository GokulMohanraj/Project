const chai = require('chai')
const expect = chai.expect
const {verifyResultOk, verifyResultError} = require('../../../../helpers/verifiers');
const {aadharValidate} = require('resources/testAadhar/validation/create-aadhar-validate')


describe.only('Create Aadhar validation', () => {
    it('should mandatory Aadhar-Number', async () =>{
        let response = await aadharValidate({ })
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('AadharNumber is mandatory')
            }
        )(response)
    });

    it('should mandatory Aadhar-Number is numeric', async () =>{
        let response = await aadharValidate({ aadharNumber:"1uuig123bi"})
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Number must be numeric')
            }
        )(response)
    });

    it('should mandatory Name', async () =>{
        let response = await aadharValidate({ })
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is mandatory')
            }
        )(response)
    });

    it('should be valid when you provide all data', async () =>{
        let response = await aadharValidate({ aadharNumber:"983658374853", name:"User" })
        verifyResultOk(
            () => { }
        )(response)
    });
});


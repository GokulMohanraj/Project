const chai = require('chai')
const expect = chai.expect
const {verifyResultOk, verifyResultError} = require('../../../../helpers/verifiers');
const {addressValidate} = require('resources/testAddress/validation/create-validation-address')


describe.only('Create Address validation', () => {
    it('should mandatory name', async () =>{
        let response = await addressValidate({ })
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Name is mandatory')
            }
        )(response)
    });

    it('should mandatory street', async () => {
        let response = await addressValidate({ })
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Street is mandatory')
            }
        )(response)
    })

    it('should mandatory city', async () => {
        let response = await addressValidate({ })
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('City is mandatory')
            }
        )(response)
    })

    it('should mandatory country', async () => {
        let response = await addressValidate({ })
        verifyResultError(
            (error) => {
                expect(error.errorMessage).to.include('Country is mandatory')
            }
        )(response)
    })

    it('should be valid when all data provide', async () => {
        let response = await addressValidate({ name:"Raj", street:"Park view", city:"Delhi", country:"India" })
        verifyResultOk(
            () => { }
        )(response)
    })
});
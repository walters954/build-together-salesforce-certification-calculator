import { LightningElement } from 'lwc';

export default class SalesforceCertificationCalculator extends LightningElement {

    developerFundamentals = 0;
    processAutomation = 0;
    userInterface = 0;
    testingDebug = 0;
    certificationScore = 0;

    handleChange(event) {
        const field = event.target.name;
        if (field === 'devFundamentals') {
            this.developerFundamentals = event.target.value;
        } else if (field === 'processAuto') {
            this.processAutomation = event.target.value;
        } else if (field === 'userInterface') {
            this.userInterface = event.target.value;
        } else if (field === 'testing') {
            this.testingDebug = event.target.value;
        }
    }

    calculate() {
        //validate input values before doing calculations
        if (!this.validateInputs()){
            return;
        }

        let developerFundamentalWeight = this.developerFundamentals * .23;
        let processAutomationWeight = this.processAutomation * .30;
        let userInterfaceWeight = this.userInterface * .25;
        let testingDebugWeight = this.testingDebug * .22;
        this.certificationScore = developerFundamentalWeight + processAutomationWeight + userInterfaceWeight + testingDebugWeight;
    }

    reset(){
        this.developerFundamentals = 0;
        this.processAutomation = 0;
        this.userInterface = 0;
        this.testingDebug = 0;
        this.certificationScore = 0;
    }

    //https://developer.salesforce.com/docs/component-library/bundle/lightning-input/documentation
    validateInputs(){
        const allValid = [
            ...this.template.querySelectorAll('lightning-input'),
        ].reduce((validSoFar, inputCmp) => {

            //Required to check if the input has a value or not
            if (!inputCmp.value){
                inputCmp.setCustomValidity('Value is required');
            } else {
                inputCmp.setCustomValidity('');
            }

            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity() ;
        }, true);

        return allValid;
    }

}
import { LightningElement } from 'lwc';

export default class SalesforceCertificationCalculator extends LightningElement {

    developerFundamentals = 0;
    processAutomation = 0;
    userInterface = 0;
    testingDebug = 0;
    certificationScore = 0;
    certificationPassScore = 68;
    numberOfQuestion = 60;
    developerFundamentalsWeight = .23;
    processAutomationWeight = .30;
    userInterfaceWeight = .25;
    testingDebugWeight = .22;
    developerFundamentalScore = 0;
    processAutomationScore = 0;
    userInterfaceScore = 0;
    testingDebugScore = 0;

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

        this.developerFundamentalScore = this.developerFundamentals * this.developerFundamentalsWeight;
        this.processAutomationScore = this.processAutomation * this.processAutomationWeight;
        this.userInterfaceScore = this.userInterface * this.userInterfaceWeight;
        this.testingDebugScore = this.testingDebug * this.testingDebugWeight;
        this.certificationScore = this.developerFundamentalScore + this.processAutomationScore + this.userInterfaceScore + this.testingDebugScore;
        this.certificationScore = Math.round(this.certificationScore);
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

    get developerFundamentalsTotalQuestions(){
        return Math.round(this.numberOfQuestion * this.developerFundamentalsWeight);
    }

    get developerFundamentalsCorrectQuestions(){
        let weightedScore = this.developerFundamentalScore/this.developerFundamentalsWeight
        weightedScore = weightedScore / 100; //get weighted percentage
        return Math.round(weightedScore * this.developerFundamentalsTotalQuestions);
    }

}
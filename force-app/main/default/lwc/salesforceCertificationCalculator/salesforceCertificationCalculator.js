import { LightningElement } from 'lwc';

export default class SalesforceCertificationCalculator extends LightningElement {

    developerFundamentals = 0;
    processAutomation = 0;
    userInterface = 0;
    testingDebug = 0;

    certificationScore = 0;

    handleChange(event) {
        console.log(event);
        console.log(JSON.parse(JSON.stringify(event.target)));
        console.log(event.target.name);
        console.log(event.target.value);
        console.log(event.target.type);
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

}
import './button.scss';
import { LightningElement, api } from 'lwc';


const VARIANTS = {
    PRIMARY: 'primary'
}
export default class Button extends LightningElement {
    @api label;
    @api disabled;
    @api variant;

    get cssClass(){
        let result = "ace-button";

        if(this.disabled){
            result += " ace-button_disabled";
        }

        if(this.variant === VARIANTS.PRIMARY){
            result += " ace-button_primary";
        }

        return result;
    }
}